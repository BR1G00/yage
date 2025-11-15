const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  onNew: (callback) => {
    const handler = () => callback();
    ipcRenderer.on("new", handler);
    return () => ipcRenderer.removeListener("new", handler);
  },

  onOpen: (callback) => {
    const handler = (_event, data) => callback(data);
    ipcRenderer.on("open", handler);
    return () => ipcRenderer.removeListener("open", handler);
  },

  onSaveAs: (callback) => {
    const handler = (_event, filePath) => callback(filePath);
    ipcRenderer.on("save_as", handler);
    return () => ipcRenderer.removeListener("save_as", handler);
  },
  saveToPath: (filePath, data) => {
    return ipcRenderer.invoke("save-to-path", filePath, data);
  },
});
