// TypeScript declarations for background modules

declare module '@background/functions/utils/domains/ens' {
  export interface GetAddressParams {
    domain: string;
    coinTicker: string;
    network?: string;
  }

  export function getAddress(params: GetAddressParams): Promise<string>;

  export const ens: {
    getAddress: typeof getAddress;
  };
}

// Window extensions for Electron preload APIs
declare global {
  interface Window {
    app: {
      getPreloadData(): Promise<AppData>;
      getGPUInfo(): Promise<{ auxAttributes: { glRenderer: string } }>;
      getUsbDrives(): Promise<Array<{ description: string; size: number | null; mountpoints: string[]; isRemovable: boolean }>>;
      electronVersion: string;
      nodeVersion: string;
    };
    appData: AppData;
  }

  interface AppData {
    hostname: string;
    osVersion: string;
    systemMemory: number;
    processor: string;
    electronVersion: string;
    nodeVersion: string;
  }
}

// Vue global properties
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $moment: typeof import('moment');
  }
} 