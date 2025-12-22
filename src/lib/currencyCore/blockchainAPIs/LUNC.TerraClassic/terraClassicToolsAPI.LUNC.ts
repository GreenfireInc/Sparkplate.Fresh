/**
 * Terra Classic Tools API
 * 
 * Ecosystem hub for Terra Classic blockchain
 * 
 * Features:
 * - Free access
 * - Live LUNC price tracking
 * - Burn monitoring
 * - USTC re-peg tracking
 * - Staking yields and DeFi information
 * 
 * Website: https://www.terra-classic.money/
 */

import axios, { AxiosInstance } from 'axios';

// API Configuration
export interface TerraClassicToolsConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
}

// Price Information
export interface TerraClassicPrice {
  lunc: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
    usd_market_cap: number;
  };
  ustc: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
    usd_market_cap: number;
  };
}

// Burn Statistics
export interface TerraClassicBurnStats {
  total_burned: string;
  burn_rate_24h: string;
  burn_rate_7d: string;
  burn_rate_30d: string;
  tax_burn: string;
  oracle_burn: string;
  ibc_burn: string;
  total_transactions_with_burn: number;
  last_updated: string;
}

// USTC Re-peg Information
export interface USTCRepegInfo {
  current_price: number;
  target_price: number;
  repeg_progress: number;
  backing_ratio: number;
  total_supply: string;
  circulating_supply: string;
}

// Staking Information
export interface TerraClassicStakingInfo {
  total_staked: string;
  staking_ratio: number;
  average_apr: number;
  total_validators: number;
  active_validators: number;
  bonded_tokens: string;
  unbonded_tokens: string;
}

// Validator
export interface TerraClassicToolsValidator {
  operator_address: string;
  moniker: string;
  identity: string;
  website: string;
  voting_power: string;
  commission: string;
  apr: number;
  uptime: number;
  status: string;
  jailed: boolean;
}

// DeFi Stats
export interface TerraClassicDefiStats {
  total_value_locked: string;
  dex_volume_24h: string;
  top_dapps: Array<{
    name: string;
    tvl: string;
    volume_24h: string;
    category: string;
  }>;
}

// Account Balance
export interface TerraClassicToolsBalance {
  address: string;
  lunc_balance: string;
  lunc_value_usd: number;
  ustc_balance: string;
  ustc_value_usd: number;
  other_tokens: Array<{
    denom: string;
    amount: string;
    value_usd: number;
  }>;
  total_value_usd: number;
}

export class TerraClassicToolsAPI {
  private client: AxiosInstance;
  private config: Required<TerraClassicToolsConfig>;

  constructor(config: TerraClassicToolsConfig = {}) {
    this.config = {
      baseURL: config.baseURL || 'https://api.terra-classic.money',
      timeout: config.timeout || 10000,
      retries: config.retries || 3,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get current prices for LUNC and USTC
   */
  async getPrices(): Promise<TerraClassicPrice> {
    const response = await this.client.get('/v1/prices');
    return response.data;
  }

  /**
   * Get burn statistics
   */
  async getBurnStats(): Promise<TerraClassicBurnStats> {
    const response = await this.client.get('/v1/burn');
    return response.data;
  }

  /**
   * Get USTC re-peg information
   */
  async getUSTCRepegInfo(): Promise<USTCRepegInfo> {
    const response = await this.client.get('/v1/ustc/repeg');
    return response.data;
  }

  /**
   * Get staking information
   */
  async getStakingInfo(): Promise<TerraClassicStakingInfo> {
    const response = await this.client.get('/v1/staking');
    return response.data;
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<TerraClassicToolsBalance> {
    const response = await this.client.get(`/v1/account/${address}/balance`);
    return response.data;
  }

  /**
   * Get validators
   */
  async getValidators(): Promise<TerraClassicToolsValidator[]> {
    const response = await this.client.get('/v1/validators');
    return response.data.validators || [];
  }

  /**
   * Get validator by address
   */
  async getValidator(validatorAddress: string): Promise<TerraClassicToolsValidator> {
    const response = await this.client.get(`/v1/validator/${validatorAddress}`);
    return response.data;
  }

  /**
   * Get top validators by voting power
   */
  async getTopValidators(limit: number = 10): Promise<TerraClassicToolsValidator[]> {
    const response = await this.client.get('/v1/validators/top', {
      params: { limit },
    });
    return response.data.validators || [];
  }

  /**
   * Get DeFi statistics
   */
  async getDefiStats(): Promise<TerraClassicDefiStats> {
    const response = await this.client.get('/v1/defi');
    return response.data;
  }

  /**
   * Get historical burn data
   */
  async getHistoricalBurn(days: number = 30): Promise<Array<{
    date: string;
    burned: string;
  }>> {
    const response = await this.client.get('/v1/burn/history', {
      params: { days },
    });
    return response.data.history || [];
  }

  /**
   * Get historical price data
   */
  async getHistoricalPrice(token: 'lunc' | 'ustc', days: number = 30): Promise<Array<{
    timestamp: number;
    price: number;
    volume: number;
  }>> {
    const response = await this.client.get(`/v1/price/${token}/history`, {
      params: { days },
    });
    return response.data.history || [];
  }

  /**
   * Get chain statistics
   */
  async getChainStats(): Promise<{
    total_supply: string;
    circulating_supply: string;
    bonded_ratio: number;
    inflation: string;
    apr: number;
    block_height: number;
    block_time: number;
  }> {
    const response = await this.client.get('/v1/stats');
    return response.data;
  }

  /**
   * Get bridges information
   */
  async getBridges(): Promise<Array<{
    name: string;
    url: string;
    supported_chains: string[];
    total_volume: string;
  }>> {
    const response = await this.client.get('/v1/bridges');
    return response.data.bridges || [];
  }

  /**
   * Get wallets information
   */
  async getWallets(): Promise<Array<{
    name: string;
    url: string;
    platforms: string[];
    features: string[];
  }>> {
    const response = await this.client.get('/v1/wallets');
    return response.data.wallets || [];
  }

  /**
   * Get community proposals
   */
  async getProposals(status?: 'active' | 'passed' | 'rejected'): Promise<Array<{
    id: number;
    title: string;
    description: string;
    status: string;
    voting_end_time: string;
    yes_votes: string;
    no_votes: string;
    abstain_votes: string;
  }>> {
    const response = await this.client.get('/v1/proposals', {
      params: status ? { status } : {},
    });
    return response.data.proposals || [];
  }
}

// Singleton instance
export const terraClassicToolsAPI = new TerraClassicToolsAPI();

