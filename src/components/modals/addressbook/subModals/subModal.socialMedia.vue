<template>
  <DialogRoot :open="show" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="sm-overlay" />
      <DialogContent
        class="sm-modal"
        data-stacked-modal="social-media"
        :aria-describedby="undefined"
      >
        <!-- Header -->
        <div class="sm-header">
          <div class="sm-header__row">
            <DialogTitle class="sm-header__title">Edit Contact Info</DialogTitle>
            <DialogClose class="sm-header__close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="sm-separator" />

        <!-- Body: 2-column rectangle -->
        <div class="sm-body">

          <!-- Left: Bio -->
          <div class="sm-col sm-col--bio">
            <span class="sm-col__heading">Bio</span>
            <textarea
              id="sm-bio"
              v-model="draft.bio"
              placeholder="Write a short bio…"
              class="sm-textarea"
              rows="8"
            />
          </div>

          <div class="sm-divider" aria-hidden="true" />

          <!-- Right: links (split into General / Social tabs) -->
          <div class="sm-col sm-col--links">
            <TabsRoot v-model="activeTab" class="sm-tabs">
              <TabsList class="sm-tabs__list" aria-label="Contact info sections">
                <TabsTrigger value="general" class="sm-tabs__trigger">General</TabsTrigger>
                <TabsTrigger value="social" class="sm-tabs__trigger">Social</TabsTrigger>
              </TabsList>

              <!-- General: company / phone / email / website / location -->
              <TabsContent value="general" class="sm-tabs__panel">
                <div class="sm-fields">

                  <!-- Company (solo, full-width — populates the Company column on `tab.addressBook.Contact.vue`) -->
                  <div class="sm-field-row">
                    <div class="sm-field">
                      <label class="sm-label" for="sm-company">
                        <Building2 :size="12" class="sm-label__icon" /> Company
                      </label>
                      <input id="sm-company" type="text" v-model="draft.company" placeholder="Company name" autocomplete="organization" class="sm-input" />
                    </div>
                  </div>

                  <!-- Phone | Email -->
                  <div class="sm-field-row">
                    <div class="sm-field">
                      <label class="sm-label" for="sm-phone">
                        <Phone :size="12" class="sm-label__icon" /> Phone
                      </label>
                      <input id="sm-phone" type="tel" v-model="draft.phone" placeholder="Phone number" class="sm-input" />
                    </div>
                    <div class="sm-field">
                      <label class="sm-label" for="sm-email">
                        <Mailbox :size="12" class="sm-label__icon" /> Email
                      </label>
                      <input id="sm-email" type="email" v-model="draft.email" placeholder="Email address" class="sm-input" />
                    </div>
                  </div>

                  <!-- Website | Location -->
                  <div class="sm-field-row">
                    <div class="sm-field">
                      <label class="sm-label" for="sm-website">
                        <Globe :size="12" class="sm-label__icon" /> Website
                      </label>
                      <input id="sm-website" type="url" v-model="draft.website" placeholder="https://example.com" class="sm-input" />
                    </div>
                    <div class="sm-field">
                      <label class="sm-label" for="sm-location">
                        <MapPinned :size="12" class="sm-label__icon" /> Location
                      </label>
                      <input id="sm-location" type="text" v-model="draft.location" placeholder="City, Country" class="sm-input" />
                    </div>
                  </div>

                </div>
              </TabsContent>

              <!-- Social: GitHub / Telegram / Twitter / Instagram / LinkedIn / Bluesky -->
              <TabsContent value="social" class="sm-tabs__panel">
                <div class="sm-fields">

                  <!-- GitHub | Telegram -->
                  <div class="sm-field-row">
                    <div class="sm-field">
                      <label class="sm-label" for="sm-github">
                        <Github :size="12" class="sm-label__icon" /> GitHub
                      </label>
                      <div class="sm-input-affixed">
                        <span class="sm-input-affixed__prefix">github.com/</span>
                        <input id="sm-github" type="text" v-model="draft.github" placeholder="username" class="sm-input sm-input--affixed" />
                      </div>
                    </div>
                    <div class="sm-field">
                      <label class="sm-label" for="sm-telegram">
                        <i class="bi bi-telegram sm-label__icon sm-label__icon--bs" />
                        Telegram
                      </label>
                      <input id="sm-telegram" type="url" v-model="draft.telegram" placeholder="https://t.me/…" class="sm-input" />
                    </div>
                  </div>

                  <!-- Twitter | Instagram -->
                  <div class="sm-field-row">
                    <div class="sm-field">
                      <label class="sm-label" for="sm-twitter">
                        <Twitter :size="12" class="sm-label__icon" /> Twitter / X
                      </label>
                      <div class="sm-input-affixed">
                        <span class="sm-input-affixed__prefix">@</span>
                        <input id="sm-twitter" type="text" v-model="draft.twitter" placeholder="handle" class="sm-input sm-input--affixed" />
                      </div>
                    </div>
                    <div class="sm-field">
                      <label class="sm-label" for="sm-instagram">
                        <Instagram :size="12" class="sm-label__icon" /> Instagram
                      </label>
                      <div class="sm-input-affixed">
                        <span class="sm-input-affixed__prefix">@</span>
                        <input id="sm-instagram" type="text" v-model="draft.instagram" placeholder="handle" class="sm-input sm-input--affixed" />
                      </div>
                    </div>
                  </div>

                  <!-- LinkedIn | Bluesky -->
                  <div class="sm-field-row">
                    <div class="sm-field">
                      <label class="sm-label" for="sm-linkedin">
                        <Linkedin :size="12" class="sm-label__icon" /> LinkedIn
                      </label>
                      <input id="sm-linkedin" type="url" v-model="draft.linkedin" placeholder="https://linkedin.com/in/…" class="sm-input" />
                    </div>
                    <div class="sm-field">
                      <label class="sm-label" for="sm-bluesky">
                        <i class="bi bi-bluesky sm-label__icon sm-label__icon--bs" />
                        Bluesky
                      </label>
                      <input id="sm-bluesky" type="url" v-model="draft.bluesky" placeholder="https://bsky.app/profile/…" class="sm-input" />
                    </div>
                  </div>

                </div>
              </TabsContent>
            </TabsRoot>
          </div>
        </div>

        <Separator class="sm-separator" />

        <!-- Footer -->
        <div class="sm-footer">
          <button type="button" class="sm-btn sm-btn--ghost" @click="cancel">Cancel</button>
          <button type="button" class="sm-btn sm-btn--primary" @click="save">Save</button>
        </div>

      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import {
  DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogClose,
  Separator,
  TabsRoot, TabsList, TabsTrigger, TabsContent,
} from 'radix-vue'
import { Phone, MapPinned, Mailbox, Globe, Github, Twitter, Linkedin, Instagram, Building2 } from 'lucide-vue-next'

defineOptions({ name: 'SubModalSocialMedia' })

interface ContactInfoFields {
  bio?: string
  /** Top-level Contact column shown in `tab.addressBook.Contact.vue`'s Company header. */
  company?: string
  phone?: string
  location?: string
  email?: string
  website?: string
  github?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  bluesky?: string
  telegram?: string
}

const props = defineProps<{
  show: boolean
  contact: Record<string, any>
}>()

const emit = defineEmits<{
  close: []
  save: [fields: ContactInfoFields]
}>()

const draft = reactive<ContactInfoFields>({})
const activeTab = ref<'general' | 'social'>('general')

function syncDraft() {
  draft.bio      = props.contact.bio      ?? ''
  draft.company  = props.contact.company  ?? ''
  draft.phone    = props.contact.phone    ?? ''
  draft.location = props.contact.location ?? ''
  draft.email    = props.contact.email    ?? ''
  draft.website  = props.contact.website  ?? ''
  draft.github   = props.contact.github   ?? ''
  draft.twitter  = props.contact.twitter  ?? ''
  draft.linkedin = props.contact.linkedin ?? ''
  draft.instagram = props.contact.instagram ?? ''
  draft.bluesky  = props.contact.bluesky  ?? ''
  draft.telegram = props.contact.telegram ?? ''
}

watch(() => props.show, (open) => {
  if (open) {
    syncDraft()
    activeTab.value = 'general'
  }
}, { immediate: true })

function onDialogOpen(open: boolean) { if (!open) emit('close') }
function cancel() { emit('close') }
function save() {
  emit('save', { ...draft })
  emit('close')
}
</script>

<style lang="scss" scoped>
/* ── Overlay ─────────────────────────────────────────────── */
.sm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 10070;
  animation: sm-fade 0.15s ease;
}

@keyframes sm-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Modal shell — landscape rectangle ───────────────────── */
.sm-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10071;
  width: min(95vw, 52rem);
  max-height: 88vh;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: sm-pop 0.18s ease;
}

@keyframes sm-pop {
  from { opacity: 0; transform: translate(-50%, -48%); }
  to   { opacity: 1; transform: translate(-50%, -50%); }
}

/* ── Header ──────────────────────────────────────────────── */
.sm-header {
  padding: 0.875rem 1.25rem 0.75rem;
  flex-shrink: 0;
}

.sm-header__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.5rem;
}

.sm-header__title {
  flex: 1;
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: #111827;
}

.sm-header__close {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: #f3f4f6;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #6b7280;
  transition: background 0.12s, color 0.12s;

  svg { width: 1rem; height: 1rem; }
  &:hover { background: #e5e7eb; color: #111827; }
}

/* ── Separator ───────────────────────────────────────────── */
.sm-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
}

/* ── Body: side-by-side columns ──────────────────────────── */
.sm-body {
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
}

.sm-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.125rem 1.25rem;
  overflow-y: auto;
}

.sm-col--bio {
  flex: 0 0 38%;
}

.sm-col--links {
  flex: 1;
}

.sm-col__heading {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 0.25rem;
}

.sm-divider {
  width: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
  align-self: stretch;
}

/* ── Bio textarea ────────────────────────────────────────── */
.sm-textarea {
  flex: 1;
  width: 100%;
  padding: 0.55rem 0.65rem;
  font-size: 0.8125rem;
  color: #1f2937;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-family: inherit;
  resize: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
  min-height: 8rem;

  &::placeholder { color: #9ca3af; }
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
}

/* ── Tabs (General / Social) ─────────────────────────────── */
.sm-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
  min-height: 0;
}

.sm-tabs__list {
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.sm-tabs__trigger {
  padding: 0.4rem 0.875rem;
  border: none;
  background: none;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  transition: color 0.12s;
  font-family: inherit;

  &:hover { color: #111827; }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: #2563eb;
      border-radius: 1px;
    }
  }
}

.sm-tabs__panel {
  outline: none;
  /* Reserve enough vertical space to fit the larger "Social" tab (3 field rows)
     so switching between General (2 rows) and Social doesn't change the modal's
     overall height. */
  min-height: 12rem;
}

/* ── Link fields ─────────────────────────────────────────── */
.sm-fields {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.sm-field-row {
  display: flex;
  gap: 0.75rem;

  .sm-field { flex: 1; }
}

.sm-field {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.sm-label {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6b7280;
}

.sm-label__icon {
  flex-shrink: 0;
  color: #9ca3af;
}

.sm-label__icon--bs {
  width: 12px;
  height: 12px;
  font-size: 12px;
  line-height: 1;
  display: flex;
  align-items: center;
}

.sm-input {
  width: 100%;
  padding: 0.4rem 0.6rem;
  font-size: 0.8125rem;
  color: #1f2937;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;

  &::placeholder { color: #9ca3af; }
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
}

.sm-input--affixed {
  border-radius: 0 0.375rem 0.375rem 0;
  border-left: none;
  flex: 1;
  width: auto;
}

.sm-input-affixed {
  display: flex;
  align-items: stretch;
}

.sm-input-affixed__prefix {
  display: inline-flex;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 0.8125rem;
  color: #6b7280;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-right: none;
  border-radius: 0.375rem 0 0 0.375rem;
  white-space: nowrap;
  user-select: none;
}

/* ── Footer ──────────────────────────────────────────────── */
.sm-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
}

.sm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;
}

.sm-btn--ghost {
  background: transparent;
  border-color: #d1d5db;
  color: #374151;
  &:hover { background: #f3f4f6; }
}

.sm-btn--primary {
  background: #2563eb;
  color: #fff;
  &:hover { background: #1d4ed8; }
}
</style>
