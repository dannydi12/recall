// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

export const backend = {
  query: async (query: string, ...params: any): Promise<string> =>
    await ipcRenderer.invoke("query", query, ...params),
  list: async (query: string, ...params: any): Promise<string> =>
    await ipcRenderer.invoke("list", query, ...params),
  mutate: async (query: string, ...params: any): Promise<string> =>
    await await ipcRenderer.invoke("mutate", query, ...params),
  import: async (path: string): Promise<string> =>
    await await ipcRenderer.invoke("import", path),
};

export const openExternalLink = (url: string) =>
  ipcRenderer.invoke("open-external-link", url);

contextBridge.exposeInMainWorld("openExternalLink", openExternalLink);

contextBridge.exposeInMainWorld("backend", backend);
