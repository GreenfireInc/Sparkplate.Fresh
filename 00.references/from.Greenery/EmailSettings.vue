<template>
  <div>
    <div class="row">
      <div class="col-md-9 mb-3">
        <p class="text-xl">Email Configuration</p>
        <small class="text-muted">
          Fill-out This Form to Setup Your Email Configuration on Your Greenery
          Account.
        </small>
      </div>
    </div>

    <div class="mt-2 mb-2">
      <!-- Tabs Navigation -->
      <TabsComponent>
        <TabComponent
          v-ripple="'rgba(255, 255, 255, .2)'"
          :active="activeTab === 'oauth'"
          :onClick="() => (activeTab = 'oauth')"
        >
          OAuth
        </TabComponent>
        <TabComponent
          v-ripple="'rgba(255, 255, 255, .2)'"
          :active="activeTab === 'smtp'"
          :onClick="() => (activeTab = 'smtp')"
        >
          SMTP
        </TabComponent>
      </TabsComponent>

      <!-- SMTP Tab Content -->
      <div v-if="activeTab === 'smtp'" class="sm">
        <div v-if="isOauthEnabled" class="overlay-block">
          <div class="overlay-content">
            <strong
              >To configure SMTP, please disconnect your account from Google
              OAuth first.</strong
            >
            <br />
            <span
              >You are currently connected with OAuth. Disconnect to enable
              manual SMTP configuration.</span
            >
          </div>
        </div>

        <div v-else>
          <div class="input-group mt-3">
            <div class="input-field col-md-4 pl-0">
              <label>Email Address</label>
              <input type="text" v-model="username" />
            </div>

            <div class="input-field col-md-3 pl-0">
              <label>Password</label>
              <div class="toggle-password" @click="togglePassword">
                <img :src="togglePasswordIconUrl" />
              </div>
              <input :type="passwordInputType" v-model="password" />
            </div>
          </div>

          <div class="mt-1 mb-3">
            <button
              v-ripple="'rgba(255, 255, 255, .2)'"
              type="button"
              class="btn btn-sm bg-gray-200 text-dark"
              style="height: 30px; padding: 8px"
              @click="showMoreConfiguration = !showMoreConfiguration"
            >
              {{
                showMoreConfiguration ? 'Hide Settings' : 'Show More Settings'
              }}
            </button>
          </div>

          <div class="input-group">
            <div class="input-field col-md-3 pl-0" v-if="showMoreConfiguration">
              <label>Host SMTP</label>
              <input type="text" v-model="host" />
            </div>

            <div class="input-field col-md-2 pl-0" v-if="showMoreConfiguration">
              <label>Port</label>
              <input type="text" v-model="port" />
            </div>

            <div class="input-field col-md-2 pl-0" v-if="showMoreConfiguration">
              <label>USE TLS</label>
              <select v-model="tls">
                <option :value="constant.TRUE">Enable</option>
                <option :value="constant.FALSE">Disabled</option>
              </select>
            </div>
          </div>
          <div class="d-flex align-content-right mt-3">
            <button
              v-ripple="'rgba(255, 255, 255, .2)'"
              type="button"
              class="btn btn-sm bg-gray-700 text-white"
              style="height: 30px; padding: 8px"
              @click="testEmailConfig"
            >
              Test
            </button>

            <button
              v-ripple="'rgba(255, 255, 255, .2)'"
              type="button"
              class="btn btn-sm bg-green-700 text-white"
              style="height: 30px; margin-left: 10px; padding: 8px"
              @click="saveEmailConfig"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <!-- OAuth Tab Content -->
      <div v-if="activeTab === 'oauth'" class="mt-3">
        <div class="mb-3">
          <p class="text-muted">
            Connect to Google using OAuth 2.0 to securely send emails through
            Gmail.
          </p>
          <div class="d-flex align-content-right mt-3">
            <button
              v-if="!isOauthEnabled"
              v-ripple="'rgba(255, 255, 255, .2)'"
              type="button"
              class="btn btn-sm bg-blue-700 text-white"
              style="height: 30px; padding: 8px"
              @click="initGoauthConnect"
            >
              Connect to Google
            </button>
            <button
              v-if="isOauthEnabled"
              v-ripple="'rgba(255, 255, 255, .2)'"
              type="button"
              class="btn btn-sm bg-red-700 text-white"
              style="height: 30px; padding: 8px"
              @click="initGoauthDisconnect"
            >
              Disconnect from Google
            </button>
            <button
              v-if="isOauthEnabled"
              v-ripple="'rgba(255, 255, 255, .2)'"
              type="button"
              class="btn btn-sm bg-gray-700 text-white"
              style="height: 30px; padding: 8px"
              @click="testEmailConfig"
            >
              Test
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EmailClientService from '@/service/emailClientService'

export default {
  name: 'EmailSettings',
  data() {
    return {
      activeTab: 'oauth',
      service: '',
      username: '',
      password: '',
      host: '',
      port: 456,
      tls: false,
      showMoreConfiguration: false,
      showPassword: false,
      constant: {
        TRUE: true,
        FALSE: false
      }
    }
  },
  computed: {
    ...mapState({ userSettings: (state) => state.userSettings }),
    user() {
      const activeUser = this.$store.state.accounts.active
      return JSON.parse(JSON.stringify(activeUser))
    },
    togglePasswordIconUrl() {
      const base = './assets/vectors/'
      const svg = this.showPassword ? 'eye.svg' : 'eyeSlash.svg'
      return base + svg
    },
    passwordInputType() {
      return this.showPassword ? 'text' : 'password'
    },
    isOauthEnabled() {
      const oauthServices = ['gmail']
      const isEnabled = oauthServices.includes(this.service)

      console.log(
        'Service found: ',
        this.service,
        '\nisOauthEnabled: ',
        isEnabled
      )
      return isEnabled
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    async saveEmailConfig() {
      const payload = {
        emailConfigService: this.service
      }

      if (this.activeTab === 'smtp') {
        payload.emailConfigUsername = this.username
        payload.emailConfigPassword = this.password
        payload.emailConfigHost = this.host
        payload.emailConfigPort = parseInt(this.port)
        payload.emailConfigTls = this.tls
      }

      try {
        await this.$store.dispatch('userSettings/updateEmailConfig', payload)
        this.$toast.success('Email configuration saved.', 'Success')
      } catch (err) {
        this.$toast.error(err.message, 'Unable to Save')
      }
    },
    async initGoauthConnect() {
      try {
        const response = await window.emailService.initGmailOAuthConnect({
          user: this.user
        })
        if (response && response.success) {
          // Store the email configuration from OAuth response
          if (response.config) {
            const payload = {
              emailConfigService: 'gmail',
              emailConfigUsername: response.config.username
            }
            await this.$store.dispatch(
              'userSettings/updateEmailConfig',
              payload
            )
            this.service = 'gmail'
          }

          this.$toast.success(response.message, 'Success')
        } else {
          this.$toast.error(
            response?.message ||
              'Failed to initialize Google OAuth connection.',
            'Error'
          )
        }
      } catch (err) {
        console.error(err.message)
        this.$toast.error(err.message, 'Unable to Connect to Google')
      }
    },
    async initGoauthDisconnect() {
      try {
        // Create and connect emailClient instance
        const config = this.$store.state.userSettings.emailConfig
        const emailClient = new EmailClientService(config)
        await emailClient.connect()

        // Invoke emailClient.disconnect
        const success = await emailClient.disconnectOAuth()
        if (!success) {
          this.$toast.error('Failed to disconnect from Google.', 'Error')
          return
        }

        // After main process has handled disconnect request, update user settings
        this.$store.dispatch('userSettings/updateEmailConfig', {
          emailConfigService: null
        })

        // Update component state
        this.service = null
      } catch (err) {
        console.error(err.message)
        this.$toast.error(err.message, 'Unable to Disconnect from Google')
      }
    },
    async testEmailConfig() {
      try {
        const emailClient = new EmailClientService(
          this.$store.state.userSettings.emailConfig
        )
        await emailClient.runTest().connect({
          service: this.service,
          username: this.username,
          password: this.password,
          host: this.host,
          port: this.port,
          tls: this.tls
        })
        const result = await emailClient.sendMail({
          to: this.user.email,
          subject: 'Testing Greenery Email Delivery',
          text: 'Testing Greenery Email Delivery'
        })
        this.$toast.success(
          `A test email was successfully sent to ${result.accepted[0]}.`,
          'Email Configured Successfully'
        )
      } catch (err) {
        console.error(err.message)
        this.$toast.error(err.message, 'Unable to Send Email')
      }
    },
    generateConfig() {
      // smtp.mail.yahoo.com
      const supportedMails = [
        {
          prefix: '@gmail.com',
          stmp: 'smtp.gmail.com',
          port: 465
        },
        {
          prefix: '@yahoo.com',
          stmp: 'smtp.mail.yahoo.com',
          port: 465
        },
        {
          prefix: '@outlook.com',
          stmp: 'smtp.office365.com',
          port: 587,
          tls: true
        }
      ]

      const configuration = supportedMails.find((m) =>
        this.username.endsWith(m.prefix)
      )
      return configuration || null
    }
  },
  beforeMount() {
    if (this.userSettings.emailConfig) {
      this.service = this.userSettings.emailConfig.emailConfigService
      this.username = this.userSettings.emailConfig.emailConfigUsername
      this.password = this.userSettings.emailConfig.emailConfigPassword
      this.host = this.userSettings.emailConfig.emailConfigHost
      this.port = this.userSettings.emailConfig.emailConfigPort
      this.tls = this.userSettings.emailConfig.emailConfigTls
    }
  },
  mounted() {
    if (this.isOauthEnabled) this.activeTab = 'oauth'
  },
  watch: {
    username(newVal) {
      // Prevent host, port, tls from being overwritten when component loads
      if (newVal && newVal !== this.userSettings.emailConfigUsername) {
        const _generatedConfig = this.generateConfig()
        if (_generatedConfig) {
          this.port = _generatedConfig.port
          this.host = _generatedConfig.stmp
          this.tls = _generatedConfig.tls || false
        } else this.showMoreConfiguration = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay-block {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: all;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.overlay-content {
  color: #555;
  font-size: 1.1em;
  text-align: center;
  padding: 20px;
  max-width: 80%;
}

.toggle-password {
  position: absolute;
  bottom: 0;
  right: 1rem;
  align-self: center;
  cursor: pointer;
}
</style>
