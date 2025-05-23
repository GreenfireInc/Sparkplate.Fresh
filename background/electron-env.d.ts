/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬ dist
     * │ ├─┬ background
     * │ │ └── index.js    > Electron-Main
     * │ ├─┬ preload
     * │ │ └── index.mjs   > Preload-Scripts
     * │ └── index.html    > Electron-Renderer (and other assets)
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
    // MAIN_DIST and RENDERER_DIST are part of the base type, 
    // their meaning is now implicitly the main 'dist' folder.
  }
}
