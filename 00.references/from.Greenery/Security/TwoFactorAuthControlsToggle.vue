<!--
Contributors: Aciel Ochoa

Description: Center column for toggle of two factor authentication
  controls in the Security settings tab.
-->
<template>
  <div class="w-100 px-2">
    <p class="text-xl mb-3">2FA Controls Toggle</p>
    <div class="d-flex flex-column">
      <div class="w-100 d-flex justify-content-between align-items-center">
        <label for="mfaRequireOnLogin" class="text-xl">Login</label>
        <toggle-button
          :value="userSettings.mfaRequireOnLogin"
          :sync="true"
          id="mfaRequireOnLogin"
          tag="mfaRequireOnLogin"
          @change="toggle"
          :disabled="mfaDisabled"
        />
      </div>
      <div class="w-100 d-flex justify-content-between align-items-center">
        <label for="mfaRequireOnInvoice" class="text-xl"
          >Signing Invoices</label
        >
        <toggle-button
          :value="userSettings.mfaRequireOnSignInvoice"
          :sync="true"
          id="mfaRequireOnSignInvoice"
          tag="mfaRequireOnSignInvoice"
          @change="toggle"
          :disabled="mfaDisabled"
        />
      </div>
      <!-- TEMP REMOVAL -->
      <!-- <div class="w-100 d-flex justify-content-between align-items-center">
        <label for="mfaRequireOnCheque" class="text-xl">Signing Cheques</label>
        <toggle-button
          :value="userSettings.mfaRequireOnSignCheque"
          :sync="true"
          id="mfaRequireOnSignCheque"
          tag="mfaRequireOnSignCheque"
          @change="toggle"
          :disabled="mfaDisabled"
        />
      </div> -->
      <div class="w-100 d-flex justify-content-between align-items-center">
        <label for="mfaRequireOnEmailInvoice" class="text-xl"
          >Email Invoices</label
        >
        <toggle-button
          :value="userSettings.mfaRequireOnEmailInvoice"
          :sync="true"
          id="mfaRequireOnEmailInvoice"
          tag="mfaRequireOnEmailInvoice"
          @change="toggle"
          :disabled="mfaDisabled"
        />
      </div>
      <!-- TEMP REMOVAL -->
      <!-- <div class="w-100 d-flex justify-content-between align-items-center">
        <label for="mfaRequireOnEmailCheque" class="text-xl">Email Cheques</label>
        <toggle-button
          :value="userSettings.mfaRequireOnEmailCheque"
          :sync="true"
          id="mfaRequireOnEmailCheque"
          tag="mfaRequireOnEmailCheque"
          @change="toggle"
          :disabled="mfaDisabled"
        />
      </div> -->
      <div class="w-100 d-flex justify-content-between align-items-center">
        <label for="mfaRequireOnCreatePaperWallet" class="text-xl"
          >Creating Paperwallet Iterations</label
        >
        <toggle-button
          :value="userSettings.mfaRequireOnCreatePaperWallet"
          :sync="true"
          id="mfaRequireOnCreatePaperWallet"
          tag="mfaRequireOnCreatePaperWallet"
          @change="toggle"
          :disabled="mfaDisabled"
        />
      </div>
      <div class="w-100 d-flex justify-content-between align-items-center">
        <label for="mfaRequireOnDashboardSend" class="text-xl"
          >Dashboard Sending</label
        >
        <toggle-button
          :value="userSettings.mfaRequireOnDashboardSend"
          :sync="true"
          id="mfaRequireOnDashboardSend"
          tag="mfaRequireOnDashboardSend"
          @change="toggle"
          :disabled="mfaDisabled"
        />
      </div>
      <div class="w-100 d-flex justify-content-between align-items-center">
        <label for="mfaRequireOnQuickExchange" class="text-xl"
          >Quick Exchange</label
        >
        <toggle-button
          :value="userSettings.mfaRequireOnQuickExchange"
          :sync="true"
          id="mfaRequireOnQuickExchange"
          tag="mfaRequireOnQuickExchange"
          @change="toggle"
          :disabled="mfaDisabled"
        />
      </div>
      <div class="w-100 d-flex justify-content-between align-items-center">
        <label for="mfaRequireOnQuickExchange" class="text-xl"
          >Web3 Requests</label
        >
        <toggle-button
          :value="userSettings.mfaRequireOnWeb3Requests"
          :sync="true"
          id="mfaRequireOnWeb3Requests"
          tag="mfaRequireOnWeb3Requests"
          @change="toggle"
          :disabled="mfaDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import accountMixins from '@/utils/mixins/accountMixins'

export default {
  name: 'TwoFactorAuthControlsToggle',
  mixins: [accountMixins],
  computed: {
    ...mapState(['userSettings']),
    mfaDisabled() {
      return !this.userSettings.mfaEnabled
    }
  },
  methods: {
    async toggle(e) {
      const setting = e.tag

      // If attempting to disable 2fa setting, ask for verification code first
      const isEnabled = this.userSettings[setting]
      if (isEnabled) {
        const verified = await this.initVerification()
        if (!verified) return
      }

      this.$store.dispatch('userSettings/toggleSetting', setting)
    }
  }
}
</script>
