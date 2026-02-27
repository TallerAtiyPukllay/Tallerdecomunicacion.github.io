
// ==========================================
// SEGURIDAD EN TIEMPO REAL (PERRO GUARDIÁN)
// ==========================================
// Verifica cada 30 segundos si la credencial del usuario sigue siendo válida en la Nube.
// Si el admin revoca una clave, el usuario será expulsado automáticamente.

import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const CHECK_INTERVAL_MS = 60000; // 60 Segundos (1 lectura por minuto)

// Detectar entorno (Electron vs Web)
const isElectron = typeof process !== 'undefined' && process.versions && !!process.versions.electron;
let ipcRenderer = null;
if (isElectron) {
    try {
        const electron = require('electron');
        ipcRenderer = electron.ipcRenderer;
    } catch (e) { console.warn(e); }
}

function redirectToLogin(reason) {
    console.warn("⛔ Acceso revocado:", reason);
    localStorage.removeItem('atiy_key'); // Borrar clave inválida
    localStorage.removeItem('atiy_student_name');
    localStorage.removeItem('atiy_student_section');

    const doRedirect = () => window.location.href = 'login.html';

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Sesión Finalizada',
            text: reason,
            icon: 'warning',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#ffc107', // Amarillo warning
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => {
            doRedirect();
        });
    } else {
        alert("Tu sesión ha expirado o la clave ha cambiado.\nRazón: " + reason);
        doRedirect();
    }
}

async function verifyAccess() {
    const currentKey = localStorage.getItem('atiy_key');
    const role = localStorage.getItem('atiy_student_section'); // 'DOCENTE' o 'C1', etc.

    if (!currentKey) {
        // Si no hay clave, fuera.
        // (Pero damos un margen de 2 segundos al inicio por si el login acaba de suceder)
        if (performance.now() > 2000) {
            redirectToLogin("No hay sesión activa");
        }
        return;
    }

    try {
        if (!navigator.onLine) {
            console.warn("⚠️ Sin conexión. No se puede verificar revocación (permitiendo acceso temporal).");
            return;
        }

        const docRef = doc(db, "configuracion", "accesos");
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.error("❌ Error CRÍTICO: No existe configuración de seguridad en la nube.");
            return; // No expulsamos por error de servidor, solo logueamos.
        }

        const config = docSnap.data();

        // 1. Verificar Estado Global
        if (config.estado_sistema !== 'activo') {
            redirectToLogin(config.mensaje_mantenimiento || "Sistema cerrado por mantenimiento");
            return;
        }

        // 2. Verificar Clave Específica
        let isValid = false;

        if (role === 'DOCENTE') {
            // Verificar si la clave sigue en la lista de docentes
            if (config.claves_docente && config.claves_docente.includes(currentKey)) {
                isValid = true;
            }
        } else {
            // Verificar si la clave sigue en la lista de alumnos
            if (config.claves_alumno && config.claves_alumno.includes(currentKey)) {
                isValid = true;
            }
        }

        if (!isValid) {
            // ¡EXPULSIÓN INMEDIATA!
            console.error(`⛔ Clave '${currentKey}' ya no es válida para rol '${role}'.`);
            redirectToLogin("Tu clave de acceso ha sido cambiada o revocada por el administrador.");
        } else {
            console.log("✅ Verificación de seguridad: OK");
        }

    } catch (error) {
        console.warn("⚠️ Fallo verificación periódica (Red inestable):", error);
    }
}

// Iniciar vigilancia
console.log("🛡️ Sistema de seguridad activo. Vigilando clave...");
setInterval(verifyAccess, CHECK_INTERVAL_MS);

// Verificación inicial (con un pequeño delay para asegurar carga de módulos)
setTimeout(verifyAccess, 1500);
