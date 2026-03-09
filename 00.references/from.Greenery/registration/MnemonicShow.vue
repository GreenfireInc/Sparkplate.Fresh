<template>
  <form autocomplete="off" @submit.prevent="confirmMnemonic">
    <div class="form-field">
      <label class="px-3 leading-6 py-2 text-danger" v-if="!customInput">
        IMPORTANT:<br />This is your mnemonic code. Please write this down
        before continuing. This will be necessary for account recovery.
      </label>
      <label class="px-3 leading-6 py-2 text-danger" v-else>
        IMPORTANT:<br />Please ensure you correctly enter your mnemonic phrase
        before continuing. This will be neccessary for password recovery.
      </label>
      <div class="container" v-if="showWords">
        <div class="row">
          <div
            v-for="(forms, i) in phrase.filter((_, i) => i < 6)"
            :key="'word-' + (i + 1)"
            class="p-3 leading-7 col text-center"
          >
            <p>{{ forms }}</p>
            {{ i + 1 }}
          </div>
        </div>
        <div class="row">
          <div
            v-for="(forms, i) in phrase.filter((_, i) => i > 5)"
            :key="'word' + (i + 7)"
            class="p-3 leading-7 col text-center"
          >
            <p>{{ forms }}</p>
            {{ i + 7 }}
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <div class="row">
          <div
            v-for="(_, i) in phrase.filter((_, i) => i < 6)"
            :key="'input-' + (i + 1)"
            class="leading-7 col text-center"
          >
            <div class="autocomplete">
              <input
                :ref="`mnemonicInput`"
                v-model="inputs[i]"
                @input="autocomplete(i)"
                @keydown="(e) => handleAutofillControl(e, i)"
                @paste="handleMnemonicPaste"
                class="border-b-2 w-20 border-gray-600 text-center"
                type="text"
              />
              <!-- Top Row Autocomplete Container -->
              <div class="autocomplete-items" :ref="`autocompleteResult`" />
            </div>
            <p>{{ i + 1 }}</p>
          </div>
        </div>
        <div class="row">
          <div
            v-for="(_, i) in phrase.filter((_, i) => i < 6)"
            :key="'input-' + (i + 7)"
            class="leading-7 col text-center"
          >
            <div class="autocomplete">
              <input
                :ref="`mnemonicInput`"
                v-model="inputs[i + 6]"
                @input="autocomplete(i + 6)"
                @keydown="(e) => handleAutofillControl(e, i + 6)"
                @paste="handleMnemonicPaste"
                class="border-b-2 w-20 border-gray-600 text-center"
                type="text"
              />
              <!-- Bottom Row Autocomplete Container -->
              <div class="autocomplete-items" :ref="`autocompleteResult`" />
            </div>
            <p>{{ i + 7 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!showWords" class="my-6">
      <button
        class="bg-red-500 text-white px-4 py-2 mr-2"
        @click.prevent="goBack"
        type="button"
      >
        Go Back
      </button>
      <button class="bg-green-500 text-white px-4 py-2" type="submit">
        Confirm Mnemonic
      </button>
    </div>
    <div v-else class="flex my-6 align-items-center">
      <button
        class="bg-green-500 text-white px-4 py-2 mr-2"
        @click.prevent="showWords = false"
      >
        Continue
      </button>
      <a
        @click.prevent="initCustomMnemonic"
        class="text-decoration-underline nav-link nav-item"
        >Use a Custom Mnemonic?</a
      >
      <button class="bg-white px-4 py-2 ml-2" @click.prevent="initPrint">
        Print
      </button>
      <print-mnemonic
        :phrase="form.mnemonic.phrase"
        :user="form"
        @initPrint="getInitPrint"
      />
    </div>
  </form>
</template>

<script>
import PrintMnemonic from './PrintMnemonic.vue'
import { wordlists } from 'bip39'

export default {
  props: ['form'],
  components: { PrintMnemonic },
  data() {
    return {
      currentFocus: -1, // focus for autofill control
      dictionary: wordlists.english,
      showWords: true,
      customInput: false,
      phrase: [],
      inputs: [],
      initPrint: null
    }
  },
  methods: {
    goBack() {
      this.showWords = true
      this.customInput = false
    },
    initCustomMnemonic() {
      this.showWords = false
      this.customInput = true
    },
    confirmMnemonic() {
      if (this.customInput) {
        let count = 0
        this.inputs.forEach((word) => {
          if (word.length) count++
        })
        // NOTE: when testing can comment out this code so Sign Up process does not complete
        if (count === 12) {
          // this is where a succesful mnemonic is processed
          const customMnemonic = this.inputs.map((w) => w.trim()).join(' ')
          this.$emit('handleMnemonicSubmit', customMnemonic)
        } else
          this.$toast.error(
            'Please fill in all 12 fields for mnemonic phrase.',
            'Invalid Phrase'
          )
      } else {
        this.verifyMnemonic()
      }
    },
    verifyMnemonic() {
      const words = this.phrase
      // console.log({ words, inputs: this.inputs })
      const failedWords = words.filter((word, i) => {
        return word !== this.inputs[i]
      })
      if (failedWords.length === 0) {
        this.$emit('handleMnemonicSubmit')
      } else {
        this.$toast.error(
          'The mnemonic phrase you entered did not match!',
          'Invalid Phrase'
        )
      }
    },
    getInitPrint(method) {
      this.initPrint = method
    },
    autocomplete(inputIndex) {
      const inputRef = this.$refs.mnemonicInput[inputIndex]
      const resultRef = this.$refs.autocompleteResult[inputIndex]
      const inputValue = inputRef.value

      // Clear any existing divs
      this.closeAllAutocompleteDivs()
      if (!inputValue) return

      // Check for matches using regex
      const reg = new RegExp(inputValue)
      let count = 0
      for (let i = 0; i < this.dictionary.length; i++) {
        // Only include the first 4 suggestions to prevent vertical scroll
        if (count >= 4) break

        const word = this.dictionary[i]
        if (word.match(reg)) {
          // Add word to result div
          const wordDiv = document.createElement('div')
          wordDiv.innerText = word
          wordDiv.addEventListener('click', () => {
            inputRef.value = word
            this.inputs[inputIndex] = word
            this.closeAllAutocompleteDivs()
          })

          resultRef.appendChild(wordDiv)
          count++
        }
      }

      // Add event listener to close autocomplete div
      document.addEventListener('click', () =>
        this.closeAllAutocompleteDivs(inputIndex)
      )
    },
    closeAllAutocompleteDivs(index) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      const resultRefs = this.$refs.autocompleteResult
      for (var i = 0; i < resultRefs.length; i++) {
        if (index != i) {
          resultRefs[i].innerHTML = ''
        }
      }
      this.currentFocus = -1 // reset keyboard control
    },
    handleAutofillControl(event, index) {
      const resultRef = this.$refs.autocompleteResult[index]

      if (event.keyCode === 40) {
        // move active focus down
        this.currentFocus++
        this.addActive(resultRef)
      } else if (event.keyCode === 38) {
        // Move active focus up
        this.currentFocus--
        this.addActive(resultRef)
      } else if (event.keyCode === 13 || event.keyCode === 9) {
        // If tab or enter simulate click on active element
        if (event.keyCode === 13) event.preventDefault()
        if (this.currentFocus > -1) {
          if (resultRef) resultRef.childNodes[this.currentFocus].click()
        }
      }
    },
    handleMnemonicPaste(event) {
      // get data from clipboard and check length
      const pastedText = event.clipboardData.getData('text')
      const phrase = pastedText.split(' ')

      // if only a single word is being pasted, continue
      if (phrase.length === 1) return

      // prevent text from being pasted by default method
      event.preventDefault()

      // if phrase is correct length, add it to proper input fields
      if (phrase.length === 12) {
        this.phrase = phrase
        this.inputs = phrase
      }
    },
    addActive(resultRef) {
      const results = resultRef.childNodes

      // Remove existing active classes
      results.forEach((node) => node.classList.remove('autocomplete-active'))

      // Handle edge cases
      if (this.currentFocus >= results.length) this.currentFocus = 0
      if (this.currentFocus < 0) this.currentFocus = results.length - 1

      // Add active class
      results[this.currentFocus].classList.add('autocomplete-active')
    }
  },
  created() {
    this.phrase = this.form.mnemonic.phrase.trim().split(' ')
    if (import.meta.env.VITE_MNEMONIC)
      this.inputs = import.meta.env.VITE_MNEMONIC.split(' ')
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  display: inline-block;

  .autocomplete-items::v-deep {
    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    top: 100%;
    left: 0;
    right: 0;

    div {
      cursor: pointer;
      background-color: #fff;
      border-bottom: 1px solid #d4d4d4;

      &:hover {
        background-color: #e9e9e9;
      }

      &.autocomplete-active {
        background-color: DodgerBlue !important;
        color: #ffffff;
      }
    }
  }
}
</style>
