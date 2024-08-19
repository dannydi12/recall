import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { db, dbMutate, dbQuery } from "./utils/db";
import { seed } from "./utils/seed";
import { convertBookmarksToJSON } from "./utils/convertBookmarksToJson";
import fs from "fs";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  seed();
  const row = db.prepare("SELECT * FROM bookmarks").get();
  console.log(row);
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// close DB connection when shut down
app.on("before-quit", () => db.close());

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("query", async (event, query, ...params) => {
  try {
    const data = dbQuery(query, ...params);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
});

ipcMain.handle("mutate", async (event, query, ...params) => {
  try {
    const data = dbMutate(query, ...params);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
});

ipcMain.handle("import", async (event, path) => {
  const bookmarksJSON = convertBookmarksToJSON(path);
  fs.writeFileSync("import.json", JSON.stringify(bookmarksJSON, null, 2));
});
