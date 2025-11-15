/// <reference types="vite/client" />

declare global {
  interface Window {
    electronAPI?: {
      onOpen: (callback: (data: unknown) => void) => (() => void) | undefined;
      onSaveAs: (
        callback: (filePath: string) => void
      ) => (() => void) | undefined;
      saveToPath: (filePath: string, data: string) => Promise<boolean>;
      onNew: (callback: () => void) => (() => void) | undefined;
    };
  }
}

export {};
