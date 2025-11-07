import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Handler per salvare nel path passato come parametro
  ipcMain.on("save-to-path", (_event, filePath, data) => {
    try {
      // Risolvi il path relativo rispetto alla directory dell'app
      const savePath = path.isAbsolute(filePath)
        ? filePath
        : path.join(__dirname, filePath);

      // Assicurati che la directory esista
      const dir = path.dirname(savePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // Salva il file
      fs.writeFileSync(savePath, data);
      win.webContents.send("save-success");
    } catch (error) {
      console.error("Error saving file", error);
      win.webContents.send("save-error", error.message);
    }
  });

  const template = [
    ...(process.platform === "darwin" ? [{ role: "appMenu" }] : []),
    {
      role: "fileMenu",
      submenu: [
        {
          label: "New",
          click: () => {
            win.webContents.send("new");
          },
        },
        {
          label: "Open",
          click: async () => {
            const result = await dialog.showOpenDialog({
              properties: ["openFile"],
              filters: [{ name: "JSON Files", extensions: ["json"] }],
            });

            if (result.canceled) return;

            try {
              const file = result.filePaths[0];
              const fileContent = fs.readFileSync(file, "utf8");
              const data = JSON.parse(fileContent);
              win.webContents.send("open", { ...data, filePath: file });
            } catch (error) {
              console.error("Error reading file", error);
            }
          },
        },
        {
          label: "Save",
          click: () => {
            win.webContents.send("save");
          },
        },
        {
          label: "Save as",
          click: () => {
            win.webContents.send("save_as");
          },
        },
        ...(isDev
          ? [
              {
                label: "Dev Mode",
                submenu: [
                  {
                    label: "Open Dev Tools",
                    click: () => {
                      win.webContents.openDevTools();
                    },
                  },
                ],
              },
            ]
          : []),
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  if (isDev) {
    // In development, load from Vite dev server
    win.loadURL("http://localhost:5173");
    // Open DevTools in development
    win.webContents.openDevTools();
  } else {
    // In production, load from built files
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
