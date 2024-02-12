const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,

  // nous exposons cette fonction pour qu'il déclenche l'exécution du code défini dans le processus principal
  ping: () => ipcRenderer.invoke('ping') 
});
