
import { db } from './firebase-config.js';
import { collection, addDoc, query, where, orderBy, limit, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const COLLECTION_NAME = "puntajes";

async function guardarPuntajeCloud(datosQuiz) {
    try {
        const studentName = localStorage.getItem('atiy_student_name');
        const studentSection = localStorage.getItem('atiy_student_section');

        if (!studentName || !studentSection) {
            console.warn("⚠️ No hay sesión de estudiante activa.");
            return;
        }

        const nuevoPorcentaje = Math.round((datosQuiz.puntaje / datosQuiz.total) * 100);
        const nuevoTiempoSegundos = parseFloat(datosQuiz.tiempoExacto) || 9999;

        const q = query(
            collection(db, COLLECTION_NAME),
            where("estudiante", "==", studentName),
            where("seccion", "==", studentSection)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docExistente = querySnapshot.docs[0];
            const datosViejos = docExistente.data();

            const viejoPorcentaje = datosViejos.porcentaje || 0;
            const viejoTiempo = parseFloat(datosViejos.tiempo_segundos) || 9999;

            let esMejor = false;
            let motivo = "";

            if (nuevoPorcentaje > viejoPorcentaje) {
                esMejor = true;
                motivo = `¡Nueva Marca Personal! Subiste de ${viejoPorcentaje}% a ${nuevoPorcentaje}% 🚀`;
            }
            else if (nuevoPorcentaje === viejoPorcentaje) {
                if (nuevoTiempoSegundos < viejoTiempo) {
                    esMejor = true;
                    motivo = `¡Más Rápido! Bajaste de ${viejoTiempo}s a ${nuevoTiempoSegundos}s ⚡`;
                }
            }

            if (esMejor) {
                await updateDoc(doc(db, COLLECTION_NAME, docExistente.id), {
                    nivel: datosQuiz.nivel,
                    puntaje: datosQuiz.puntaje,
                    total: datosQuiz.total,
                    porcentaje: nuevoPorcentaje,
                    tiempo: datosQuiz.tiempo || "00:00",
                    tiempo_segundos: nuevoTiempoSegundos,
                    fecha: new Date().toISOString(),
                    timestamp: Date.now()
                });

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: '¡NUEVO RÉCORD! 🏆',
                        text: motivo,
                        icon: 'success',
                        confirmButtonText: '¡Genial!',
                        confirmButtonColor: '#198754',
                        timer: 5000,
                        timerProgressBar: true
                    });
                } else {
                    alert("🎉 " + motivo);
                }
            }
        } else {
            console.log("🆕 Primer juego de este alumno. Guardando...");
            const nuevoRegistro = {
                estudiante: studentName,
                seccion: studentSection,
                nivel: datosQuiz.nivel,
                puntaje: datosQuiz.puntaje,
                total: datosQuiz.total,
                porcentaje: nuevoPorcentaje,
                tiempo: datosQuiz.tiempo || "00:00",
                tiempo_segundos: nuevoTiempoSegundos,
                fecha: new Date().toISOString(),
                timestamp: Date.now()
            };
            await addDoc(collection(db, COLLECTION_NAME), nuevoRegistro);
        }

    } catch (e) {
        console.error("❌ Error guardando puntaje: ", e);
    }
}

async function cargarRankingCloud() {
    const tableBody = document.getElementById('ranking-table-body');
    const badgeSection = document.getElementById('ranking-section-badge');
    const role = localStorage.getItem('atiy_student_section');
    let targetSection = role;

    if (!tableBody) return;

    if (role === 'DOCENTE') {
        const headerContainer = badgeSection ? badgeSection.parentElement : null;
        let select = document.getElementById('admin-section-select');

        if (!select && headerContainer) {
            if (badgeSection) badgeSection.style.display = 'none';
            select = document.createElement('select');
            select.id = 'admin-section-select';
            select.className = 'form-select form-select-sm ms-2 border-primary text-primary fw-bold';
            select.style.width = 'auto';
            select.innerHTML = `
                <option value="C1">C1</option> <option value="C2">C2</option> <option value="C3">C3</option>
                <option value="C4">C4</option> <option value="C5">C5</option> <option value="C6">C6</option>
                <option value="C7">C7</option> <option value="C8">C8</option> <option value="C9">C9</option>
            `;
            select.addEventListener('change', () => cargarRankingCloud());
            headerContainer.appendChild(select);
        }
        if (select) targetSection = select.value;
        else targetSection = "C1";
    } else {
        if (badgeSection) {
            badgeSection.style.display = 'inline-block';
            badgeSection.textContent = targetSection ? `Salón ${targetSection}` : 'Tu Salón';
        }
    }

    if (!targetSection || targetSection === 'DOCENTE') targetSection = 'C1';

    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-muted">Cargando tablero del salón ${targetSection}...</p>
            </td>
        </tr>
    `;

    try {
        // Pedimos Top 50 por Porcentaje (DESC)
        const q = query(
            collection(db, COLLECTION_NAME),
            where("seccion", "==", targetSection),
            orderBy("porcentaje", "desc"),
            limit(50)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Aún no hay registros en el salón ${targetSection}.</td></tr>`;
            return;
        }

        // Convertir a Array para ordenar en JS (Manejo de empates por tiempo)
        let docsArray = [];
        querySnapshot.forEach(doc => {
            docsArray.push({ id: doc.id, ...doc.data() });
        });

        // ORDENAMIENTO PERSONALIZADO (Porcentaje DESC, Tiempo ASC)
        docsArray.sort((a, b) => {
            // 1. Porcentaje (Mayor gana)
            if (b.porcentaje !== a.porcentaje) {
                return b.porcentaje - a.porcentaje;
            }
            // 2. Tiempo en Segundos (Menor gana)
            // Si no tiene tiempo_segundos (legacy), le damos valor alto (99999) para que vaya al final
            let tA = (typeof a.tiempo_segundos === 'number') ? a.tiempo_segundos : 99999;
            let tB = (typeof b.tiempo_segundos === 'number') ? b.tiempo_segundos : 99999;

            if (tA !== tB) {
                return tA - tB;
            }
            // 3. Desempate final por fecha (Quien llegó primero gana si empatan en todo)
            return a.timestamp - b.timestamp;
        });

        // Tomar Top 20 definitivo
        const top20 = docsArray.slice(0, 20);

        let html = "";
        let puesto = 1;

        top20.forEach((data) => {
            let medal = "";
            if (puesto === 1) medal = "🥇";
            if (puesto === 2) medal = "🥈";
            if (puesto === 3) medal = "🥉";

            const currentUser = localStorage.getItem('atiy_student_name');
            const isMe = (data.estudiante === currentUser && role !== 'DOCENTE');

            let tiempoDisplay = "--:--";
            if (data.tiempo_segundos) tiempoDisplay = `${data.tiempo_segundos}s`;
            else if (data.tiempo) tiempoDisplay = data.tiempo;

            html += `
                <tr class="${isMe ? "table-active fw-bold border-start border-4 border-primary" : ""}">
                    <td class="ps-4 fw-bold text-secondary">${medal || puesto}</td>
                    <td>${data.estudiante} ${isMe ? '(Tú)' : ''}</td>
                    <td><span class="badge bg-light text-dark border">${data.nivel?.toUpperCase()}</span></td>
                    <td class="text-center">
                        <span class="badge ${getBadgeColor(data.porcentaje)} fs-6">${data.porcentaje}%</span>
                        <small class="text-muted d-block" style="font-size:0.7em">(${data.puntaje}/${data.total})</small>
                    </td>
                    <td class="text-end pe-4 font-monospace text-primary fw-bold small">${tiempoDisplay}</td>
                </tr>
            `;
            puesto++;
        });
        tableBody.innerHTML = html;

    } catch (error) {
        console.error("Error cargando ranking:", error);
        let msg = "Error de conexión.";
        if (error.code === 'failed-precondition') {
            msg = "Falta índice en Firebase. Revisa consola (F12).";
        }
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">❌ ${msg}</td></tr>`;
    }
}

function getBadgeColor(p) {
    if (p >= 90) return "bg-success";
    if (p >= 70) return "bg-primary";
    if (p >= 50) return "bg-warning text-dark";
    return "bg-danger";
}

window.guardarPuntajeCloud = guardarPuntajeCloud;
window.cargarRankingCloud = cargarRankingCloud;
