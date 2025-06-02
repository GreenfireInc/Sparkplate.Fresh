<template>
  <div class="view">
    <h1 class="view-name">::Key Files::</h1>
    <div class="d-flex justify-center m-2">
      <img
        src="/assets/icons/greenfire/sparkplate.svg"
        class="logo Greenfire"
        alt="Sparkplate logo"
      />
    </div>
    
    <!-- Tab Navigation -->
    <TabsWrapper class="tabs-container">
      <TabComponent
        :active="activeTab === 'files'"
        :onClick="() => (activeTab = 'files')"
      >
        Files
      </TabComponent>
      <TabComponent
        :active="activeTab === 'folders'"
        :onClick="() => (activeTab = 'folders')"
      >
        Folders
      </TabComponent>
    </TabsWrapper>
    
    <!-- Files Tab Content -->
    <div v-if="activeTab === 'files'" class="tab-content">
      <table class="table">
        <thead class="container">
          <tr class="row">
            <th class="col">No.</th>
            <th class="col">File</th>
            <th class="col">Description</th>
          </tr>
        </thead>
        <tbody class="container">
          <tr class="row">
            <td class="col">1</td>
            <td class="col">./electron-builder.json5</td>
            <td class="col">Electron Build Configuration</td>
          </tr>
          <tr class="row">
            <td class="col">2</td>
            <td class="col">./index.html</td>
            <td class="col">Main HTML Entry Point</td>
          </tr>
          <tr class="row">
            <td class="col">3</td>
            <td class="col">./package.json</td>
            <td class="col">Project Dependencies and Scripts</td>
          </tr>
          <tr class="row">
            <td class="col">4</td>
            <td class="col">./background/index.js</td>
            <td class="col">Electron Background Process Entrypoint</td>
          </tr>
          <tr class="row">
            <td class="col">5</td>
            <td class="col">./src/main.ts</td>
            <td class="col">Vue Renderer Entrypoint</td>
          </tr>
          <tr class="row">
            <td class="col">6</td>
            <td class="col">./src/App.vue</td>
            <td class="col">Main Application Component</td>
          </tr>
          <tr class="row">
            <td class="col">7</td>
            <td class="col">./src/components/global/NavBar.vue</td>
            <td class="col">Top Navigation Header Component</td>
          </tr>
          <tr class="row">
            <td class="col">8</td>
            <td class="col">./src/components/global/SideNav.vue</td>
            <td class="col">Side Navigation Component</td>
          </tr>
          </tbody>
      </table>
    </div>
    
    <!-- Folders Tab Content -->
    <div v-if="activeTab === 'folders'" class="tab-content">
      <table class="table">
        <thead class="container">
          <tr class="row">
            <th class="col">No.</th>
            <th class="col">Folder</th>
            <th class="col">Description</th>
          </tr>
        </thead>
        <tbody class="container">
          <tr class="row">
            <td class="col">1</td>
            <td class="col">./background</td>
            <td class="col">Electron Main Process Code</td>
          </tr>
          <tr class="row">
            <td class="col">2</td>
            <td class="col">./dist_electron</td>
            <td class="col">Output Folder for Electron Builder</td>
          </tr>
          <tr class="row">
            <td class="col">3</td>
            <td class="col">./docs</td>
            <td class="col">Project Documentation (Progress Reports and Reasonings)</td>
          </tr>
          <tr class="row">
            <td class="col">4</td>
            <td class="col">./public</td>
            <td class="col">Static Assets Directory</td>
          </tr>
          <tr class="row">
            <td class="col">5</td>
            <td class="col">./.rules</td>
            <td class="col">Project Documentation and Configuration Rules</td>
          </tr>
          <tr class="row">
            <td class="col">6</td>
            <td class="col">./src/views</td>
            <td class="col">View Components (Pages)</td>
          </tr>
          <tr class="row">
            <td class="col">7</td>
            <td class="col">./src/composables</td>
            <td class="col">Vue Composition API Utilities</td>
          </tr>
          <tr class="row">
            <td class="col">8</td>
            <td class="col">./src/router</td>
            <td class="col">Vue Router Configuration</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TabComponent from '@/components/global/TabComponent.vue'
import TabsWrapper from '@/components/global/TabsWrapper.vue'

export default {
  name: 'KeyFilesPage',
  components: { TabComponent, TabsWrapper },
  data() {
    return {
      activeTab: 'files'
    }
  }
}
</script>

<style scoped>
.view-name {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: left;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.m-2 {
  margin: 0.5rem;
}

.tabs-container {
  margin-bottom: 1.5rem;
  
  :deep(.tabs-wrapper) {
    gap: 0.5rem;
  }
}

.tab-content {
  /* Removed padding-top to close gap with tabs */
}

.table {
  width: 100%;
  border-collapse: collapse;
  /* Removed margin-top to close gap with tabs */
}

.container {
  width: 100%;
}

.row {
  display: table-row;
}

.col {
  display: table-cell;
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
}

.col:first-child {
  width: 3rem;
  text-align: center;
}

.col:nth-child(2) {
  width: 20rem;
}

thead .col {
  font-weight: 600;
  background-color: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
}

tbody .row:hover {
  background-color: #f1f5f9;
}

.logo {
  width: 90px;
  height: auto;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}
</style> 