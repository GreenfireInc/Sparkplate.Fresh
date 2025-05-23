<!-- <script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>views/Home.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>  -->

<template>
    <div class="view home">
      <div class="content">
        <div class="flex-center">
          <a href="https://www.electronjs.org/" target="_blank">
            <img
              src="/assets/icons/electron.svg"
              class="logo electron"
              alt="Electron logo"
            />
          </a>
          <a href="https://vitejs.dev/" target="_blank">
            <img src="/assets/icons/vite.svg" class="logo" alt="Vite logo" />
          </a>
          <a href="https://vuejs.org/" target="_blank">
            <img src="/assets/icons/vue.svg" class="logo vue" alt="Vue logo" />
          </a>
        </div>
  
        <div class="flex-center">
          <a href="http://greenfire.io/" target="_blank">
            <img
              src="/assets/icons/greenfire.svg"
              class="logo Greenfire"
              alt="Greenfire logo"
            />
          </a>
        </div>
        <hello-world msg="Electron + Vite + Vue" />
  
        <div class="flex-center">
          Place static files into the <code>/public</code> folder
          <img style="width: 5em" src="/assets/icons/node.svg" alt="Node logo" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import HelloWorld from '../components/HelloWorld.vue'
  
  export default {
    name: 'HomeView',
    components: { HelloWorld }
  }
  </script>
  
  <style lang="scss" scoped>
  #app .home {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100%;
  
    .content {
      max-width: 1028px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
  }
  
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .logo {
    height: 8rem;
    padding: 1.5rem;
    will-change: filter;
    transition: filter 300ms;
  }
  
  .logo.electron:hover {
    filter: drop-shadow(0 0 2rem #9feaf9);
  }
  
  .logo:hover {
    filter: drop-shadow(0 0 2rem #646cffaa);
  }
  
  .logo.vue:hover {
    filter: drop-shadow(0 0 2rem #42b883aa);
  }
  
  code {
    background-color: #f9f9f9;
    padding: 2px 4px;
    margin: 0 4px;
    border-radius: 4px;
  }
  </style>
  