import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// No importamos db aquí todavía, solo autenticación

// Usar la misma configuración que firebase-config.js (o importar de ahí si es fácil)
// Para evitar duplicidad, lo ideal sería exportar 'app' de firebase-config.js, 
// pero como js/login.js a veces no es módulo, vamos a hacerlo autocontenido aquí por seguridad del Login.

const firebaseConfig = {
    apiKey: "AIzaSyBSa3dYyReJNc4H8Tl4hlOj5j0AKUc3TII",
    authDomain: "atiy-pukllay-saas.firebaseapp.com",
    projectId: "atiy-pukllay-saas",
    storageBucket: "atiy-pukllay-saas.firebasestorage.app",
    messagingSenderId: "170061115925",
    appId: "1:170061115925:web:4e3011849d13be0c07d41c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Función de Login
async function loginConGoogle() {
    try {
        console.log("🔐 Intentando login con Google...");
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log("✅ Login exitoso:", user.displayName);

        // Guardar token básico en localStorage para compatibilidad con código legacy
        localStorage.setItem('atiy_user', JSON.stringify({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }));

        // Redirigir al juego
        window.location.href = "index.html";

    } catch (error) {
        console.error("❌ Error en login:", error);
        alert("Error al iniciar sesión: " + error.message);
    }
}

// Función de Logout (para index.html)
async function cerrarSesion() {
    try {
        await signOut(auth);
        localStorage.removeItem('atiy_user');
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
}

// Exponer funciones globalmente (porque los botones HTML onclick="bla()" las necesitan)
window.loginConGoogle = loginConGoogle;
window.cerrarSesion = cerrarSesion;

// Observador de estado (opcional por ahora)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("👤 Usuario detectado:", user.email);
    } else {
        console.log("👤 No hay usuario activo.");
    }
});
