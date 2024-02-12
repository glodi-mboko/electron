const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path"); // Api path

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),// création du path sous forme de string, __dirname recupère le chemin du script
    },
  });

  win.loadFile("index.html");
};

/* Le code à l'intérieur du fct est exécuté lorsque elctron est prêt à créer les fenêtres */
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow();

  /* Pour macos lorsque le user click sur l'icône de la barre de tâche */
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

/*Quitter l'application lorsque toutes les fenêtres sont fermées (Windows & Linux)*/
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
