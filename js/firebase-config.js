// Importar las funciones que necesitamos de los SDKs de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; // Para el futuro Login

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBSa3dYyReJNc4H8Tl4hlOj5j0AKUc3TII",
    authDomain: "atiy-pukllay-saas.firebaseapp.com",
    projectId: "atiy-pukllay-saas",
    storageBucket: "atiy-pukllay-saas.firebasestorage.app",
    messagingSenderId: "170061115925",
    appId: "1:170061115925:web:4e3011849d13be0c07d41c"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

console.log("🔥 Firebase conectado exitosamente!");

export { db }; // Exportamos 'db' para usarlo en otros archivos (practica.js, etc)
