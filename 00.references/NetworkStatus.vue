<!--
Contributors: Aciel Ochoa

Description: This component will render the network status on the settings
  view. This will include the user's internet connection status, ip address,
  and location
-->
<template>
  <div :class="vertical ? 'd-flex flex-col-reverse' : 'd-flex'">
    <span class="mr-3" v-if="!hideStatus">{{
      isOnline ? 'Online' : 'Offline'
    }}</span>
    <div v-if="country">
      <country-flag :country="country.sortname.toLowerCase()" size="small" />
      <span class="mr-3 ml-1">{{ country.name }}</span>
    </div>
    <span v-if="ip"><b>IP: </b>{{ ip }}</span>
  </div>
</template>

<script>
// Components
import CountryFlag from 'vue-country-flag'

// Utilities
import csc from 'country-state-city'
import isOnline from 'is-online'

const initData = () => ({
  ip: '',
  isOnline: false,
  country: null
})

export default {
  name: 'NetworkStatus',
  data: initData,
  props: ['vertical', 'hideStatus'],
  components: { CountryFlag },
  computed: {
    user() {
      return this.loggedUserData
    }
  },
  methods: {},
  async mounted() {
    this.isOnline = await isOnline()
    if (this.isOnline) {
      this.ip = await this.$store.dispatch('accounts/fetchIP')
      const geo = await window.geoip.lookup(this.ip)
      this.country = csc.getCountryByCode(geo.country)
    }
  }
}
</script>
