<template>
  <div>
    <div class="eula_d">
      <div
        class="eula_p p-1 bg-white my-2 mx-2 overflow-y-auto"
        v-html="eula.content"
      />
    </div>
    <button
      type="submit"
      v-text="activeMode"
      v-ripple="'rgba(255, 255, 255, .15)'"
      class="py-4 px-4 m-0 text-center bg-green-500 w-full text-white"
      @click="confirmEULA()"
    />
  </div>
</template>
<script>
import eula from '@/assets/eula/eulaLineBreaksBR.json'

export default {
  data: () => ({
    eula,
    eulaDisplayed: false,
    activeMode: 'Next'
  }),
  methods: {
    confirmEULA() {
      this.$emit('displayMnemonicNext')
    }
  },
  mounted() {
    // mounted placeholder
  }
}
</script>
<style lang="scss" scoped>
.eula_p {
  height: 38vh;
  margin: 10px auto;
  // font-family: "Nunito Sans", Arial, Helvetica, sans-serif;
  font-size: 1em;
  color: #888;
}

// .eula_next_p {
//   margin: 15px auto;
//   height: 100%;
//   text-align: center;
//   font-weight: bold;
//   background-color: green;
//   font-family: "Nunito Sans", Arial, Helvetica, sans-serif;
//   font-size: 1.2em;
//   color: white;
// }

.eula_d {
  margin: auto;
  width: 100%;
  border: 0.5px solid green;
  padding: 10px;
}
</style>
