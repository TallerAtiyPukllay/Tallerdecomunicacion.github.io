import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Estructura vacía inicial
window.PREGUNTAS_GLOBALES = {
    "basico": [],
    "intermedio": [],
    "avanzado": []
};

// Función para cargar preguntas desde Firestore
window.cargarPreguntas = async function () {
    console.log("☁️ Conectando con Firebase para obtener preguntas...");

    try {
        const querySnapshot = await getDocs(collection(db, "preguntas"));

        if (querySnapshot.empty) {
            console.warn("⚠️ No se encontraron preguntas en Firestore. Usando respaldo local.");
            // Aquí podrías cargar el JSON local si falla la red
            return;
        }

        // Limpiar arrays
        const nuevasPreguntas = { basico: [], intermedio: [], avanzado: [] };

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // data.nivel debe ser "basico", "intermedio", etc.
            if (nuevasPreguntas[data.nivel]) {
                nuevasPreguntas[data.nivel].push(data);
            }
        });

        // Ordenar por ID original si existe, para mantener orden
        for (const nivel in nuevasPreguntas) {
            nuevasPreguntas[nivel].sort((a, b) => (a.id || 0) - (b.id || 0));
        }

        // Actualizar variable global
        window.PREGUNTAS_GLOBALES = nuevasPreguntas;
        console.log(`✅ Preguntas cargadas de la nube: ${Object.keys(nuevasPreguntas).map(k => `${k}: ${nuevasPreguntas[k].length}`).join(', ')}`);

    } catch (error) {
        console.error("❌ Error cargando preguntas de Firebase:", error);
        alert("Error de conexión con la base de datos educativa. Revise su internet.");
    }
};
