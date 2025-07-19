<template>
  <div class="universe-container">
    <h3 class="text-lg font-semibold text-center mb-4">Greenfire Universe</h3>
    
    <div class="projects-grid">
      <!-- Greenfire -->
      <div class="project-card" @click="openUrl('https://greenfire.io')">
        <div class="logo-container">
          <img src="/assets/icons/greenfire/greenfire.svg" alt="Greenfire Logo" class="project-logo" />
        </div>
        <div class="project-info">
          <h4 class="project-title">Greenfire</h4>
          <p class="project-description">Bridging the cryptocurrency ecosystem with the real world</p>
          <div class="project-url">https://greenfire.io</div>
        </div>
      </div>
      
      <!-- Greenery -->
      <div class="project-card" @click="openUrl('https://greenery.finance')">
        <div class="logo-container">
          <img src="/assets/icons/greenfire/greenery.svg" alt="Greenery Logo" class="project-logo" />
        </div>
        <div class="project-info">
          <h4 class="project-title">Greenery</h4>
          <p class="project-description">A cryptocurrency bookkeeping and accounting wallet</p>
          <div class="project-url">https://greenery.finance</div>
        </div>
      </div>
      
      <!-- Techmarkets -->
      <div class="project-card" @click="openUrl('https://techmarkets.io')">
        <div class="logo-container">
          <img src="/assets/icons/greenfire/greenfire.svg" alt="Techmarkets Logo" class="project-logo" />
        </div>
        <div class="project-info">
          <h4 class="project-title">Techmarkets</h4>
          <p class="project-description">A marketplace to buy and sell electronics with crypto</p>
          <div class="project-url">https://techmarkets.io</div>
        </div>
      </div>
      
      <!-- Redacted -->
      <div class="project-card redacted">
        <div class="logo-container">
          <div class="redacted-logo">?</div>
        </div>
        <div class="project-info">
          <h4 class="project-title">*Redacted*</h4>
          <p class="project-description">Coming soon...</p>
          <div class="project-url">*Redacted*</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UniverseView',
  methods: {
    openUrl(url) {
      // Use electron shell to open external URL
      if (window.shell) {
        window.shell.openExternal(url);
      } else if (window.open) {
        window.open(url, '_blank');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.universe-container {
  padding: 0.5rem 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

h3 {
  margin-bottom: 0.75rem !important;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  flex: 1;
  margin-top: 0.5rem;
}

.project-card {
  display: flex;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #5cba47;
  }
  
  &.redacted {
    opacity: 0.7;
    cursor: default;
    
    &:hover {
      box-shadow: none;
      transform: none;
      border-color: #e5e5e5;
    }
  }
}

.logo-container {
  flex: 0 0 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.25rem;
}

.project-logo {
  width: 40px;
  height: 40px;
}

.redacted-logo {
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: #999;
}

.project-info {
  flex: 1;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Allows text truncation to work */
}

.project-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.project-description {
  font-size: 0.85rem;
  color: #555;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.project-url {
  font-size: 0.75rem;
  color: #5cba47;
  margin-top: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 