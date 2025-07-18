import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

contextBridge.exposeInMainWorld('app', {
  getGPUInfo: () => ipcRenderer.invoke('appGetGPUInfo'),
  getPreloadData: () => ipcRenderer.invoke('preloadAppData'),
  electronVersion: process.versions.electron,
  nodeVersion: process.versions.node
});

// --------- Preload scripts loading ---------
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__greenfire-spinner`
  const styleContent = `
.${className} {
  width: 120px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.${className} svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(92, 186, 71, 0.3));
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `
  const greenfireSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139.69 191.94">
  <defs>
    <style>
      .cls-1{
        fill:#b0d89a;
        animation: flicker 3s infinite alternate, wobble 4s ease-in-out infinite;
        transform-origin: center bottom;
      }
      .cls-2{
        fill:#5cba47;
        animation: waver 4s infinite alternate, pulse 2s ease-in-out infinite;
        transform-origin: center bottom;
      }

      @keyframes flicker {
        0%, 100% { opacity: 1; }
        25% { opacity: 0.95; }
        50% { opacity: 0.97; }
        75% { opacity: 0.93; }
      }

      @keyframes waver {
        0% { transform: scaleX(1.00) skewX(0deg); }
        25% { transform: scaleX(1.03) skewX(1deg); }
        50% { transform: scaleX(0.97) skewX(-1deg); }
        75% { transform: scaleX(1.02) skewX(0.5deg); }
        100% { transform: scaleX(1.00) skewX(0deg); }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }

      @keyframes wobble {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(2px) rotate(0.5deg); }
        75% { transform: translateX(-2px) rotate(-0.5deg); }
      }
    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path class="cls-1" d="M83,126.65c-6.43,13.38-3.22,32.7-3.22,32.7-29.46-23.55-17.5-56.64-17.5-56.64C66.2,119.4,83,126.65,83,126.65Zm-48.18,9.49s1.22,17.37,25,14.62C59.86,150.76,44.53,146.2,34.81,136.14Z"/>
      <path class="cls-2" d="M90.75,152.9a66.35,66.35,0,0,1,11.33-36.81c-2.46,1.68-6.51,1.67-6.51,1.67-19.18,0-25.36-21.32-25.36-29.64A97.51,97.51,0,0,1,72,71.22c-13.55,11.94-19.71,33-19.71,45.88s5.09,20,5.09,20C29.17,136.81,24.75,114,24.75,114c-2,12.74,2.29,29.37,2.29,29.37a48.07,48.07,0,0,1-13.68-33.13c0-20.52,15.15-39.7,15.15-39.7-1.35,15.56,9.12,29,9.12,29,0-8.72,7.23-34.61,35.67-54.46S99.19,0,99.19,0c8.32,9.52,13.55,26.42,6,40.9S96.5,72.83,96.5,72.83s-2,16.77,11.27,16.77c20.27,0,15.17-37.29,15.17-37.29C139.56,64,139.63,87.12,139.63,87.12s2.21,15.28-20.52,43.25C94.28,160.92,100,188.92,100,188.92S90.75,174.63,90.75,152.9ZM2,123s-2,8.75-2,14.78,2.11,33.6,41.66,36.82c0,0,36.91,2.72,51.23,17.31,0,0-4-24.14-28.44-29.52s-30.58-.1-51.09-18.82C13.36,143.6,4.56,135.2,2,123Z"/>
    </g>
  </g>
</svg>
  `
  
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}">${greenfireSVG}</div>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)
