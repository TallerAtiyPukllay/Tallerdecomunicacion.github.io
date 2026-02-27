
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
        let isTemporal = false;

        // Comprobar primero Temporal
        if (config.claves_temporales && Array.isArray(config.claves_temporales) && config.claves_temporales.includes(currentKey)) {
            isValid = true;
            isTemporal = true;
        }

        // Si no es temporal, comprobar tradicional
        if (!isValid) {
            if (role === 'DOCENTE') {
                if (config.claves_docente && config.claves_docente.includes(currentKey)) isValid = true;
            } else {
                if (config.claves_alumno && config.claves_alumno.includes(currentKey)) isValid = true;
            }
        }

        // SI ES TEMPORAL, VERIFICAR TIEMPO (10 minutos de vida desde que entró = 600,000 milisegundos)
        if (isValid && isTemporal) {
            const loginTime = parseInt(localStorage.getItem('atiy_login_timestamp') || '0', 10);
            const tiempoTranscurrido = Date.now() - loginTime;

            if (tiempoTranscurrido > 600000) {
                isValid = false;
                redirectToLogin("El tiempo para esta cuenta visitante/temporal ha expirado (10 min). ¡Gracias por probar el software!");
                return;
            }
        }

        if (!isValid) {
            // ¡EXPULSIÓN INMEDIATA!
            console.error(`⛔ Clave '${currentKey}' ya no es válida.`);
            redirectToLogin("Tu clave de acceso ha sido cambiada o revocada por el administrador.");
        } else {
            console.log(`✅ Verificación de seguridad: OK ${isTemporal ? '(Cuenta Temporal Activa)' : ''}`);
        }

    } catch (error) {
        console.warn("⚠️ Fallo verificación periódica (Red inestable):", error);
    }
}

// ==========================================
// CONTROL DE INACTIVIDAD (5 MINUTOS)
// ==========================================
let inactivityTimer;
const INACTIVITY_LIMIT_MS = 5 * 60 * 1000; // 5 minutos exactos

function startInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        // Solo aplicar si estamos dentro de la app (protege de aplicar en login.html)
        if (localStorage.getItem('atiy_key') && window.location.pathname.indexOf('login.html') === -1) {
            redirectToLogin("La sesión se cerró automáticamente por inactividad prolongada (5 min). Por seguridad, vuelve a ingresar.");
        }
    }, INACTIVITY_LIMIT_MS);
}

// Escuchar eventos globales de actividad si NO estamos en el login
if (window.location.pathname.indexOf('login.html') === -1) {
    ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(eventName => {
        document.addEventListener(eventName, startInactivityTimer, true);
    });

    // Arrancar el primer cronómetro si ya hay sesión al cargar index.html
    if (localStorage.getItem('atiy_key')) {
        startInactivityTimer();
    }
}

// Iniciar vigilancia de la Nube Global
console.log("🛡️ Sistema de seguridad activo. Vigilando clave y tokens...");
setInterval(verifyAccess, CHECK_INTERVAL_MS);

// Verificación inicial (con un pequeño delay para asegurar carga de módulos)
setTimeout(verifyAccess, 1500);
