/// <reference types="vite/client" />

declare global {
  interface Window {
    electronAPI?: {
      onOpen: (callback: (data: unknown) => void) => (() => void) | undefined;
      onSaveAs: (callback: () => void) => (() => void) | undefined;
    };
  }
}

export {};
