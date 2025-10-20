import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
} from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { Busyo } from "./models";
import fs from "fs";
import { BusyoJson } from "./main/busyo-json";
import { BusyoInfo } from "./types";

const BUSYO_JSON = "busyo.json";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.setMenu(
    (() => {
      const template: (MenuItemConstructorOptions | MenuItem)[] = [
        {
          label: "Help",
          submenu: [
            // 開発ツールを開くメニュー
            {
              label: "DevTool",
              click: () => {
                mainWindow.webContents.openDevTools();
              },
            },
          ],
        },
      ];
      // Menuクラスを定義から生成
      return Menu.buildFromTemplate(template);
    })()
  );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("save-busyo", (_, busyos: BusyoInfo[]) => {
  const json: BusyoJson = { busyos: busyos };
  fs.writeFileSync(BUSYO_JSON, JSON.stringify(json, null, 2), "utf-8");
});

ipcMain.handle("load-busyo", () => {
  if (!fs.existsSync(BUSYO_JSON)) {
    return { busyos: [] } as BusyoJson;
  }
  const data = fs.readFileSync(BUSYO_JSON, "utf-8");
  const json: BusyoJson = JSON.parse(data);

  const array: Busyo[] = json.busyos.map((b) => {
    const busyo = new Busyo();
    busyo.loadFromBusyoInfo(b);
    return busyo;
  });
  return array;
});