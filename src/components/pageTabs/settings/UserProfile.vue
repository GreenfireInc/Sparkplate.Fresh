<template>
  <div class="user-profile -mt-8">
    <DomainsAndSocialMedia
      ref="domainsModal"
      @save="handleDomainsModalSave"
    />
    <div class="user-profile-header">
      <h2 class="user-profile-title">{{ t('userProfile') }}</h2>
      <button type="button" class="user-profile-save-btn">{{ t('saveChanges') }}</button>
    </div>

    <div class="user-profile-grid">
      <!-- Column 1 -->
      <div class="user-profile-col">
        <div class="user-profile-field">
          <Label for="profile-firstName" class="user-profile-label">{{ t('firstName') }}</Label>
          <input
            id="profile-firstName"
            v-model="profile.firstName"
            type="text"
            class="user-profile-input"
            :placeholder="t('enterFirstName')"
          />
        </div>
        <div class="user-profile-field">
          <Label for="profile-company" class="user-profile-label">{{ t('company') }}</Label>
          <input
            id="profile-company"
            v-model="profile.company"
            type="text"
            class="user-profile-input"
            :placeholder="t('enterCompanyName')"
          />
        </div>
        <div class="user-profile-field">
          <Label
            for="profile-domains"
            class="user-profile-label user-profile-label--clickable"
            @click="showDomainsModal('domains')"
          >
            {{ t('humanReadableDomains') }} <span class="user-profile-label-hint">{{ t('clickToEdit') }}</span>
          </Label>
          <input
            id="profile-domains"
            v-model="profile.domains"
            type="text"
            class="user-profile-input user-profile-input--disabled"
            :placeholder="t('domainsPlaceholder')"
            disabled
            @click="showDomainsModal('domains')"
          />
        </div>
      </div>

      <!-- Column 2 -->
      <div class="user-profile-col">
        <div class="user-profile-field">
          <Label for="profile-lastName" class="user-profile-label">{{ t('lastName') }}</Label>
          <input
            id="profile-lastName"
            v-model="profile.lastName"
            type="text"
            class="user-profile-input"
            :placeholder="t('enterLastName')"
          />
        </div>
        <div class="user-profile-field">
          <Label for="profile-website" class="user-profile-label">Website</Label>
          <input
            id="profile-website"
            v-model="profile.website"
            type="text"
            class="user-profile-input"
            :placeholder="t('websitePlaceholder')"
          />
        </div>
        <div class="user-profile-field">
          <Label
            for="profile-social"
            class="user-profile-label user-profile-label--clickable"
            @click="showDomainsModal('social')"
          >
            {{ t('socialMediaPresence') }} <span class="user-profile-label-hint">{{ t('clickToEdit') }}</span>
          </Label>
          <input
            id="profile-social"
            v-model="profile.website"
            type="text"
            class="user-profile-input user-profile-input--disabled"
            :placeholder="t('socialPlaceholder')"
            disabled
            @click="showDomainsModal('social')"
          />
        </div>
      </div>

      <!-- Column 3 -->
      <div class="user-profile-col">
        <div class="user-profile-field">
          <Label for="profile-email" class="user-profile-label">{{ t('email') }}</Label>
          <input
            id="profile-email"
            v-model="profile.email"
            type="email"
            class="user-profile-input"
            :placeholder="t('enterEmail')"
          />
        </div>
        <div class="user-profile-field">
          <Label for="profile-language" class="user-profile-label">{{ t('defaultLanguage') }}</Label>
          <SelectRoot v-model="profile.language" @update:model-value="handleLanguageChange">
            <SelectTrigger
              id="profile-language"
              class="user-profile-select-trigger"
              aria-label="Default language"
            >
              <SelectValue :placeholder="t('defaultLanguage')" />
              <i class="bi bi-chevron-down user-profile-select-chevron" aria-hidden />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent class="user-profile-select-content" position="popper" :side-offset="4">
                <SelectViewport class="user-profile-select-viewport">
                  <SelectItem
                    v-for="lang in languages"
                    :key="lang.code"
                    :value="lang.code"
                    class="user-profile-select-item"
                  >
                    <SelectItemText>{{ lang.flag }} {{ lang.name }}</SelectItemText>
                  </SelectItem>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>
        <div class="user-profile-field">
          <Label for="profile-currency" class="user-profile-label">{{ t('defaultCurrency') }}</Label>
          <SelectRoot v-model="profile.currency">
            <SelectTrigger
              id="profile-currency"
              class="user-profile-select-trigger"
              aria-label="Default currency"
            >
              <SelectValue :placeholder="t('defaultCurrency')" />
              <i class="bi bi-chevron-down user-profile-select-chevron" aria-hidden />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent class="user-profile-select-content" position="popper" :side-offset="4">
                <SelectViewport class="user-profile-select-viewport">
                  <SelectItem value="USD" class="user-profile-select-item">
                    <SelectItemText>🇺🇸 USD ($)</SelectItemText>
                  </SelectItem>
                  <SelectItem value="EUR" class="user-profile-select-item">
                    <SelectItemText>🇪🇺 EUR (€)</SelectItemText>
                  </SelectItem>
                  <SelectItem value="GBP" class="user-profile-select-item">
                    <SelectItemText>🇬🇧 GBP (£)</SelectItemText>
                  </SelectItem>
                  <SelectItem value="JPY" class="user-profile-select-item">
                    <SelectItemText>🇯🇵 JPY (¥)</SelectItemText>
                  </SelectItem>
                  <SelectItem value="CNY" class="user-profile-select-item">
                    <SelectItemText>🇨🇳 CNY (¥)</SelectItemText>
                  </SelectItem>
                  <SelectItem value="BRL" class="user-profile-select-item">
                    <SelectItemText>🇧🇷 BRL (R$)</SelectItemText>
                  </SelectItem>
                  <SelectItem value="CAD" class="user-profile-select-item">
                    <SelectItemText>🇨🇦 CAD ($)</SelectItemText>
                  </SelectItem>
                  <SelectItem value="RUB" class="user-profile-select-item">
                    <SelectItemText>🇷🇺 RUB (₽)</SelectItemText>
                  </SelectItem>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>
      </div>
    </div>

    <div class="user-profile-field user-profile-field--bio">
      <Label for="profile-bio" class="user-profile-label">{{ t('bio') }}</Label>
      <textarea
        id="profile-bio"
        v-model="profile.bio"
        class="user-profile-textarea"
        rows="2"
        :placeholder="t('tellUsAboutYourself')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Label,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectValue,
  SelectPortal,
  SelectViewport,
} from 'radix-vue'
import DomainsAndSocialMedia from '@/components/modals/settings/userprofile/DomainsAndSocialMedia.vue'
import { useI18n } from '@/composables/useI18n'
import { useAuth } from '@/composables/useAuth'

const { locale, setLocale, languages, t } = useI18n()
const { currentUser } = useAuth()

const profile = ref({
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  domains: '',
  language: locale.value,
  currency: 'USD',
  twitter: '',
  instagram: '',
  linkedin: '',
  github: '',
  website: '',
  bio: '',
})

// Sync firstName, lastName, email from currentUser when user logs in
function syncFromCurrentUser() {
  const user = currentUser.value
  if (user) {
    const parts = (user.name || '').trim().split(/\s+/)
    profile.value.firstName = parts[0] || ''
    profile.value.lastName = parts.slice(1).join(' ') || ''
    profile.value.email = user.email || ''
  } else {
    profile.value.firstName = ''
    profile.value.lastName = ''
    profile.value.email = ''
  }
}

watch(currentUser, syncFromCurrentUser, { immediate: true })

function handleLanguageChange() {
  setLocale(profile.value.language)
}

const domainsModal = ref<InstanceType<typeof DomainsAndSocialMedia> | null>(null)

function showDomainsModal(activeTab: string) {
  if (domainsModal.value) {
    domainsModal.value.activeMode = activeTab
    domainsModal.value.showModal()
  }
}

function handleDomainsModalSave(data: { domains?: Record<string, string>; social?: Record<string, string> }) {
  if (data.domains) {
    const domainsList = Object.values(data.domains).filter(Boolean)
    profile.value.domains = domainsList.join(', ')
  }
  if (data.social) {
    profile.value.twitter = data.social.twitter || ''
    profile.value.instagram = data.social.instagram || ''
    profile.value.linkedin = data.social.linkedin || ''
    profile.value.github = data.social.github || ''
    const socialList = Object.entries(data.social)
      .filter(([, value]) => value)
      .map(([key]) => key)
    profile.value.website = socialList.length ? socialList.join(', ') : ''
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
  width: 100%;
}

.user-profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.user-profile-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.user-profile-save-btn {
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.2s;
}

.user-profile-save-btn:hover {
  background: #16a34a;
}

.user-profile-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem 1rem;
}

@media (min-width: 768px) {
  .user-profile-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.user-profile-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.user-profile-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-profile-field--bio {
  margin-top: 0.75rem;
}

.user-profile-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
}

.user-profile-label--clickable {
  cursor: pointer;
}

.user-profile-label--clickable:hover {
  color: #2563eb;
}

.user-profile-label-hint {
  font-size: 0.75rem;
  color: #2563eb;
  margin-left: 0.25rem;
}

.user-profile-input,
.user-profile-textarea {
  width: 100%;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.user-profile-input:focus,
.user-profile-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.user-profile-input::placeholder,
.user-profile-textarea::placeholder {
  color: #9ca3af;
}

.user-profile-input--disabled {
  background: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
}

.user-profile-textarea {
  resize: vertical;
  min-height: 2.5rem;
}

.user-profile-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.user-profile-select-trigger:hover {
  border-color: #9ca3af;
}

.user-profile-select-trigger:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.user-profile-select-chevron {
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>

<style>
/* Unscoped: SelectContent portals to body */
.user-profile-select-content {
  min-width: var(--radix-select-trigger-width);
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 4px 10px -3px rgba(0, 0, 0, 0.07);
  padding: 0.25rem;
  z-index: 10001;
}

.user-profile-select-viewport {
  max-height: 200px;
  overflow-y: auto;
}

.user-profile-select-item {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
}

.user-profile-select-item:hover,
.user-profile-select-item[data-highlighted] {
  background: #f3f4f6;
  color: #1f2937;
}
</style>
