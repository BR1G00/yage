/// <reference types="vite/client" />

declare global {
    interface Window {
        electronAPI?: {
            onSave: (callback: () => void) => (() => void) | undefined;
        };
    }
}

export { };

