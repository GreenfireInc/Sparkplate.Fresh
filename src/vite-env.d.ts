/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from '@vue/runtime-core'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  // expose in the `background/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}
