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
  onSave: (callback) => {
    const handler = (_event) => callback();
    ipcRenderer.on("save", handler);
    return () => ipcRenderer.removeListener("save", handler);
  },
  onSaveSuccess: (callback) => {
    const handler = () => callback();
    ipcRenderer.on("save-success", handler);
    return () => ipcRenderer.removeListener("save-success", handler);
  },
  onSaveError: (callback) => {
    const handler = (_event, error) => callback(error);
    ipcRenderer.on("save-error", handler);
    return () => ipcRenderer.removeListener("save-error", handler);
  },
  saveToPath: (filePath, data) => {
    ipcRenderer.send("save-to-path", filePath, data);
  },
});
