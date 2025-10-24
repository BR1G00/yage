const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  onSave: (callback) => {
    const handler = (_event) => callback();
    ipcRenderer.on("save", handler);
    return () => ipcRenderer.removeListener("save", handler);
  },
});
