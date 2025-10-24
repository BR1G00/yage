/// <reference types="vite/client" />

declare global {
    interface Window {
        electronAPI?: {
            onOpen: (callback: (data: unknown) => void) => (() => void) | undefined;
            onSave: (callback: () => void) => (() => void) | undefined;
        };
    }
}

export { };

