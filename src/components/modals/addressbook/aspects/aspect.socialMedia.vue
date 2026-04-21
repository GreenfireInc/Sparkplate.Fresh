<template>
  <button
    type="button"
    class="cd-links-trigger"
    aria-label="Edit contact info"
    @click="emit('edit-requested')"
  >
    <ul class="cd-links">
      <li class="cd-links__item">
        <Phone :size="14" class="cd-links__icon" />
        <a v-if="contact.phone" :href="`tel:${contact.phone}`" class="cd-links__value" @click.stop>{{ contact.phone }}</a>
        <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
      </li>

      <li class="cd-links__item">
        <MapPinned :size="14" class="cd-links__icon" />
        <span class="cd-links__value" :class="{ 'cd-links__value--empty': !contact.location }">{{ contact.location || 'N/A' }}</span>
      </li>

      <li class="cd-links__item">
        <Mailbox :size="14" class="cd-links__icon" />
        <a v-if="contact.email" :href="`mailto:${contact.email}`" class="cd-links__value" @click.stop>{{ contact.email }}</a>
        <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
      </li>

      <li class="cd-links__item">
        <Globe :size="14" class="cd-links__icon" />
        <a v-if="contact.website" :href="contact.website" target="_blank" class="cd-links__value" @click.stop>{{ contact.website }}</a>
        <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
      </li>

      <li class="cd-links__item">
        <Github :size="14" class="cd-links__icon" />
        <a v-if="contact.github" :href="`https://github.com/${contact.github}`" target="_blank" class="cd-links__value" @click.stop>{{ contact.github }}</a>
        <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
      </li>

      <li class="cd-links__item">
        <Twitter :size="14" class="cd-links__icon" />
        <a v-if="contact.twitter" :href="`https://twitter.com/${contact.twitter}`" target="_blank" class="cd-links__value" @click.stop>@{{ contact.twitter }}</a>
        <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
      </li>

      <li class="cd-links__item">
        <Linkedin :size="14" class="cd-links__icon" />
        <a v-if="contact.linkedin" :href="contact.linkedin" target="_blank" class="cd-links__value" @click.stop>{{ contact.linkedin }}</a>
        <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
      </li>

      <li class="cd-links__item">
        <Instagram :size="14" class="cd-links__icon" />
        <a v-if="contact.instagram" :href="`https://instagram.com/${contact.instagram}`" target="_blank" class="cd-links__value" @click.stop>@{{ contact.instagram }}</a>
        <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
      </li>

      <li class="cd-links__item">
        <i class="bi bi-bluesky cd-links__icon cd-links__icon--bs" />
        <a v-if="contact.bluesky" :href="contact.bluesky" target="_blank" class="cd-links__value" @click.stop>{{ contact.bluesky }}</a>
        <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
      </li>

      <li class="cd-links__item">
        <i class="bi bi-telegram cd-links__icon cd-links__icon--bs" />
        <a v-if="contact.telegram" :href="contact.telegram" target="_blank" class="cd-links__value" @click.stop>{{ contact.telegram }}</a>
        <span v-else class="cd-links__value cd-links__value--empty">N/A</span>
      </li>
    </ul>

    <span class="cd-links-trigger__hint">
      <Pencil :size="11" />
      Edit
    </span>
  </button>
</template>

<script setup lang="ts">
import { Phone, MapPinned, Mailbox, Globe, Github, Twitter, Linkedin, Instagram, Pencil } from 'lucide-vue-next'

defineOptions({ name: 'AspectSocialMedia' })

defineProps<{
  contact: Record<string, any>
}>()

const emit = defineEmits<{
  'edit-requested': []
}>()
</script>

<style lang="scss" scoped>
/* Clickable wrapper */
.cd-links-trigger {
  display: block;
  width: 100%;
  margin-top: 0.875rem;
  padding: 0.5rem 0.5rem 0.375rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s, border-color 0.12s;
  position: relative;

  &:hover {
    background: rgba(37, 99, 235, 0.04);
    border-color: #dbeafe;

    .cd-links-trigger__hint { opacity: 1; }
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
}

.cd-links-trigger__hint {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.4rem;
  font-size: 0.6875rem;
  font-weight: 500;
  color: #2563eb;
  opacity: 0;
  transition: opacity 0.12s;
}

/* Links list */
.cd-links {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cd-links__item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  min-width: 0;
}

.cd-links__icon {
  flex-shrink: 0;
  color: #6b7280;
}

.cd-links__icon--bs {
  width: 14px;
  height: 14px;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
}

.cd-links__value {
  color: #374151;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &[href]:hover { text-decoration: underline; color: #2563eb; }
}

.cd-links__value--empty {
  color: #9ca3af;
}
</style>
