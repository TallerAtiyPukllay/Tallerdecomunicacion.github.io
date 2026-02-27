const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        // icon: path.join(__dirname, 'assets/icon.ico'), // Icono deshabilitado temporalmente
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false // Desactiva DevTools
        }
    });

    mainWindow.loadFile('login.html');

    // Elimina el menú superior
    mainWindow.setMenu(null);

    // Evita abrir DevTools con atajos
    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F12' || (input.control && input.shift && input.key === 'I')) {
            event.preventDefault();
        }
    });

    // Escuchar evento LOGIN EXITOSO desde login.js
    ipcMain.on('login-success', () => {
        mainWindow.loadFile('index.html');
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
