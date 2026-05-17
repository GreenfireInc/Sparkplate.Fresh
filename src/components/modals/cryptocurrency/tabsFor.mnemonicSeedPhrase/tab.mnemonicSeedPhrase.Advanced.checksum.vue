<template>
  <div
    :class="[
      'mnp-checksum-tab',
      hasInvalidWordsWithSuggestions
        ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
        : 'space-y-4'
    ]"
  >
    <!-- Left Column: Input and Main Validation Results -->
    <div class="space-y-4 px-2">
      <div class="space-y-2">
        <Label for="mnp-checksum-seed-input" class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Seed Phrase
        </Label>
        <textarea
          id="mnp-checksum-seed-input"
          v-model="inputSeedPhrase"
          placeholder="Enter your mnemonic seed phrase..."
          class="w-full min-h-[120px] font-mono text-sm p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          @input="handleInputChange"
        ></textarea>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Enter the seed phrase you want to validate. Non-letter characters (quotes, commas, etc.) will be automatically removed.
        </p>
      </div>

      <button
        type="button"
        class="w-full px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-medium rounded-lg transition-opacity shadow-md"
        @click="validateChecksum"
      >
        Validate Checksum
      </button>

      <!-- Validation Results -->
      <div v-if="validationResult.isValid !== null" class="space-y-3 mt-4">
        <div
          :class="[
            'p-4 rounded-lg border-2',
            validationResult.isValid
              ? 'bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-400'
              : 'bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-400'
          ]"
        >
          <div class="flex items-center gap-2 mb-2">
            <CheckCircle2
              v-if="validationResult.isValid"
              class="h-5 w-5 text-green-600 dark:text-green-400"
            />
            <XCircle
              v-else
              class="h-5 w-5 text-red-600 dark:text-red-400"
            />
            <h3
              :class="[
                'font-semibold',
                validationResult.isValid
                  ? 'text-green-900 dark:text-green-100'
                  : 'text-red-900 dark:text-red-100'
              ]"
            >
              {{ validationResult.message }}
            </h3>
          </div>
        </div>

        <!-- Invalid Words Highlighted -->
        <div
          v-if="!validationResult.isValid && validationResult.words.length > 0 && validationResult.invalidWordIndices.length > 0"
          class="space-y-2"
        >
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
            Invalid Words (Highlighted in Red)
          </span>
          <div class="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg border border-red-500/30 dark:border-red-400/30">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(word, index) in validationResult.words"
                :key="index"
                :class="[
                  'px-2 py-1 rounded font-mono text-sm',
                  validationResult.invalidWordIndices.includes(index)
                    ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-2 border-red-500 dark:border-red-400'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
                ]"
                :title="validationResult.invalidWordIndices.includes(index) ? `Word ${index + 1}: '${word}' is not in BIP39 wordlist` : `Word ${index + 1}: ${word}`"
              >
                {{ index + 1 }}. {{ word }}
              </span>
            </div>
          </div>
        </div>

        <!-- Validation Details -->
        <div v-if="validationResult.details.length > 0" class="space-y-2">
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
            Validation Details
          </span>
          <div class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg space-y-1">
            <div
              v-for="(detail, index) in validationResult.details"
              :key="index"
              class="text-sm font-mono text-gray-900 dark:text-white"
            >
              • {{ detail }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column: Invalid Words & Suggested Replacements -->
    <div v-if="hasInvalidWordsWithSuggestions" class="space-y-4 md:border-l-2 md:border-gray-200 dark:md:border-gray-600 md:pl-6">
      <div v-if="validationResult.checksumExplanation" class="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400 rounded-lg p-4">
        <div class="flex items-start gap-2">
          <AlertCircle class="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div class="space-y-2">
            <h4 class="font-semibold text-blue-900 dark:text-blue-100 text-sm">
              Why Did the Checksum Fail?
            </h4>
            <p class="text-sm text-blue-900 dark:text-blue-100">
              {{ validationResult.checksumExplanation }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="validationResult.invalidWordIndices.length > 0" class="space-y-3">
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
          Invalid Words & Suggested Replacements
        </span>
        <div class="space-y-2 max-h-[calc(90vh-12rem)] overflow-y-auto pr-2 mnp-checksum-suggestions-scroll">
          <div
            v-for="index in validationResult.invalidWordIndices"
            :key="index"
            class="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg border border-red-500/30 dark:border-red-400/30"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="font-mono text-sm font-semibold text-red-700 dark:text-red-400">
                Word {{ index + 1 }}: "{{ validationResult.words[index] }}"
              </span>
              <span
                v-if="validationResult.wordSuggestions.get(index)?.length"
                class="text-xs text-gray-600 dark:text-gray-400"
              >
                → Suggested replacements:
              </span>
              <span
                v-else
                class="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1"
              >
                <AlertCircle class="h-3 w-3" />
                No close matches found
              </span>
            </div>
            <div v-if="validationResult.wordSuggestions.get(index)?.length" class="flex flex-wrap gap-2">
              <button
                v-for="suggestion in validationResult.wordSuggestions.get(index)"
                :key="suggestion"
                type="button"
                class="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 font-mono text-xs transition-colors"
                @click="handleReplaceWord(index, suggestion)"
              >
                {{ suggestion }}
              </button>
            </div>
            <p v-else class="text-xs text-gray-600 dark:text-gray-400">
              This word is too different from BIP39 words. Please manually check your seed phrase backup or try the BIP39 wordlist.
            </p>
          </div>
        </div>
      </div>

      <div v-if="validationResult.fixSuggestions.length > 0" class="bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-500 dark:border-yellow-400 rounded-lg p-4">
        <div class="flex items-start gap-2">
          <AlertCircle class="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
          <div class="space-y-2 flex-1">
            <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 text-sm">
              How to Fix the Checksum
            </h4>
            <ul class="space-y-1">
              <li
                v-for="(suggestion, idx) in validationResult.fixSuggestions"
                :key="idx"
                class="text-sm text-yellow-900 dark:text-yellow-100 flex items-start gap-2"
              >
                <span class="text-yellow-600 dark:text-yellow-400 mt-0.5">•</span>
                <span>{{ suggestion }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="validationResult.autoFixedPhrases.length > 0" class="bg-green-50 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-400 rounded-lg p-4">
        <div class="flex items-start gap-2">
          <CheckCircle2 class="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
          <div class="space-y-3 flex-1">
            <h4 class="font-semibold text-green-900 dark:text-green-100 text-sm">
              ✨ Corrected Seed Phrases (Valid Checksum)
            </h4>
            <p class="text-sm text-green-900 dark:text-green-100">
              We found {{ validationResult.autoFixedPhrases.length }} valid seed phrase{{ validationResult.autoFixedPhrases.length > 1 ? 's' : '' }} similar to your input. Click to use one:
            </p>
            <div class="space-y-2">
              <div
                v-for="(phrase, phraseIndex) in validationResult.autoFixedPhrases"
                :key="phraseIndex"
                class="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg border border-green-500/40 dark:border-green-400/40"
              >
                <div class="flex items-start gap-3">
                  <div class="flex-1">
                    <div class="flex flex-wrap gap-1 mb-2">
                      <span
                        v-for="(word, wordIdx) in phrase.split(' ')"
                        :key="wordIdx"
                        :class="[
                          'px-1.5 py-0.5 rounded font-mono text-xs',
                          word !== validationResult.words[wordIdx]
                            ? 'bg-green-600 text-white dark:bg-green-500 font-semibold'
                            : 'text-gray-900 dark:text-white'
                        ]"
                        :title="word !== validationResult.words[wordIdx] ? `Changed from '${validationResult.words[wordIdx]}'` : 'Unchanged'"
                      >
                        {{ word }}
                      </span>
                    </div>
                    <p
                      v-if="phrase.split(' ').some((word, wordIdx) => word !== validationResult.words[wordIdx])"
                      class="text-xs text-gray-600 dark:text-gray-400"
                    >
                      <span class="text-green-600 dark:text-green-400 font-semibold">Highlighted words</span> have been changed to fix the checksum
                    </p>
                  </div>
                  <button
                    type="button"
                    class="shrink-0 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                    @click="handleUseFixedPhrase(phrase)"
                  >
                    Use This
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Label } from 'radix-vue'
import * as bip39 from 'bip39'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'

const props = defineProps<{
  open: boolean
  seedPhrase: string
}>()

const emit = defineEmits<{
  'update:seedPhrase': [value: string]
}>()

const inputSeedPhrase = ref(props.seedPhrase)

interface ValidationResult {
  isValid: boolean | null
  message: string
  wordCount: number
  details: string[]
  invalidWordIndices: number[]
  words: string[]
  wordSuggestions: Map<number, string[]>
  checksumExplanation: string
  fixSuggestions: string[]
  autoFixedPhrases: string[]
}

const emptyValidation = (): ValidationResult => ({
  isValid: null,
  message: '',
  wordCount: 0,
  details: [],
  invalidWordIndices: [],
  words: [],
  wordSuggestions: new Map(),
  checksumExplanation: '',
  fixSuggestions: [],
  autoFixedPhrases: [],
})

const validationResult = ref<ValidationResult>(emptyValidation())

watch(() => props.open, (newOpen) => {
  if (newOpen && props.seedPhrase) {
    inputSeedPhrase.value = props.seedPhrase
  }
  if (!newOpen) {
    validationResult.value = emptyValidation()
  }
})

watch(() => props.seedPhrase, (newPhrase) => {
  if (props.open && newPhrase) {
    inputSeedPhrase.value = newPhrase
  }
})

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = []
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  return matrix[str2.length][str1.length]
}

const findSimilarWords = (invalidWord: string, wordlist: string[]): string[] => {
  const suggestions: { word: string; distance: number; score: number }[] = []
  const lowerInvalid = invalidWord.toLowerCase()

  const maxDistance = Math.max(2, Math.floor(invalidWord.length * 0.4))

  for (const word of wordlist) {
    const distance = levenshteinDistance(lowerInvalid, word.toLowerCase())

    let score = 0

    if (distance <= maxDistance) {
      score += (maxDistance - distance) * 10
    }

    let commonPrefixLength = 0
    for (let i = 0; i < Math.min(lowerInvalid.length, word.length); i++) {
      if (lowerInvalid[i] === word[i]) commonPrefixLength++
      else break
    }
    score += commonPrefixLength * 5

    let commonSuffixLength = 0
    const minLen = Math.min(lowerInvalid.length, word.length)
    for (let i = 1; i <= minLen; i++) {
      if (lowerInvalid[lowerInvalid.length - i] === word[word.length - i]) commonSuffixLength++
      else break
    }
    score += commonSuffixLength * 3

    if (lowerInvalid.includes(word) || word.includes(lowerInvalid)) {
      score += 8
    }

    const lengthDiff = Math.abs(invalidWord.length - word.length)
    if (lengthDiff <= 2) {
      score += (3 - lengthDiff) * 2
    }

    if (score > 0 || distance <= maxDistance) {
      suggestions.push({ word, distance, score })
    }
  }

  return suggestions
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.distance - b.distance
    })
    .slice(0, 8)
    .map(s => s.word)
}

const findChecksumFixedPhrases = (words: string[]): string[] => {
  const validPhrases: string[] = []
  const wordlist = bip39.wordlists.english || bip39.wordlists['english']

  if (!wordlist) return validPhrases

  const wordsExceptLast = words.slice(0, -1)
  for (const lastWord of wordlist) {
    const testPhrase = [...wordsExceptLast, lastWord].join(' ')
    if (bip39.validateMnemonic(testPhrase)) {
      validPhrases.push(testPhrase)
      if (validPhrases.length >= 3) break
    }
  }

  if (validPhrases.length === 0) {
    for (let i = 0; i < words.length; i++) {
      const similarWords = findSimilarWords(words[i], wordlist)

      for (const similarWord of similarWords) {
        const testWords = [...words]
        testWords[i] = similarWord
        const testPhrase = testWords.join(' ')

        if (bip39.validateMnemonic(testPhrase)) {
          validPhrases.push(testPhrase)
          if (validPhrases.length >= 5) break
        }
      }

      if (validPhrases.length >= 5) break
    }
  }

  if (validPhrases.length === 0) {
    for (let i = 0; i < words.length - 1; i++) {
      const testWords = [...words]
      ;[testWords[i], testWords[i + 1]] = [testWords[i + 1], testWords[i]]
      const testPhrase = testWords.join(' ')

      if (bip39.validateMnemonic(testPhrase)) {
        validPhrases.push(testPhrase)
        if (validPhrases.length >= 3) break
      }
    }
  }

  return validPhrases
}

const validateChecksum = () => {
  const trimmedPhrase = inputSeedPhrase.value.trim()

  if (!trimmedPhrase) {
    validationResult.value = {
      isValid: false,
      message: 'Please enter a seed phrase to validate',
      wordCount: 0,
      details: [],
      invalidWordIndices: [],
      words: [],
      wordSuggestions: new Map(),
      checksumExplanation: '',
      fixSuggestions: [],
      autoFixedPhrases: [],
    }
    return
  }

  const words = trimmedPhrase.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length

  const validWordCounts = [12, 15, 18, 21, 24]
  if (!validWordCounts.includes(wordCount)) {
    validationResult.value = {
      isValid: false,
      message: `Invalid word count: ${wordCount}. BIP39 requires 12, 15, 18, 21, or 24 words.`,
      wordCount,
      details: [
        `Found ${wordCount} words`,
        `BIP39 valid word counts: ${validWordCounts.join(', ')}`,
      ],
      invalidWordIndices: [],
      words: words,
      wordSuggestions: new Map(),
      checksumExplanation: '',
      fixSuggestions: [],
      autoFixedPhrases: [],
    }
    return
  }

  const isValid = bip39.validateMnemonic(trimmedPhrase)

  const details: string[] = [
    `Word count: ${wordCount}`,
    `Entropy bits: ${(wordCount / 3) * 32}`,
    `Checksum: ${isValid ? 'Valid ✓' : 'Invalid ✗'}`,
  ]

  const invalidWordIndices: number[] = []
  const wordSuggestions = new Map<number, string[]>()

  if (isValid) {
    validationResult.value = {
      isValid: true,
      message: 'Seed phrase checksum is valid!',
      wordCount,
      details,
      invalidWordIndices: [],
      words: words,
      wordSuggestions: new Map(),
      checksumExplanation: '',
      fixSuggestions: [],
      autoFixedPhrases: [],
    }
  } else {
    const invalidWords: string[] = []

    try {
      const wordlist = bip39.wordlists.english || bip39.wordlists['english']
      if (wordlist) {
        words.forEach((word, index) => {
          if (!wordlist.includes(word)) {
            invalidWordIndices.push(index)
            invalidWords.push(`Word ${index + 1} "${word}" is not in BIP39 wordlist`)

            const suggestions = findSimilarWords(word, wordlist)
            if (suggestions.length > 0) {
              wordSuggestions.set(index, suggestions)
            }
          }
        })
      }
    } catch {
      /* Wordlist check failed, continue without it */
    }

    let checksumExplanation = ''
    const fixSuggestions: string[] = []
    let autoFixedPhrases: string[] = []

    if (invalidWords.length > 0) {
      details.push(...invalidWords)
      checksumExplanation = 'The checksum failed because one or more words are not in the BIP39 wordlist. BIP39 seed phrases use a checksum derived from the entropy, and only valid BIP39 words can produce a valid checksum.'
      fixSuggestions.push('Replace the invalid words highlighted in red with the suggested replacements below')
      fixSuggestions.push('Double-check the spelling of each word against the BIP39 wordlist')
      fixSuggestions.push('Ensure words are separated by single spaces')
    } else {
      details.push('All words appear to be valid BIP39 words, but checksum validation failed')
      details.push('This usually means one or more words are incorrect')
      checksumExplanation = "The checksum failed even though all words are valid BIP39 words. This happens when one or more words in your seed phrase are incorrect but happen to be valid BIP39 words (e.g., typing 'word' instead of 'wood'). The BIP39 checksum is calculated from the entropy encoded in the words, and a single wrong word will cause the checksum validation to fail."
      fixSuggestions.push('Review the auto-generated valid seed phrases below that are similar to your input')
      fixSuggestions.push('Carefully compare each word in your seed phrase with your original backup')
      fixSuggestions.push('Check for common typos: similar-looking letters (e/i, o/a, u/n), swapped letters, or extra/missing characters')
      fixSuggestions.push('Verify the word order is correct - words must be in the exact order they were generated')

      autoFixedPhrases = findChecksumFixedPhrases(words)
    }

    validationResult.value = {
      isValid: false,
      message: 'Seed phrase checksum is invalid',
      wordCount,
      details,
      invalidWordIndices: invalidWordIndices,
      words: words,
      wordSuggestions: wordSuggestions,
      checksumExplanation: checksumExplanation,
      fixSuggestions: fixSuggestions,
      autoFixedPhrases: autoFixedPhrases,
    }
  }
}

const handleReplaceWord = (index: number, replacement: string) => {
  const currentWords = inputSeedPhrase.value.trim().split(/\s+/).filter(word => word.length > 0)
  currentWords[index] = replacement
  const newPhrase = currentWords.join(' ')
  inputSeedPhrase.value = newPhrase
  emit('update:seedPhrase', newPhrase)
}

const handleUseFixedPhrase = (phrase: string) => {
  inputSeedPhrase.value = phrase
  emit('update:seedPhrase', phrase)
}

const cleanSeedPhraseInput = (input: string): string => {
  return input
    .replace(/[^a-zA-Z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  const cleaned = cleanSeedPhraseInput(target.value)
  inputSeedPhrase.value = cleaned
}

const hasInvalidWordsWithSuggestions = computed(() => {
  return (
    !validationResult.value.isValid &&
    validationResult.value.isValid !== null &&
    (validationResult.value.invalidWordIndices.length > 0 ||
      validationResult.value.checksumExplanation ||
      validationResult.value.autoFixedPhrases.length > 0)
  )
})
</script>

<style scoped>
.mnp-checksum-suggestions-scroll::-webkit-scrollbar {
  width: 8px;
}

.mnp-checksum-suggestions-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.mnp-checksum-suggestions-scroll::-webkit-scrollbar-thumb {
  background: rgb(156 163 175 / 0.5);
  border-radius: 4px;
}
</style>
