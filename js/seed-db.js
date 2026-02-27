import { db } from "./firebase-config.js";
import { collection, doc, setDoc, writeBatch } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Tu archivo JSON local con las preguntas
const QUESTIONS_URL = "assets/data/questions.json";

async function subirPreguntas() {
    console.log("🚀 Iniciando carga masiva a Firestore...");

    try {
        // 1. Cargar el JSON local
        const response = await fetch(QUESTIONS_URL);
        if (!response.ok) throw new Error("No se pudo cargar questions.json");

        const data = await response.json();
        // data es un objeto: { basico: [...], intermedio: [...], avanzado: [...] }

        const batch = writeBatch(db); // Usamos batch para eficiencia (subir varias de golpe)
        let count = 0;

        // Recorrer niveles (basico, intermedio, avanzado)
        for (const nivel in data) {
            const listaPreguntas = data[nivel];
            console.log(`Procesando nivel: ${nivel} (${listaPreguntas.length} preguntas)`);

            listaPreguntas.forEach((pregunta, index) => {
                // Crear un ID único tipo "basico_01"
                const docId = `${nivel}_${index}`;
                const docRef = doc(collection(db, "preguntas"), docId);

                // Agregar campo "nivel" para filtrar fácil después
                const preguntaData = {
                    ...pregunta, // Copia todo (pregunta, opciones, respuesta)
                    nivel: nivel,
                    id: index // Mantener orden original si quieres
                };

                batch.set(docRef, preguntaData);
                count++;
            });
        }

        // Ejecutar la subida
        await batch.commit();
        console.log(`✅ ¡ÉXITO! Se subieron ${count} preguntas a Firestore.`);
        alert(`¡Base de Datos cargada! ${count} preguntas subidas.`);

    } catch (error) {
        console.error("❌ Error subiendo datos:", error);
        alert("Error: " + error.message);
    }
}

// Ejecutar al cargar (solo para uso manual)
subirPreguntas();
