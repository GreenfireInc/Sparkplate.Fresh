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