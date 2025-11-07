/// <reference types="vite/client" />

declare global {
  interface Window {
    electronAPI?: {
      onOpen: (callback: (data: unknown) => void) => (() => void) | undefined;
      onSaveAs: (callback: () => void) => (() => void) | undefined;
      onSave: (callback: () => void) => (() => void) | undefined;
      onSaveSuccess: (callback: () => void) => (() => void) | undefined;
      onSaveError: (
        callback: (error: string) => void
      ) => (() => void) | undefined;
      saveToPath: (filePath: string, data: string) => void;
      onNew: (callback: () => void) => (() => void) | undefined;
    };
  }
}

export {};
