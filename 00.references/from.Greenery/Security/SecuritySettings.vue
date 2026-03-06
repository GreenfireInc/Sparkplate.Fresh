<!--
Contributors: Aciel Ochoa

Description: This component is imported into the settings view to handle
  rendering the Securtiy tab.
-->

<template>
  <div class="d-flex justify-content-between">
    <two-factor-auth />
    <two-factor-auth-controls-toggle />
    <misc-security />
  </div>
</template>

<script>
import TwoFactorAuth from './TwoFactorAuth.vue'
import MiscSecurity from './MiscSecurity.vue'
import TwoFactorAuthControlsToggle from './TwoFactorAuthControlsToggle.vue'

export default {
  components: {
    TwoFactorAuth,
    MiscSecurity,
    TwoFactorAuthControlsToggle
  },
  name: 'SecuritySettings'
}
</script>
