const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  onOpen: (callback) => {
    const handler = (_event, data) => callback(data);
    ipcRenderer.on("open", handler);
    return () => ipcRenderer.removeListener("open", handler);
  },
  onSaveAs: (callback) => {
    const handler = (_event) => callback();
    ipcRenderer.on("save_as", handler);
    return () => ipcRenderer.removeListener("save_as", handler);
  },
});
