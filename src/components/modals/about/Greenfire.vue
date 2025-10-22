<template>
  <div class="w-full min-h-0 container flex flex-col">
    <div class="about-section row px-20 flex-grow">
      <div class="col flex flex-col justify-center">
        <div class="mb-2">
          <label class="font-semibold">{{ tAbout('greenfireManagement') }}: </label>
          <ul class="ml-4">
            <li>Corey S.</li>
            <li>Nicole L.</li>
            <li>Uzma B.</li>
          </ul>
        </div>
        <div class="mb-2">
          <label class="font-semibold">{{ tAbout('developers') }}: </label>
          <ul class="ml-4">
            <li>Aciel O.</li>
            <li>Tim R.</li>
          </ul>
        </div>
        <div class="mb-2">
          <label class="font-semibold">{{ tAbout('specialThanksTo') }}: </label>
          <ul class="ml-4">
            <li>{{ tAbout('pastDevelopers') }}</li>
            <li>{{ tAbout('pastGraphicDesigners') }}</li>
          </ul>
        </div>
      </div>
      <div class="col center-content">
        <img
          src="/assets/icons/greenfire/greenfire.svg"
          class="logo"
          :alt="tAbout('greenfireLogo')"
        />
      </div>
    </div>
    <div class="footer flex-shrink-0">
      <a
        v-for="link of links"
        :key="link.name + '-link'"
        class="footer-link"
        :href="link.url"
        target="_blank"
        >{{ getTranslatedLinkName(link.name) }}</a
      >
    </div>
  </div>
</template>

<script>
import { useUnifiedTranslations } from '@/composables/useUnifiedTranslations'

const link = (name, url) => ({ name, url })

export default {
  name: 'AboutGreenfire',
  setup() {
    const { tAbout } = useUnifiedTranslations()
    return { tAbout }
  },
  data: () => ({
    links: [
      link('Website', 'https://www.greenfire.io'),
      link('Twitter', 'https://twitter.com/greenfire_io'),
      link('Instagram', 'https://www.instagram.com/greenfire.io'),
      link('LinkedIn', 'https://www.linkedin.com/company/greenfire-inc'),
      link('Keybase', 'https://keybase.io/team/greenfire'),
      link('Github', 'https://github.com/greenfireinc'),
      link('Medium', '#')
    ]
  }),
  methods: {
    getTranslatedLinkName(name) {
      const linkTranslations = {
        'Website': this.tAbout('website'),
        'Twitter': this.tAbout('twitter'),
        'Instagram': this.tAbout('instagram'),
        'LinkedIn': this.tAbout('linkedin'),
        'Keybase': this.tAbout('keybase'),
        'Github': this.tAbout('github'),
        'Medium': this.tAbout('medium')
      }
      return linkTranslations[name] || name
    }
  }
}
</script>

<style lang="scss" scoped>
.about-section {
  /* height: calc(100% - 1.5rem); */
}

.footer {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1.5rem;

  .footer-link {
    color: var(--color-green-600);
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    &:not(:last-child) {
      border-right: 1px solid #1d1d1d;
    }
  }
}

.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
}

.logo {
  max-width: 14rem;
  height: auto;
  width: 70%;
}
</style> 