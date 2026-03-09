<template>
  <form @submit.prevent="auth" class="registration-form" ref="authForm">
    <welcome-text :mode="activeMode" />
    <div v-if="!forgotPassword">
      <p
        v-if="actionStatus.text"
        class="text-xl rounded bg-green-200 p-3 mt-8 mb-2"
      >
        {{ actionStatus.text }}
      </p>
      <div
        v-if="!verify"
        class="inline-flex items-center border-b text-xl font-semibold"
      >
        <div
          v-for="(mode, modeIndex) in modes"
          :key="`auth-access-mode_${modeIndex}`"
          v-ripple
          :class="{
            'border-b-2': mode === activeMode || activeMode === 'Next'
          }"
          class="py-3 px-4 border-green-500 cursor-pointer"
          v-text="mode"
          @click="setActiveMode(mode)"
        />
      </div>
      <div
        @click="goBack"
        v-ripple
        class="capitalize border-b-2 my-2 text-xl font-semibold inline-block border-green-500"
        v-else-if="activeMode !== 'Analytics'"
      >
        <!-- Title Section -->
        <div class="py-3 flex items-center px-4 cursor-pointer">
          <svg
            class="w-6 h-6 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 447.24 447.24"
          >
            <path
              d="M420.36 192.23c-1.83-.3-3.68-.43-5.53-.41H99.3l6.88-3.2a64 64 0 0018.08-12.8l88.48-88.48a33.12 33.12 0 004.64-42.4 32 32 0 00-48-4.16l-160 160a32 32 0 00-.03 45.25l.03.03 160 160a32 32 0 0048-3.2 33.12 33.12 0 00-4.64-42.4l-88.32-88.64a64 64 0 00-16-11.68l-9.6-4.32h314.24a33.12 33.12 0 0033.76-26.88 32 32 0 00-26.47-36.71z"
            />
          </svg>
          <!-- title text is a variable for setting based on activeMode -->
          <span>{{ this.titleText }}</span>
        </div>
      </div>
      <div v-if="!verify">
        <div class="form-row">
          <div class="col-6">
            <div
              class="form-field"
              v-if="activeMode !== 'Login'"
              :class="{
                'border-red-500 border-2 text-danger':
                  !validation.firstnameValid &&
                  validation.firstnameTouched &&
                  submitButtonDisabled
              }"
            >
              <label>firstname*</label>
              <input
                type="text"
                v-model="form.firstname"
                @blur="touch('firstname')"
                required
              />
            </div>
          </div>
          <div class="col-6">
            <div
              class="form-field"
              v-if="activeMode !== 'Login'"
              :class="{
                'border-red-500 border-2 text-danger':
                  !validation.lastnameValid &&
                  validation.lastnameTouched &&
                  submitButtonDisabled
              }"
            >
              <label>lastname*</label>
              <input
                type="text"
                v-model="form.lastname"
                @blur="touch('lastname')"
                required
              />
            </div>
          </div>
        </div>
        <div class="form-row">
          <div :class="activeMode !== 'Login' ? 'col-6' : 'col-12'">
            <div
              class="form-field"
              :class="{
                'border-red-500 border-2 text-danger':
                  (!validation.emailValid &&
                    validation.emailTouched &&
                    submitButtonDisabled) ||
                  (emailExists && validation.isSignup && submitButtonDisabled)
              }"
            >
              <label>email{{ activeMode !== 'Login' ? '*' : '' }}</label>
              <input
                type="email"
                v-model="form.email"
                @blur="touch('email')"
                required
              />
            </div>
          </div>
          <div class="col-6">
            <div class="form-field" v-if="activeMode !== 'Login'">
              <label>Company</label>
              <input type="text" v-model="form.company" />
            </div>
          </div>
        </div>
        <div class="form-row" v-if="activeMode !== 'Login'">
          <div class="col-6">
            <div
              class="form-field mb-0"
              :class="{
                'border-red-500 border-2 text-danger':
                  (!validation.passwordValid &&
                    validation.passwordTouched &&
                    submitButtonDisabled) ||
                  (!validation.passwordsMatch &&
                    validation.cpasswordTouched &&
                    submitButtonDisabled)
              }"
            >
              <label>Password*</label>
              <input
                :type="passwordInputType"
                v-model="form.password"
                @blur="touch('password')"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}"
                required
              />
              <div class="anchor-end cursor-pointer" @click="togglePassword">
                <img :src="togglePasswordIconUrl" />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div
              class="form-field mb-0"
              :class="{
                'border-red-500 border-2 text-danger':
                  !validation.passwordsMatch &&
                  validation.cpasswordTouched &&
                  submitButtonDisabled
              }"
            >
              <label>Confirm Password*</label>
              <input
                :type="passwordInputType"
                v-model="form.cpassword"
                @blur="touch('cpassword')"
                required
              />
              <div class="anchor-end cursor-pointer" @click="togglePassword">
                <img :src="togglePasswordIconUrl" />
              </div>
            </div>
          </div>
          <div class="mb-2 pl-2 password-requirements">
            Must be seven or more characters, with at least one number, one
            lowercase and one uppercase letter.
          </div>
        </div>
        <div class="form-field" v-if="activeMode === 'Login'">
          <label>Password</label>
          <input
            :type="passwordInputType"
            v-model="form.password"
            @blur="touch('password')"
            required
          />
          <div class="anchor-end cursor-pointer" @click="togglePassword">
            <img :src="togglePasswordIconUrl" />
          </div>
        </div>
        <div class="form-check" v-if="activeMode !== 'Login'">
          <input
            class="form-check-input"
            type="checkbox"
            id="checkMailChimp"
            v-model="form.mailChimpSignUp"
          />
          <label class="form-check-label" for="selectName"
            >Click here to receive updates and offerings from Greenery</label
          >
        </div>
      </div>
      <!-- adding EULA -->
      <eula-display
        v-else-if="activeMode === 'EULA'"
        @displayMnemonicNext="displayMnemonicNext"
      />
      <analytics-display
        v-else-if="activeMode === 'Analytics'"
        @handleAnalyticsSubmit="handleAnalyticsSubmit"
      />
      <!-- mnemonic is the default case -->
      <mnemonic-show
        v-else
        :form="form"
        @handleMnemonicSubmit="handleMnemonicSubmit"
      />
      <p
        class="float-right mr-4 my-2 cursor-pointer"
        v-if="activeMode === 'Login'"
        @click="initForgotPassword()"
      >
        Forgot Password
      </p>
    </div>
    <!-- forgot password -->
    <div v-else>
      <div
        @click="goBack"
        v-ripple
        class="capitalize border-b-2 mb-4 mt-4 text-xl font-semibold inline-block border-green-500"
      >
        <div class="py-3 flex items-center px-4 cursor-pointer">
          <svg
            class="w-6 h-6 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 447.24 447.24"
          >
            <path
              d="M420.36 192.23c-1.83-.3-3.68-.43-5.53-.41H99.3l6.88-3.2a64 64 0 0018.08-12.8l88.48-88.48a33.12 33.12 0 004.64-42.4 32 32 0 00-48-4.16l-160 160a32 32 0 00-.03 45.25l.03.03 160 160a32 32 0 0048-3.2 33.12 33.12 0 00-4.64-42.4l-88.32-88.64a64 64 0 00-16-11.68l-9.6-4.32h314.24a33.12 33.12 0 0033.76-26.88 32 32 0 00-26.47-36.71z"
            />
          </svg>
          <span>Forgot Password</span>
        </div>
      </div>
      <div class="form-field mb-5 py-3 items-center text-center">
        <span class="text-md font-semibold">Load Greenery Steg</span>
        <button
          type="button"
          class="btn mt-2 bg-green-600 text-white"
          @click="initRevealPassword"
          v-if="!revealedPassword"
          v-ripple
        >
          Choose File
        </button>
        <div v-else>
          Account Password:
          <span class="text-lg font-semibold">
            {{ revealedPassword }}
          </span>
          <p class="mt-3 text-red-500 font-semibold">
            Remember to keep your password safe and secure!
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="
        validation.isSignup &&
        submitButtonDisabled &&
        submitDisabledReasons.length
      "
      class="bg-red-50 border border-red-200 text-red-700 p-3 rounded my-3"
    >
      <strong class="block mb-1">Correct the following:</strong>
      <ul class="list-disc pl-5 text-sm">
        <li v-for="(r, i) in submitDisabledReasons" :key="i">{{ r }}</li>
      </ul>
    </div>

    <button
      v-if="!verify && !forgotPassword"
      :disabled="submitButtonDisabled"
      type="submit"
      v-text="activeMode"
      v-ripple="'rgba(255, 255, 255, .15)'"
      class="py-4 px-4 text-center w-full text-white"
      :class="submitButtonDisabled ? 'bg-green-300' : 'bg-green-500'"
    />
    <verify-modal
      :verified="() => $store.dispatch('accounts/setAuthenticated', true)"
      :cancelled="() => $store.dispatch('accounts/logout')"
    />
  </form>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import WelcomeText from './WelcomeText.vue'
import MnemonicShow from './MnemonicShow.vue'
import EulaDisplay from './EulaDisplay.vue'
import AnalyticsDisplay from '../AnalyticsDisplay.vue'
import bugReporter from '../../logging/BugReporter'
import accountMixins from '@/utils/mixins/accountMixins'
import VerifyModal from '@/service/VerifyModal.vue'
import mailChimpMixins from '@/utils/mixins/mailChimpMixins'

export default {
  components: {
    WelcomeText,
    EulaDisplay,
    MnemonicShow,
    VerifyModal,
    AnalyticsDisplay
  },
  mixins: [accountMixins, mailChimpMixins],
  data() {
    return {
      isInvalidIconUrl: './assets/vectors/close.svg',
      modes: ['Sign up', 'Login'],
      activeMode: '',
      emailExists: false,
      previousMode: '',
      forgotPassword: false,
      verify: false,
      titleText: 'Verify',
      inputs: [],
      showPassword: false,
      form: {
        firstname: import.meta.env.VITE_FIRSTNAME || '',
        lastname: import.meta.env.VITE_LASTNAME || '',
        email: import.meta.env.VITE_EMAIL || '',
        password: import.meta.env.VITE_PASSWORD || '',
        cpassword: import.meta.env.VITE_PASSWORD || '',
        company: import.meta.env.VITE_COMPANY || '',
        mnemonic: '',
        mailChimpSignUp: false
      },
      touched: {
        firstname: false,
        lastname: false,
        email: false,
        password: false,
        cpassword: false
      }
    }
  },
  computed: {
    ...mapState(['wallets', 'coinsMeta', 'coinsInfo']),
    actionStatus() {
      return this.$store.state.accounts.status
    },
    allAccounts() {
      // return array of existing account emails
      return this.$store.state.accounts.all.map((account) => account.email)
    },
    validation() {
      const { firstname, lastname, email, password, cpassword } = this.form
      const isSignup = this.activeMode === 'Sign up'

      const emailPattern = /^\S+@\S+\.\S+$/
      const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/

      const emailValid = !!email && emailPattern.test(email)
      const passwordValid = !!password && passwordPattern.test(password)
      const passwordsMatch = password === cpassword && !!password && !!cpassword

      const validation = {
        cpasswordTouched: !!(this.touched && this.touched.cpassword),
        emailTouched: !!(this.touched && this.touched.email),
        emailValid,
        firstnameTouched: !!(this.touched && this.touched.firstname),
        firstnameValid: !isSignup || !!firstname,
        isSignup,
        lastnameTouched: !!(this.touched && this.touched.lastname),
        lastnameValid: !isSignup || !!lastname,
        passwordsMatch: !isSignup || passwordsMatch,
        passwordTouched: !!(this.touched && this.touched.password),
        passwordValid: !isSignup || passwordValid
      }
      return validation
    },
    submitDisabledReasons() {
      const reasons = []
      const v = this.validation
      if (v.isSignup) {
        if (v.firstnameTouched && !v.firstnameValid)
          reasons.push('First name is required.')
        if (v.lastnameTouched && !v.lastnameValid)
          reasons.push('Last name is required.')
        if (v.emailTouched && !v.emailValid)
          reasons.push('Enter a valid email address.')
        if (this.emailExists)
          reasons.push(
            'An account with this email already exists on this machine.'
          )
        if (v.passwordTouched && !v.passwordValid)
          reasons.push(
            'Password must be 7+ chars and include uppercase, lowercase, and a number.'
          )
        if (v.cpasswordTouched && !v.passwordsMatch)
          reasons.push('Passwords do not match.')
      }
      return reasons
    },
    submitButtonDisabled() {
      return this.submitDisabledReasons.length > 0
    },
    togglePasswordIconUrl() {
      const base = './assets/vectors/'
      const svg = this.showPassword ? 'eye.svg' : 'eyeSlash.svg'
      return base + svg
    },
    passwordInputType() {
      return this.showPassword ? 'text' : 'password'
    }
  },
  methods: {
    ...mapActions({
      login: 'accounts/login',
      signup: 'accounts/signup'
    }),
    setActiveMode(mode) {
      if (mode === 'EULA') {
        this.titleText = 'EULA'
      } else {
        this.titleText = 'Verify'
      }
      this.previousMode = this.activeMode
      this.activeMode = mode
    },
    checkExistingEmail(email) {
      // Set email if not passed in. This method is invoked in watch.form.email and watch.activeMode
      if (!email) email = this.form.email

      if (this.allAccounts.includes(email)) {
        this.emailExists = true
      } else {
        this.emailExists = false
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    triggerLogin() {
      return this.login({ form: this.form, requireMFA: this.openMFAModal })
    },
    async triggerSignup() {
      const form = { ...this.form }
      this.setLoader(() => this.signup(form))
      // make sure user has checked Mail Chimp checkbox
      if (this.form.mailChimpSignUp) {
        this.mailChimpAddMember(this.form)
      }
    },
    goBack() {
      // adding special case for EULA, user will go back to Sign Up from Menumonic screen
      // so activeMode needs to be set to Sign up so that EULA does not appear as text inside Submit button
      if (this.previousMode === 'EULA') {
        this.setActiveMode('Sign up')
      } else {
        this.setActiveMode(this.previousMode)
      }
      this.verify = false
      this.forgotPassword = false
      this.revealedPassword = ''
    },
    displayMnemonicNext() {
      this.setActiveMode('Next')
      this.verify = true
    },
    handleAnalyticsSubmit(userOptions) {
      this.form.userSettings = {
        analyticsOptIn: userOptions.analyticsOptIn,
        bugTrackingEnabled: userOptions.bugTrackingEnabled
      }
      this.triggerSignup()
    },
    async handleMnemonicSubmit(customMnemonic) {
      if (customMnemonic) {
        const mnemonic = await window.cryptos.generateMnemonic(customMnemonic)
        this.form.mnemonic = mnemonic
        this.form.generateWallets = true
      }
      this.setActiveMode('Analytics')
    },
    initForgotPassword() {
      this.forgotPassword = true
      this.setActiveMode('Reveal Password')
    },
    auth() {
      if (this.activeMode === 'Login') {
        this.setLoader(this.triggerLogin)
      } else if (this.activeMode === 'Sign up') {
        // setting mail_chimp_sign_up to false here if user is signing up again
        localStorage.setItem('mail_chimp_sign_up', false)
        if (this.form.password !== this.form.cpassword) {
          this.$toast.error('Passwords do not match.', 'Try again')
          return
        }
        // Mnemonic component is the default else in template code
        // adding new mode for displaying EULA, after EULA is done mode will be set to Next
        this.setActiveMode('EULA')
        this.verify = true
      }
    },
    setLoader(callback) {
      // Set loader handles loading/waiting for signup or login action to be completed
      const loader = this.$loader(null, { zIndex: 9999, opacity: 0.3 })
      this.$nextTick(async () => {
        try {
          await callback()
          // on successful signup/login store lasted used email
          const email = this.form.email
          localStorage.setItem('lastUsedEmail', email)
        } catch (err) {
          console.error(err)
          bugReporter.catchError(err)
        } finally {
          loader.hide()
        }
      })
    },
    openMFAModal() {
      this.$modal.show('verify')
    },
    touch(field) {
      if (!this.touched) this.touched = {}
      if (field in this.touched) this.touched[field] = true
    }
  },
  watch: {
    'form.email': function (email) {
      this.checkExistingEmail(email)
    },
    activeMode(mode) {
      if (mode === 'Sign up') {
        this.checkExistingEmail()
      }
    }
  },
  beforeMount() {
    this.setActiveMode('Sign up')
    this.$store.dispatch('accounts/loadAccounts').then(() => {
      if (this.allAccounts.length) this.setActiveMode('Login')
    })

    window.cryptos
      .generateMnemonic()
      .then((mnemonic) => {
        const { phrase, seed } = mnemonic
        this.form.mnemonic = { phrase, seed }

        // load stored email if set
        const email = localStorage.getItem('lastUsedEmail')
        if (email) this.form.email = email
      })
      .catch((err) => {
        console.error(err)
      })
  },
  mounted() {
    if (this.$route.name !== 'Home') this.$router.replace('/')
  }
}
</script>
<style lang="scss" scoped>
.registration-form {
  @apply bg-white rounded-lg px-6 py-4 max-w-3xl mx-auto text-green-900 shadow overflow-auto w-3/4;
  max-height: 95%;

  &:hover {
    @apply shadow-xl;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    @apply bg-green-600 rounded-lg;
  }
  &::-webkit-scrollbar-track {
    @apply bg-gray-200 rounded-lg;
  }
}
.form-field {
  @apply bg-gray-200 px-1 py-1 mb-3 rounded flex flex-col;
  position: relative;

  label {
    @apply text-xs font-semibold px-1 capitalize -mb-1;
  }

  input {
    @apply py-2 px-1 bg-transparent;

    &:focus {
      @apply outline-none;
    }
  }

  .anchor-end {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 10px;
  }
}

.mb-8 {
  margin-bottom: 10rem;
}

svg {
  vertical-align: super;
  display: flex;
}

.password-requirements {
  font-size: 0.9rem;
}

.filter-red {
  filter: invert(16%) sepia(82%) saturate(4147%) hue-rotate(359deg)
    brightness(100%) contrast(136%);
}
</style>
