<template>
  <div>
    <img class="logo" src="/icon.png" alt="greenery-logo" />
    <h3 v-if="isSignupOrLogin" class="text-xl text-center">Welcome</h3>
  </div>
</template>
<script>
export default {
  name: 'WelcomeText',
  props: ['mode'],
  computed: {
    isSignupOrLogin() {
      return ['Sign up', 'Login'].includes(this.mode)
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 5rem;
  margin: 0 auto 0.5rem;
}
</style>
