/// <reference types="vite/client" />

declare global {
  interface Window {
    electronAPI?: {
      onOpen: (callback: (data: unknown) => void) => (() => void) | undefined;
      onSaveAs: (
        callback: (filePath: string) => void
      ) => (() => void) | undefined;
      onSave: (callback: () => void) => (() => void) | undefined;
      saveToPath: (filePath: string, data: string) => Promise<boolean>;
      updateSaveMenu: (hasFilePath: boolean) => void;
      onNew: (callback: () => void) => (() => void) | undefined;
    };
  }
}

export {};
