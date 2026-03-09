# 🎓 Atiy Pukllay - Plataforma Educativa EdTech v1.0

![Estado](https://img.shields.io/badge/Estado-Producci%C3%B3n-success) ![Versión](https://img.shields.io/badge/Versi%C3%B3n-1.0-blue) ![Licencia](https://img.shields.io/badge/Licencia-Propiedad_Intelectual-orange)

**Atiy Pukllay** (del quechua "El poder de jugar") es una **plataforma educativa interactiva SaaS (Software as a Service)** diseñada para dominar los **signos de puntuación** en español. Combina teoría detallada de lectura, práctica gamificada con minijuegos dinámicos y un poderoso dashboard de monitoreo en tiempo real (Backend Cloud) para docentes e institutos.

---

## ✨ Características Principales

### 📚 1. Biblioteca de Conocimiento
Una guía teórica completa e interactiva sobre el uso correcto de los signos de puntuación.
- **Navegación Intuitiva**: Menú lateral para acceder rápidamente a cada signo.
- **Contenido Estructurado**: Explicaciones claras, reglas de uso, ejemplos "incorrecto vs correcto" y secciones de "Zona de Peligro" para errores comunes.
- **Diseño Visual**: Tarjetas de información, iconos y tipografía legible (Merriweather y Lato).

### ✏️ 2. El Camino del Saber (Tablero Interactivo Multijuegos)
Un robusto tablero virtual inspirado en los clásicos de mesa, donde el estudiante usa tiradas de dado virtuales, avanzará por casilleros de premio/trampa y se enfrentará a una inteligencia procedimental de 7 súper mini-retos de alto impacto cognitivo (optimizados para pantallas táctiles y ratones):
- **Cazador de Intrusos** (Encontrar la oración mal puntuada).
- **Rellena el Hueco** (Adivinar el signo faltante con opciones rápidas).
- **Bomba de Tiempo** (Evaluar Verdadero/Falso antes que explote a 15s).
- **Memorama de Cartas** (Emparejar conceptos de signos).
- **Constructor de Comas** (Colocar comillas y comas con clicks de precisión).
- **Rompecabezas Sintáctico** (Reordenar y unir bloques modulares de una oración).
- **Ahorcado Conceptual** (Descubrir un término teórico secreto perdiendo vidas).

### 📝 3. Evaluación Gamificada (Quiz)
Pon a prueba tus conocimientos con un sistema de preguntas desafiante.
- **3 Niveles de Dificultad**:
  - 🟢 **Básico**: 5 preguntas fundamentales.
  - 🔵 **Intermedio**: 10 preguntas de complejidad media.
  - 🔴 **Avanzado**: 15 preguntas para expertos.
- **Sistema de Rachas**: Gana puntos extra por respuestas correctas seguidas.
- **Temporizador**: Control de tiempo para añadir emoción (opcional).

### 📊 4. Progreso y Monitoreo en Tiempo Real (Docentes)
Seguimiento macro y micro detallado de la evolución de las aulas en la nube.
- **Dashboard Estadístico Estudiantil**: Gráficos interactivos de Chart.js con promedios, récord histórico y ranking global.
- **Tabla de Líderes y Radar Docente**: Los administradores o profesores pueden filtrar por *Código de Clase* para revisar y monitorear el ranking competitivo en vivo de sus estudiantes interconectados por Google Firebase.
- **Sincronización Mágica Integral**: Permite que los estudiantes puedan "Migrar de salón" o corregir su ID de aula, trasladando de forma relacional y 100% segura todo su avance, score y puntos de experiencia.

---

Este ambicioso proyecto ha sido construido estructurando buenas prácticas de diseño de software e interfaces UI/UX de alta calidad, basándose en la arquitectura **BaaS (Backend-as-a-Service)**:

- **Core Frontend Autocontenido**:
  - **HTML5**: Semántico y estructurado.
  - **CSS3 (Vanilla)**: Diseño Flexbox, Grid y animaciones complejas personalizadas (Glassmorphism y Micro-animaciones).
  - **JavaScript (ES6+)**: Lógica masiva modular, inyección visual controlada y Programación Orientada a Objetos para el lado del cliente (Client-Side State Management).

- **Servicios Cloud (BaaS) - Lógica de Base de Datos y Servidor**:
  - **Firebase Auth (`auth.js`)**: Verificación ultra-rápida de seguridad de inicio de sesión de identidades (Vía Google Accounts) sin latencia, más modo Invitados temporales.
  - **Firebase Firestore (`practica-cloud.js`, `progreso-cloud.js`)**: Base de datos NoSQL documental súper rápida de la arquitectura de Google Cloud, utilizada para guardar las sesiones de práctica, la metadata del jugador y renderizar las consultas de la Tabla de Ranking de Profesores en tiempo real.

- **Frameworks y Librerías de Diseño**:
  - **Bootstrap 5.3**: Patrones de Grid modulares y selectores tipográficos de UI.
  - **SweetAlert2**: Pop-ups, Modales Dinámicos y Toasts con alto grado de personalización asíncrona que actúan como "pantallas de videojuegos".
  - **Chart.js** (Data vizualization).
  - **Confetti.js** y **Google Fonts** (Inter y Merriweather).

## 🚀 Estructura e Implementación

La plataforma actualmente está implementada íntegramente de manera "Serverless" aprovechando la seguridad integrada de los servicios de alojamiento de Frontend más BaaS:
- **Visualización/Hosting**: Integrado a **GitHub Pages** (gratuito, para despachar el sitio ultraliviano).
- **Backend**: Despachado invisiblemente e implementado sobre la granja de servidores de **Google Firebase (Plan Spark gratuito)**.

Para desplegarlo privadamente u operar sobre los archivos de código fuente central de la Versión 1 (*Clean Version*):
1. **Archivo de Entrada**: El sistema arranca desde `login.html` en cualquier computadora y se redigirá autómaticamente hacia `index.html` bajo autorización segura.
2. Todo el código algorítmico, reglas de negocio y mecánicas de minijuegos están intencionalmente albergados localmente en texto puro dentro del directorio `./js/` para propósitos didácticos y para la facilidad del **Inscripción en Propiedad Intelectual de INDECOPI (Dirección de Derecho de Autor)** como una "Obra íntegra local".

## 📂 Estructura del Proyecto

```text
Atiy-Pukllay/
├── assets/             # Recursos estáticos (sonidos, favicons)
│   └── data/           # Archivos de datos serializados (preguntas de quizzes, JSONs)
├── css/                # Hojas de estilo Core CSS
│   ├── board.css           # Estilos super-especializados de tableros de dados
│   ├── styles.css          # Estructura principal GlassMorphism y UX base
│   └── login.css           # Pantalla inmersiva de acceso Cloud
├── js/                 # Corazón Lógico del Software
│   ├── firebase-config.js  # Puente seguro con el BaaS
│   ├── auth.js             # Módulo ultra-securizado para Google Sign-in
│   ├── practica.js         # Inteligencia artificial de los 7 minijuegos y tableros
│   ├── practica-cloud.js   # Handlers y Fetchers NoSQL de Ranking de profesores
│   ├── progreso-cloud.js   # Recuperación e intercambio de scores para mudanza entre Aulas
│   └── data.js             # Objeto Literal maestro de Biblioteca Dinámica Ortográfica
├── login.html          # Gateway y Barrera de rol inicial de la Plataforma
├── index.html          # Interfaz Modular principal (Single Page Application UX-Style)
├── README.md           # Ficha Técnica Descriptiva del Desarrollo
└── MANUAL_USUARIO.md   # Guía paso a paso para perfiles estudiantes y docente
```

---

## 👥 Equipo de Desarrollo

**Colaboradores y Creadores:**
- Docentes e Investigadores en Educación y Tecnología.
- Implementación de lógica educativa, gamificación y diseño de interfaz (UI/UX).

---

## 📄 Licencia

Este proyecto está bajo una licencia educativa abierta. Eres libre de usarlo, modificarlo y compartirlo con fines de aprendizaje y enseñanza, siempre atribuyendo la autoría original.

---

<p align="center">
  <sub>Desarrollado con ❤️ para la educación. 2026.</sub>
</p>
