<template>
  <div class="dr-view">
    <p class="dr-desc">Resolve human-readable domain names to cryptocurrency addresses</p>

    <section class="dr-section">
      <form class="dr-form" @submit.prevent="resolveAddress">
        <div class="dr-fields">
          <div class="dr-field" role="group" aria-labelledby="dr-label">
            <Label id="dr-label" for="dr-domain" class="dr-label">Domain Name</Label>
            <div class="dr-input-row">
              <DropdownMenuRoot v-model:open="dropdownOpen">
                <DropdownMenuTrigger
                  class="dr-trigger"
                  type="button"
                  aria-haspopup="listbox"
                  :aria-expanded="dropdownOpen"
                  aria-label="Select network"
                >
                  <span class="dr-trigger-text">{{ selectedNetwork || 'Networks' }}</span>
                  <ChevronDown :size="14" class="dr-trigger-chevron" aria-hidden />
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent
                    class="dr-menu"
                    :side-offset="4"
                    align="start"
                  >
                    <DropdownMenuItem
                      v-for="service in availableDomainServices"
                      :key="service.name"
                      class="dr-menu-item"
                      :title="service.description"
                      @click="selectNetwork(service.displayName)"
                    >
                      <img
                        v-if="getServiceIcon(service.name)"
                        :src="getServiceIcon(service.name)"
                        alt=""
                        class="dr-menu-icon"
                        aria-hidden
                      />
                      <span>{{ service.displayName }}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator v-if="unavailableDomainServices.length" class="dr-menu-sep" />
                    <DropdownMenuItem
                      v-for="service in unavailableDomainServices"
                      :key="service.name"
                      class="dr-menu-item dr-menu-item--disabled"
                      :title="service.description"
                      disabled
                    >
                      <img
                        v-if="getServiceIcon(service.name)"
                        :src="getServiceIcon(service.name)"
                        alt=""
                        class="dr-menu-icon dr-menu-icon--muted"
                        aria-hidden
                      />
                      <span>{{ service.displayName }} (Unavailable)</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenuRoot>
              <Primitive
                as="input"
                id="dr-domain"
                v-model="domainAddress.domain"
                type="search"
                class="dr-input"
                placeholder="Enter a domain (e.g., example.eth)"
                :aria-describedby="'dr-hint'"
                required
              />
              <Primitive
                as="button"
                type="submit"
                class="dr-submit"
                :disabled="!isFormValid || domainAddress.loading"
              >
                <span v-if="domainAddress.loading" class="dr-spinner" aria-hidden />
                {{ domainAddress.loading ? 'Searching...' : 'Search' }}
              </Primitive>
            </div>
            <p id="dr-hint" class="dr-hint">
              Currently supporting: {{ availableDomainServices.map((s: DomainServiceMetadata) => s.extensions.map((e: string) => `.${e}`).join(', ')).join(', ') }} domains
            </p>
          </div>

          <div v-if="isEthereumNameService" class="dr-info">
            <Info :size="18" class="dr-info-icon" aria-hidden />
            <span class="dr-info-text">Ethereum Name Service selected — will resolve to ETH address</span>
          </div>
        </div>

        <domain-resolution-badge
          v-if="domainAddress.enabled"
          :domain-address="domainAddress"
          :currency="effectiveCoinTicker"
        />

        <div class="dr-about">
          <h3 class="dr-about-title">About Domain Resolution</h3>
          <p class="dr-about-desc">
            This tool resolves human-readable domain names to cryptocurrency addresses using various blockchain domain services.
          </p>
          <ul class="dr-about-list">
            <li v-for="service in availableDomainServices" :key="service.name" class="dr-about-item">
              <span class="dr-about-label">{{ service.extensions.map((e: string) => `.${e}`).join(', ') }} domains</span>
              — {{ service.description }}
            </li>
            <li v-for="service in unavailableDomainServices" :key="service.name" class="dr-about-item dr-about-item--unavail">
              <span class="dr-about-label">{{ service.extensions.map((e: string) => `.${e}`).join(', ') }} domains</span>
              — <span class="dr-about-strike">{{ service.description }}</span> (temporarily unavailable)
            </li>
          </ul>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Label,
  Primitive,
} from 'radix-vue'
import { ChevronDown, Info } from 'lucide-vue-next'
import { domainMixins } from '../../../utils/mixins/domainMixins'
import ens from '@/utils/currencyCore/domains/ens'
import DomainResolutionBadge from '@/utils/currencyCore/domains/domainRouter.vue'
import { getDomainServices, type DomainServiceMetadata } from '@/utils/currencyCore/domains/index'

defineOptions({ name: 'DomainResolver' })

const coinTicker = ref('')
const selectedNetwork = ref('')
const dropdownOpen = ref(false)
const domainAddress = reactive({
  address: '',
  domain: '',
  enabled: false,
  loading: false,
  service: '',
  error: '',
})

const domainServices = getDomainServices()
const availableDomainServices = computed(() => domainServices.filter((s) => s.available))
const unavailableDomainServices = computed(() => domainServices.filter((s) => !s.available))

const isEthereumNameService = computed(() => selectedNetwork.value === 'Ethereum Name Service')

const effectiveCoinTicker = computed(() =>
  isEthereumNameService.value ? 'ETH' : coinTicker.value
)

const isFormValid = computed(() => {
  const hasValidDomain = domainAddress.domain.trim() !== ''
  const hasValidCurrency = isEthereumNameService.value || coinTicker.value !== ''
  return hasValidDomain && hasValidCurrency
})

function selectNetwork(network: string) {
  const service = domainServices.find((s) => s.displayName === network)
  if (!service || !service.available) return

  selectedNetwork.value = network
  dropdownOpen.value = false
  coinTicker.value = network === 'Ethereum Name Service' ? 'ETH' : ''
}

function getServiceIcon(serviceName: string): string | null {
  const iconMap: Record<string, string> = {
    ens: '/assets/icons/domains/ethereumNameService.svg',
    uns: '/assets/icons/domains/unstoppableDomains.svg',
    tezos: '/assets/icons/domains/tezosDomains.svg',
    sol: '/assets/icons/domains/solanaNameService.svg',
    sns: '/assets/icons/domains/solanaNameService.svg',
    algo: '/assets/icons/domains/nfDomains.svg',
    stx: '/assets/icons/domains/bitcoinNameService.svg',
    stacks: '/assets/icons/domains/bitcoinNameService.svg',
    icns: '/assets/icons/domains/icns.svg',
    tns: '/assets/icons/domains/tezosDomains.svg',
  }
  return iconMap[serviceName.toLowerCase()] ?? null
}

function isEthDomain(domain: string): boolean {
  return domain.toLowerCase().endsWith('.eth')
}

async function resolveAddress() {
  const domain = domainAddress.domain
  const ticker = effectiveCoinTicker.value

  if (!domainMixins.isDomain(domain)) {
    domainAddress.error = 'Not a valid domain address.'
    domainAddress.enabled = true
    return
  }

  domainAddress.address = ''
  domainAddress.service = ''
  domainAddress.error = ''

  try {
    domainAddress.loading = true
    domainAddress.enabled = true

    if (isEthDomain(domain) || isEthereumNameService.value) {
      const address = await ens.getAddress({ domain, coinTicker: 'ETH' })
      domainAddress.address = address
      domainAddress.service = 'ens'
    } else if (domain.endsWith('.tez')) {
      throw new Error('Tezos Domains resolution temporarily unavailable')
    } else if (domain.endsWith('.crypto') || domain.endsWith('.wallet') || domain.endsWith('.nft')) {
      throw new Error('Unstoppable Domains resolution temporarily unavailable')
    } else {
      const { address, service } = await domainMixins.resolveAddressFromDomain({
        domain,
        coinTicker: ticker,
      })
      domainAddress.address = address
      domainAddress.service = service
    }
  } catch (err: unknown) {
    domainAddress.error = err instanceof Error ? err.message : String(err)
  } finally {
    domainAddress.loading = false
  }
}
</script>

<style lang="scss" scoped>
.dr-view {
  max-width: 42rem;
}

.dr-desc {
  margin: 0 0 1.5rem;
  font-size: 1rem;
  color: #6b7280;
}

.dr-section {
  margin: 0;
}

.dr-form {
  margin-bottom: 1.5rem;
}

.dr-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dr-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dr-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.dr-input-row {
  display: flex;
  max-width: 42rem;
  gap: 0.375rem;
}

.dr-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s;
}

.dr-trigger:hover {
  background: #1d4ed8;
}

.dr-trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.4);
}

.dr-trigger-chevron {
  flex-shrink: 0;
  opacity: 0.9;
}

.dr-input {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    background: #fff;
    border-color: #2563eb;
  }
}

.dr-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #93c5fd;
  }

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.4);
  }
}

.dr-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: dr-spin 0.6s linear infinite;
}

@keyframes dr-spin {
  to { transform: rotate(360deg); }
}

.dr-hint {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.4;
}

.dr-info {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.375rem;
}

.dr-info-icon {
  flex-shrink: 0;
  color: #2563eb;
  margin-top: 0.125rem;
}

.dr-info-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e40af;
}

.dr-about {
  margin-top: 2rem;
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.dr-about-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem;
}

.dr-about-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.75rem;
}

.dr-about-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.dr-about-item {
  margin-bottom: 0.25rem;

  &:last-child {
    margin-bottom: 0;
  }

  &--unavail {
    color: #9ca3af;
  }
}

.dr-about-label {
  font-weight: 500;
  color: #374151;
}

.dr-about-strike {
  text-decoration: line-through;
}
</style>

<!-- Unscoped: DropdownMenu portals to body -->
<style>
.dr-menu {
  min-width: 16rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -3px rgba(0, 0, 0, 0.08);
  padding: 0.25rem;
  z-index: 10000;
  animation: dr-menu-in 0.12s ease;
}

@keyframes dr-menu-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.dr-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: none;
  background: transparent;
  color: #374151;
  text-align: left;
  transition: background 0.1s;
  outline: none;
}

.dr-menu-item:hover:not([data-disabled]),
.dr-menu-item[data-highlighted] {
  background: #f3f4f6;
  color: #111827;
}

.dr-menu-item[data-disabled],
.dr-menu-item--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  color: #9ca3af;
}

.dr-menu-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.dr-menu-icon--muted {
  opacity: 0.6;
}

.dr-menu-sep {
  height: 1px;
  background: #e5e7eb;
  margin: 0.25rem 0;
}
</style>
