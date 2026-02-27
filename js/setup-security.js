
import { db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function subirConfiguracionInicial() {
    console.log("🔒 Creando configuración de seguridad en Firebase...");

    try {
        await setDoc(doc(db, "configuracion", "accesos"), {
            claves_alumno: ["ATIY2026", "ESTUDIANTE2026", "C1-2026"], // Puedes añadir las que quieras aquí
            claves_docente: ["PROFE2026", "DOCENTE2026"],
            estado_sistema: "activo", // opciones: 'activo', 'mantenimiento', 'cerrado'
            mensaje_mantenimiento: "El sistema está en actualización. Vuelve en unos minutos.",
            ultima_actualizacion: new Date().toISOString()
        });

        alert("✅ Configuración de Seguridad creada en Firebase.\nAhora las claves viven en la nube privada.");
        console.log("✅ Documento 'configuracion/accesos' creado.");
    } catch (e) {
        console.error("❌ Error subiendo configuración:", e);
        alert("❌ Error: " + e.message);
    }
}

// Exponer para llamar desde consola o botón temporal
window.subirConfiguracionInicial = subirConfiguracionInicial;
