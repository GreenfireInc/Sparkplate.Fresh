<!--
Contributors: Aciel Ochoa

Description: This component conisits of the misc settings column
  under the Securtiy tab of the Settings panel.
-->
<template>
  <div class="w-100 px-2">
    <p class="text-xl mb-3">Misc Security</p>
    <div class="d-flex flex-column">
      <div class="w-100 d-flex justify-content-between align-items-center mb-1">
        <span class="text-xl">Opt into Analytics</span>
        <toggle-button
          :value="userSettings.analyticsOptIn"
          tag="analyticsOptIn"
          @change="toggleAnalytics"
        />
      </div>
      <div class="w-100 d-flex justify-content-between align-items-center mb-1">
        <span class="text-xl">Set Idle Timeout (Seconds)</span>
        <select
          id="toggleTimeoutValue"
          @change="setTimeoutSetting($event)"
          v-model="userSettings.toggleTimeoutValue"
        >
          <option value="" selected>Choose</option>
          <option value="10">10</option>
          <option value="60">60</option>
          <option value="180">180</option>
          <option value="360">360</option>
        </select>
      </div>
      <div class="w-100 d-flex justify-content-between align-items-center mb-1">
        <span class="text-xl">Reveal HD Wallet</span>
        <button
          class="btn bg-green-700 text-white px-2 py-1 m-0"
          @click="initRevealHDWallet"
        >
          Reveal
        </button>
      </div>
      <div class="w-100 flex justify-content-between align-items-center mb-1">
        <span class="text-xl">Reveal Password</span>
        <button
          class="btn bg-green-700 text-white px-2 py-1 m-0"
          @click="initRevealPassword"
        >
          Reveal
        </button>
      </div>
      <div class="w-100 d-flex justify-content-between align-items-center mb-1">
        <span class="text-xl">Reset Password</span>
        <button
          class="btn bg-green-700 text-white px-2 py-1 m-0"
          @click="initResetPassword"
        >
          Reset
        </button>
      </div>
      <div class="w-100 d-flex justify-content-between align-items-center mb-1">
        <span class="text-xl">Backup Private Keys</span>
        <button
          class="btn bg-green-700 text-white px-2 py-1 m-0"
          @click="initBackupPrivateKeys"
        >
          Backup
        </button>
      </div>
    </div>

    <!-- Reveal HD Wallet Modal -->
    <modal name="mnemonicModal" :width="960">
      <mnemonic-modal />
    </modal>

    <!-- Reveal Password Modal -->
    <modal height="auto" name="passwordModal" @closed="clearRevealedPassword">
      <div class="py-5 items-center text-center">
        Account Password:
        <span class="text-lg font-semibold">
          {{ revealedPassword }}
        </span>
        <p class="mt-3 text-red-500 font-semibold">
          Remember to keep your password safe and secure!
        </p>
      </div>
    </modal>
  </div>
</template>

<script>
import MnemonicModal from '@/components/settings/MnemonicModal.vue'
import { UserService } from '@/service/UserService'
import accountMixins from '@/utils/mixins/accountMixins'
import { mapActions } from 'vuex'
import moment from 'moment'
import bcrypt from 'bcryptjs'
import ResetPassword from '../widgets/ResetPassword.vue'

export default {
  name: 'MiscSecurity',
  components: { MnemonicModal },
  mixins: [accountMixins],
  data: () => ({
    revealedHDWallet: ''
  }),
  computed: {
    user() {
      return this.$store.state.accounts.active
    }
  },
  methods: {
    ...mapActions({
      resetPassword: 'accounts/resetPassword',
      toggleSetting: 'userSettings/toggleSetting',
      updateSetting: 'userSettings/updateSetting'
    }),
    initRevealHDWallet() {
      // Prompt user to confirm their password then this.showHDWallet on success
      this.confirmPassword(this.showHDWallet)
    },
    showHDWallet() {
      this.$modal.show('mnemonicModal')
    },
    clearRevealedPassword() {
      this.revealedPassword = ''
    },
    initResetPassword() {
      // Open Reset Password Modal
      this.$modal.show(
        ResetPassword,
        {},
        {
          name: 'ResetPasswordModal',
          classes: ['bg-white', 'rounded-lg', 'px-6', 'py-4', 'shadow'],
          height: 'auto'
        }
      )
    },
    initBackupPrivateKeys() {
      // Prompt user to create a password for encrypting privateKeys
      this.createPasswordToast(
        'Backup Private Keys',
        'Create password for backup encryption',
        this.exportPrivateKeys
      )
    },
    async exportPrivateKeys(password) {
      const date = moment().format('YYYYMMDD')
      // generate csv data
      const csvData = this.privateKeyCSV()
      // Prompt user to select a save location
      try {
        const newZipPath = await this.getSavePath(
          `${date}.PrivateKeysBackup.zip`,
          'zip'
        )
        if (newZipPath) {
          const saved = await window.fs.createZip(newZipPath, csvData, {
            format: 'zip-encryptable',
            options: {
              zlib: { level: 9 },
              forceLocalTime: true,
              password
            }
          })
          if (saved)
            this.$toast.info(`Saved at: ${saved}`, 'Success!', {
              position: 'center',
              timeout: 3000
            })
        }
      } catch (err) {
        this.$toast.error(err.message, 'Error')
        console.error(err)
      }
    },
    privateKeyCSV() {
      const wallets = this.$store.getters.allWallets
      if (!wallets.length) {
        this.$toast.error(
          'You currently have no wallets to export.',
          'Export Failed'
        )
        throw new Error('Export failed: No exisiting wallets found.')
      }
      const csvData = wallets.map((w, i) => ({
        '#': i + 1,
        coinTicker: w.coinTicker,
        publicAddress: w.address,
        type: w.isHDWallet ? 'trunk' : 'foreign',
        privateKey: w.privateKey,
        wif: w.wif
      }))
      return csvData
    },
    async getSavePath(defaultName, type) {
      // use electron dialog to prompt user to select a save location
      const { filePath, canceled } = await this.$dialog.showSaveDialog({
        defaultPath: `*/${defaultName}`,
        filters: [
          { name: type.toUpperCase(), extensions: [type.toLowerCase()] }
        ],
        showsTagField: false
      })
      if (canceled || filePath === undefined) {
        return null
      } else {
        return filePath
      }
    },
    confirmPassword(callback) {
      /*
        Prompts user to enter their current password
        If password is correct, the passed in callback
        function will be invoked
      */

      this.$toast.info('Please enter your password', '', {
        timeout: 20000,
        displayMode: 'once',
        id: 'confirmPasswordInputs',
        zindex: 999,
        position: 'center',
        drag: false,
        inputs: [['<input type="password" />']],
        buttons: [
          [
            '<button>Submit</button>',
            (instance, toast, button, e, inputs) => {
              const password = inputs[0].value
              this.userService
                .getUserBy({ email: this.user.email })
                .then((user) => {
                  const success = bcrypt.compareSync(password, user[0].password)
                  if (success) {
                    callback()
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                  } else throw new Error('Invaild Password!')
                })
                .catch((err) => {
                  this.$toast.error('Invalid Password!', 'Error')
                  console.error(err)
                })
            }
          ]
        ]
      })
    },
    createPasswordToast(title, message, callback) {
      this.$toast.info(message, title, {
        timeout: 20000,
        displayMode: 'once',
        id: 'createNewPasswordInputs',
        zindex: 999,
        position: 'center',
        drag: false,
        inputs: [
          ['<input type="password" placeholder="Password">'],
          ['<input type="password" placeholder="Confirm Password">']
        ],
        buttons: [
          [
            '<button>Submit</button>',
            (instance, toast, button, e, inputs) => {
              if (inputs[0].value !== inputs[1].value) {
                this.$toast.error('Passwords do not match', 'Error')
              } else {
                callback(inputs[0].value)
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
              }
            }
          ]
        ]
      })
    },
    setTimeoutSetting(event) {
      // console.log('** setTimeoutSetting hit >> event id >> **', event.target.id)
      // console.log('** setTimeoutSetting hit >> event >> **', event.target.value)
      // console.log('** setTimeoutSetting hit >> event >> **', event)
      var timeoutValueObj = {
        setting: event.target.id,
        value: parseInt(event.target.value)
      }
      this.updateSetting(timeoutValueObj)
    },
    toggle(e) {
      // toggle user settings
      const setting = e.tag
      // console.log('*** toggle boolean setting >>>', setting)
      this.toggleSetting(setting)
    },
    toggleAnalytics(e) {
      const optIn = !this.userSettings.analyticsOptIn
      if (optIn) {
        this.$gtag.optIn()
      } else {
        this.$gtag.optOut()
      }

      this.toggle(e)
    }
  },
  mounted() {
    this.userService = new UserService()
  },
  watch: {
    revealedPassword(revealed) {
      if (revealed) this.$modal.show('passwordModal')
    }
  }
}
</script>
