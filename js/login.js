
import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Detectar si estamos en Electron
const isElectron = typeof process !== 'undefined' && process.versions && !!process.versions.electron;
let ipcRenderer = null;

if (isElectron) {
    try {
        const electron = require('electron');
        ipcRenderer = electron.ipcRenderer;
    } catch (e) {
        console.warn('Error cargando electron:', e);
    }
}

// ==========================================
// CONFIGURACIÓN DE SEGURIDAD (CLOUD-ONLY)
// ==========================================
// No hay claves locales. Si no hay internet, no se entra.

const els = {
    btn: document.getElementById('btnLogin'),
    input: document.getElementById('accessKey'),
    studentName: document.getElementById('studentName'),
    studentSection: document.getElementById('studentSection'),

    msg: document.getElementById('statusMsg'),
    serverStatus: document.getElementById('serverStatus'),
    btnText: document.getElementById('btnText'),
    loader: document.getElementById('loader'),
    togglePass: document.getElementById('togglePassword')
};

async function checkAccess() {
    const key = els.input.value.trim();
    const name = els.studentName.value.trim();
    const section = els.studentSection.value;

    // 1. Validaciones Básicas
    if (!name) {
        showStatus("Por favor ingrese su nombre completo", "error");
        els.studentName.focus();
        return;
    }
    if (!section) {
        showStatus("Seleccione su salón o grado", "error");
        els.studentSection.focus();
        return;
    }
    if (!key) {
        showStatus("Falta la llave de acceso", "error");
        els.input.focus();
        return;
    }

    setLoading(true);

    try {
        // Simular espera profesional
        await new Promise(r => setTimeout(r, 600));

        let config = null;

        // 2. Intentar LEER DE FIREBASE (Nube Segura)
        try {
            if (navigator.onLine) {
                console.log("🔒 Consultando permisos en la nube (Sin Caché)...");
                const docRef = doc(db, "configuracion", "accesos");
                // NO guardamos en caché localstorage
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    config = docSnap.data();
                    console.log("✅ Permisos verificados en tiempo real.");
                } else {
                    console.warn("⚠️ No se encontró configuración en nube.");
                    throw new Error("Config missing");
                }
            } else {
                throw new Error("Offline");
            }
        } catch (firebaseError) {
            console.error("❌ Fallo conexión a seguridad nube:", firebaseError);
            showStatus("Se requiere internet para validar acceso.", "error");
            setLoading(false);
            return;
        }

        // 3. Verificar Estado del Sistema (Kill Switch)
        if (config && config.estado_sistema && config.estado_sistema !== 'activo') {
            const mensaje = config.mensaje_mantenimiento || "El sistema está en mantenimiento.";
            showStatus("⛔ " + mensaje, "error");

            els.serverStatus.textContent = "Mantenimiento 🔴";
            els.serverStatus.className = "status-indicator maintenance";

            setLoading(false);
            return;
        }

        // 4. Validar Credenciales (SOLO NUBE)
        let isValid = false;
        let isTeacher = (section === 'DOCENTE');
        let isTemporal = false;

        // Validamos primero si es Temporal (puede ser para un docente probar o un alumno probar)
        if (config && config.claves_temporales && Array.isArray(config.claves_temporales)) {
            if (config.claves_temporales.includes(key)) {
                isValid = true;
                isTemporal = true;
            }
        }

        // Si no es temporal, validamos por rol habitual
        if (!isValid) {
            if (isTeacher) {
                // Validar DOCENTE (Solo Nube)
                if (config && config.claves_docente && Array.isArray(config.claves_docente)) {
                    if (config.claves_docente.includes(key)) isValid = true;
                }
            } else {
                // Validar ALUMNO (Solo Nube)
                if (config && config.claves_alumno && Array.isArray(config.claves_alumno)) {
                    if (config.claves_alumno.includes(key)) isValid = true;
                }
            }
        }

        // 5. Resultado Final
        if (isValid) {
            showStatus("¡Bienvenido/a " + name + "!", "success");
            els.serverStatus.textContent = "Conectado 🟢";
            els.serverStatus.className = "status-indicator online";

            // Guardar sesión principal
            localStorage.setItem('atiy_key', key);
            localStorage.setItem('atiy_student_name', name);
            localStorage.setItem('atiy_student_section', section);

            // Lógica de cronómetro para cuenta temporal
            if (isTemporal) {
                localStorage.setItem('atiy_login_timestamp', Date.now().toString());
            } else {
                localStorage.removeItem('atiy_login_timestamp'); // Limpiamos por seguridad
            }

            setTimeout(() => {
                if (ipcRenderer) {
                    ipcRenderer.send('login-success');
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);

        } else {
            // Mensaje de Error Personalizado
            if (isTeacher) {
                showStatus("⛔ Clave de Docente incorrecta o expirada", "error");
            } else {
                showStatus("⛔ Llave de acceso no válida", "error");
            }
            els.input.value = "";
            els.input.focus();
            setLoading(false);
        }

    } catch (e) {
        console.error("Critical Login Error:", e);
        showStatus("Error de sistema. Intente nuevamente.", "error");
        setLoading(false);
    }
}

function showStatus(text, type) {
    els.msg.textContent = text;
    els.msg.style.color = type === 'error' ? '#ff6b6b' : '#51cf66';
    els.msg.style.opacity = 1;
}

function setLoading(isLoading) {
    if (isLoading) {
        els.btn.disabled = true;
        els.input.disabled = true;
        els.btnText.style.display = 'none';
        els.loader.style.display = 'inline-block';
    } else {
        els.btn.disabled = false;
        els.input.disabled = false;
        els.btnText.style.display = 'inline';
        els.loader.style.display = 'none';
    }
}

// Event Listeners
els.btn.addEventListener('click', checkAccess);
els.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAccess();
});

// Event Listener para mostrar/ocultar contraseña
els.togglePass.addEventListener('click', () => {
    const type = els.input.getAttribute('type') === 'password' ? 'text' : 'password';
    els.input.setAttribute('type', type);
    els.togglePass.textContent = type === 'password' ? '👁️' : '🙈';
});

// Check inicial de estado de red
window.addEventListener('online', () => els.serverStatus.textContent = "En línea 🟡");
window.addEventListener('offline', () => els.serverStatus.textContent = "Sin conexión ⚪");
