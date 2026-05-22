<!--
  Dashboard — Currency-centric workspace.
  Reference: 00.references/from.Greenery/Dashboard.vue (V1)

  The visible currency tabs are populated from the shared visibility state
  owned by `useDashboardCurrencies`, which is also written to by the
  toggles in `components/pageTabs/settings/tab.Settings.Dashboard.vue`.
-->

<template>
  <div class="view dashboard-view">
    <!-- Currency tab strip + actions ------------------------------------ -->
    <header class="dashboard-navigator">
      <!-- Strip: scrollable tabs + fixed-right Add More (outside flex scroll row) -->
      <div class="dashboard-currency-strip">
        <TabsWrapper class="dashboard-currency-tabs tabs-container">
          <TabComponent
            v-for="currency in visibleCurrencies"
            :key="`crypto-cur-${currency.basicInfo.symbolTicker}`"
            :active="currency.basicInfo.symbolTicker === activeTicker"
            :on-click="() => selectCurrency(currency.basicInfo.symbolTicker)"
            class="dashboard-currency-tab"
          >
            <img
              v-if="getIcon(currency.basicInfo.symbolTicker)"
              class="dashboard-currency-tab__icon"
              :src="getIcon(currency.basicInfo.symbolTicker) ?? ''"
              :alt="currency.basicInfo.symbolTicker"
            />
            <span
              v-else
              class="dashboard-currency-tab__fallback"
              v-text="currency.basicInfo.symbolTicker.slice(0, 2)"
            />
            <span
              class="dashboard-currency-tab__ticker"
              v-text="currency.basicInfo.symbolTicker.toUpperCase()"
            />
          </TabComponent>
        </TabsWrapper>

        <div class="dashboard-add-more__wrap">
          <RouterLink
            to="/settings/dashboard"
            class="dashboard-add-more"
            title="Manage which currencies appear here"
          >
            <span class="dashboard-add-more__plus">+</span>
            <span class="dashboard-add-more__label">Add More</span>
          </RouterLink>
        </div>
      </div>

      <!-- Content tab + general actions -->
      <div class="dashboard-actionbar">
        <div class="dashboard-content-tabs">
          <span
            v-for="tab in contentTabs"
            :key="`content-tab-${tab}`"
            class="dashboard-content-tab"
            :class="{ active: tab === activeContentTab }"
            @click="activeContentTab = tab"
            v-text="tab"
          />
        </div>

        <div class="dashboard-action-group">
          <button
            class="btn btn--ghost"
            type="button"
            :disabled="!activeCurrency"
            @click="showImportModal = true"
          >
            Import Wallet
            <DownloadIcon :size="16" />
          </button>

          <ButtonDashboardNewWallet
            :disabled="!activeCurrency"
            @from-mnemonic="onNewWalletFromMnemonic"
            @throwaway-wallet="onNewWalletThrowaway"
          />
        </div>
      </div>
    </header>

    <!-- Active panel ------------------------------------------------------ -->
    <section class="dashboard-panel">
      <!-- No active currency: prompt user to enable one ------------------- -->
      <div v-if="!activeCurrency" class="dashboard-empty">
        <h2 class="dashboard-empty__title">No currencies enabled</h2>
        <p class="dashboard-empty__desc">
          Enable at least one currency in
          <RouterLink to="/settings/dashboard" class="dashboard-empty__link">
            Dashboard Settings
          </RouterLink>
          to begin.
        </p>
      </div>

      <!-- Wallets tab ----------------------------------------------------- -->
      <div
        v-else-if="activeContentTab === 'wallets'"
        class="dashboard-wallets"
        role="tabpanel"
      >
        <div class="dashboard-wallets__empty">
          <h3 class="dashboard-wallets__empty-title">
            No {{ activeCurrency.basicInfo.name }} wallets yet
          </h3>
          <p class="dashboard-wallets__empty-desc">
            Wallet management for
            <strong>{{ activeCurrency.basicInfo.symbolTicker.toUpperCase() }}</strong>
            will appear here. Generate a new wallet or import an existing one
            using the buttons above.
          </p>
          <ButtonDashboardNewWallet
            class="dashboard-wallets__cta"
            :label="`Generate ${activeCurrency.basicInfo.name} Wallet`"
            @from-mnemonic="onNewWalletFromMnemonic"
            @throwaway-wallet="onNewWalletThrowaway"
          />
        </div>
      </div>

      <!-- History tab ----------------------------------------------------- -->
      <div
        v-else-if="activeContentTab === 'history'"
        class="dashboard-history"
        role="tabpanel"
      >
        <div class="dashboard-empty">
          <h3 class="dashboard-empty__title">Transaction history</h3>
          <p class="dashboard-empty__desc">
            On-chain history for {{ activeCurrency.basicInfo.name }} will appear
            here once a wallet is connected.
          </p>
        </div>
      </div>

      <!-- Information tab ------------------------------------------------- -->
      <div
        v-else-if="activeContentTab === 'information'"
        class="dashboard-information"
        role="tabpanel"
      >
        <article class="dashboard-info-card">
          <header class="dashboard-info-card__head">
            <img
              v-if="getIcon(activeCurrency.basicInfo.symbolTicker)"
              class="dashboard-info-card__icon"
              :src="getIcon(activeCurrency.basicInfo.symbolTicker) ?? ''"
              :alt="activeCurrency.basicInfo.symbolTicker"
            />
            <div>
              <h2 class="dashboard-info-card__title">
                {{ activeCurrency.basicInfo.name }}
                <span class="dashboard-info-card__ticker">
                  ({{ activeCurrency.basicInfo.symbolTicker.toUpperCase() }})
                </span>
              </h2>
              <p
                v-if="activeCurrency.basicInfo.creator"
                class="dashboard-info-card__sub"
              >
                Created by {{ activeCurrency.basicInfo.creator }}
                <span v-if="activeCurrency.basicInfo.debutYear">
                  · {{ activeCurrency.basicInfo.debutYear }}
                </span>
              </p>
            </div>
          </header>

          <p
            v-if="activeCurrency.basicInfo.description"
            class="dashboard-info-card__description"
          >
            {{ activeCurrency.basicInfo.description }}
          </p>

          <dl class="dashboard-info-card__meta">
            <div
              v-if="activeCurrency.technicalInfo?.proofingType"
              class="dashboard-info-card__meta-row"
            >
              <dt>Consensus</dt>
              <dd>{{ activeCurrency.technicalInfo.proofingType }}</dd>
            </div>
            <div
              v-if="activeCurrency.technicalInfo?.class"
              class="dashboard-info-card__meta-row"
            >
              <dt>Class</dt>
              <dd>{{ activeCurrency.technicalInfo.class }}</dd>
            </div>
            <div
              v-if="activeCurrency.technicalInfo?.totalSupply"
              class="dashboard-info-card__meta-row"
            >
              <dt>Total Supply</dt>
              <dd>{{ activeCurrency.technicalInfo.totalSupply }}</dd>
            </div>
            <div
              v-if="activeCurrency.basicInfo.website"
              class="dashboard-info-card__meta-row"
            >
              <dt>Website</dt>
              <dd>
                <a
                  :href="activeCurrency.basicInfo.website"
                  target="_blank"
                  rel="noreferrer"
                >{{ activeCurrency.basicInfo.website }}</a>
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>

    <!-- Footer summary --------------------------------------------------- -->
    <footer v-if="activeCurrency" class="dashboard-summary">
      <div class="dashboard-summary__left">
        <span class="dashboard-summary__label">Active</span>
        <span class="dashboard-summary__value">
          {{ activeCurrency.basicInfo.symbolTicker.toUpperCase() }}
        </span>
      </div>

      <div class="dashboard-summary__center">
        <span class="dashboard-summary__label">Visible Currencies</span>
        <span class="dashboard-summary__value">
          {{ visibleCurrencies.length }} / {{ currenciesOrdered.length }}
        </span>
      </div>

      <div class="dashboard-summary__right">
        <span class="dashboard-summary__label">Total Balance</span>
        <span class="dashboard-summary__value">—</span>
      </div>
    </footer>

    <ModalDashboardImport
      :show="showImportModal"
      :default-ticker="activeTicker"
      @close="showImportModal = false"
      @imported="onWalletImported"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { Download as DownloadIcon } from 'lucide-vue-next'
import { NETWORKS, type CurrencyData } from '@/lib/cores/currencyCore/currencies'
import { useDashboardCurrencies } from '@/composables/useDashboardCurrencies'
import TabComponent from '@/components/global/TabComponent.vue'
import TabsWrapper from '@/components/global/TabsWrapper.vue'
import ButtonDashboardNewWallet from '@/components/buttons/dashboard/button.dashboard.newWallet.vue'
import ModalDashboardImport, {
  type DashboardImportedWallet,
} from '@/components/modals/dashboard/modal.dashboard.import.vue'

defineOptions({ name: 'DashboardView' })

const STORAGE_KEY_DEFAULT_TICKER = 'sparkplate_dashboard_default_ticker'

// Pull visibility state straight from the shared composable — the same
// state tab.Settings.Dashboard.vue mutates via its toggle controls.
const { visibleCurrencies, currenciesOrdered } = useDashboardCurrencies()

type ContentTab = 'wallets' | 'history' | 'information'
const contentTabs: ContentTab[] = ['wallets', 'history', 'information']
const activeContentTab = ref<ContentTab>('wallets')

const activeTicker = ref<string>('')
const showImportModal = ref(false)

const activeCurrency = computed<CurrencyData | undefined>(() =>
  visibleCurrencies.value.find(
    (c) => c.basicInfo.symbolTicker === activeTicker.value,
  ),
)

function getIcon(ticker: string): string | null {
  const n = NETWORKS.find((x) => x.ticker === ticker.toUpperCase())
  return n?.icon ?? null
}

function selectCurrency(ticker: string): void {
  activeTicker.value = ticker
  try {
    localStorage.setItem(STORAGE_KEY_DEFAULT_TICKER, ticker)
  } catch {
    /* localStorage unavailable */
  }
}

function readDefaultTicker(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_DEFAULT_TICKER)
  } catch {
    return null
  }
}

/**
 * Pick the best ticker to focus on:
 *   1) The user's last selection, if still visible.
 *   2) BTC, if visible.
 *   3) The first visible currency.
 */
function resolveInitialTicker(): string {
  const visible = visibleCurrencies.value
  if (visible.length === 0) return ''

  const stored = readDefaultTicker()
  if (stored && visible.some((c) => c.basicInfo.symbolTicker === stored)) {
    return stored
  }
  if (visible.some((c) => c.basicInfo.symbolTicker === 'BTC')) return 'BTC'
  return visible[0].basicInfo.symbolTicker
}

activeTicker.value = resolveInitialTicker()

/**
 * Re-resolve the active ticker whenever the visible set changes. Without this,
 * disabling the currently-active currency in tab.Settings.Dashboard would leave the
 * Dashboard pointed at a now-hidden ticker.
 */
watch(
  visibleCurrencies,
  (next) => {
    if (next.length === 0) {
      activeTicker.value = ''
      return
    }
    const stillVisible = next.some(
      (c) => c.basicInfo.symbolTicker === activeTicker.value,
    )
    if (!stillVisible) {
      activeTicker.value = resolveInitialTicker()
    }
  },
  { deep: false },
)

function onWalletImported(payload: DashboardImportedWallet): void {
  /* TODO: persist imported wallet once the V2 wallet store lands. */
  console.info('[Dashboard] wallet imported:', {
    dashboardTicker: activeTicker.value,
    ...payload,
  })
}

function onNewWalletFromMnemonic(): void {
  /* TODO: wire up mnemonic → wallet flow once the V2 wallet store lands. */
  console.info('[Dashboard] new wallet from mnemonic:', activeTicker.value)
}

function onNewWalletThrowaway(): void {
  /* TODO: wire up throwaway wallet flow once the V2 wallet store lands. */
  console.info('[Dashboard] new throwaway wallet:', activeTicker.value)
}
</script>

<style lang="scss" scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  padding: 1rem 1.25rem 1.25rem;
  box-sizing: border-box;
  overflow: hidden;
}

// ── Currency tab strip ────────────────────────────────────────────────────────

.dashboard-navigator {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

// Outer row: tabs scroll; Add More stays pinned on the right of the viewport.
.dashboard-currency-strip {
  display: flex;
  align-items: stretch;
  width: 100%;
  min-width: 0;
  border-bottom: 1px solid #e5e7eb;
}

.dashboard-currency-tabs.tabs-container {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;

  :deep(.tabs-wrapper) {
    flex-wrap: nowrap;
    gap: 0.25rem;
    border-bottom: none;
    margin-bottom: 0;
  }
}

.dashboard-currency-tab {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  min-width: 5rem;
  padding: 0.5rem 0.75rem !important;

  &__icon {
    width: 2rem;
    height: 2rem;
    object-fit: contain;
  }

  &__fallback {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: #e5e7eb;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
  }

  &__ticker {
    font-size: 0.75rem;
    font-weight: 600;
    color: inherit;
  }
}

// ── + Add More (fixed column on the right; does not scroll with currency tabs) ─

.dashboard-add-more__wrap {
  flex-shrink: 0;
  align-self: stretch;
  display: flex;
  align-items: stretch;
  padding-left: 0.5rem;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    #fff 28%,
    #fff 100%
  );
  z-index: 2;
}

.dashboard-add-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  gap: 0.125rem;
  width: 5rem;
  padding: 0 0.5rem;
  text-decoration: none !important;
  color: #fff;
  background: #16a34a;
  border: 1px solid #15803d;
  border-radius: 0.375rem;
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover {
    background: #15803d;
    text-decoration: none !important;
  }

  &:active {
    transform: translateY(1px);
  }

  &__plus {
    font-size: 1.25rem;
    line-height: 1;
    font-weight: 700;
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
  }
}

// ── Action bar (content tabs + buttons) ───────────────────────────────────────

.dashboard-actionbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.25rem 0.25rem 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.dashboard-content-tabs {
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
}

.dashboard-content-tab {
  position: relative;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
  color: #6b7280;
  cursor: pointer;
  user-select: none;
  border-radius: 0.25rem 0.25rem 0 0;
  transition: color 0.15s ease, background 0.15s ease;

  &:hover {
    color: #374151;
    background: #f3f4f6;
  }

  &.active {
    color: #111827;

    &::after {
      content: '';
      position: absolute;
      left: 0.25rem;
      right: 0.25rem;
      bottom: -1px;
      height: 2px;
      background: #111827;
      border-radius: 1px;
    }
  }
}

.dashboard-action-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn--ghost {
  color: #374151;
  background: #fff;
  border-color: #d1d5db;

  &:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #9ca3af;
  }
}

.btn--primary {
  color: #fff;
  background: #16a34a;
  border-color: #15803d;

  &:hover:not(:disabled) {
    background: #15803d;
  }
}

// ── Active panel ──────────────────────────────────────────────────────────────

.dashboard-panel {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1rem 0;
}

.dashboard-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  color: #4b5563;

  &__title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.5rem 0;
  }

  &__desc {
    font-size: 0.875rem;
    margin: 0;
    line-height: 1.5;
  }

  &__link {
    color: #2563eb;
    text-decoration: underline;

    &:hover {
      color: #1d4ed8;
    }
  }
}

// ── Wallets panel ─────────────────────────────────────────────────────────────

.dashboard-wallets__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2.5rem 1rem;
  background: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 0.5rem;
}

.dashboard-wallets__empty-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.dashboard-wallets__empty-desc {
  max-width: 32rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #4b5563;
  margin: 0 0 1rem 0;
}

.dashboard-wallets__cta {
  align-self: center;
}

// ── Information card ──────────────────────────────────────────────────────────

.dashboard-info-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.dashboard-info-card__head {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dashboard-info-card__icon {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}

.dashboard-info-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.dashboard-info-card__ticker {
  font-weight: 600;
  color: #6b7280;
  font-size: 0.875rem;
}

.dashboard-info-card__sub {
  margin: 0.125rem 0 0 0;
  font-size: 0.8125rem;
  color: #6b7280;
}

.dashboard-info-card__description {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: #374151;
  margin: 0 0 1rem 0;
}

.dashboard-info-card__meta {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.5rem 1.25rem;
}

.dashboard-info-card__meta-row {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.5rem 0.75rem;
  background: #f9fafb;
  border-radius: 0.375rem;

  dt {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  dd {
    margin: 0;
    font-size: 0.875rem;
    color: #111827;
    word-break: break-word;
  }

  a {
    color: #2563eb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// ── Footer summary ────────────────────────────────────────────────────────────

.dashboard-summary {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  margin-top: 0.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &__left,
  &__center,
  &__right {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  &__center {
    text-align: center;
  }

  &__right {
    text-align: right;
  }

  &__label {
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: 600;
    color: #6b7280;
  }

  &__value {
    font-size: 0.9375rem;
    font-weight: 700;
    color: #111827;
  }
}
</style>
