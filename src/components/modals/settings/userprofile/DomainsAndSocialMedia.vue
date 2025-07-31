<template>
  <Teleport to="body">
    <div 
      v-if="isVisible" 
      class="modal-overlay"
      @click.self="hideModal"
    >
      <div 
        class="modal-content"
        :style="{ 
          width: '800px', 
          height: '550px',
          borderRadius: '1rem'
        }"
      >
        <div class="modal-header">
          <h4 class="h4 font-semibold mb-0">Profile Information</h4>
          <button @click="hideModal" class="close-btn">&times;</button>
        </div>

        <!-- Tab Selection -->
        <TabsWrapper class="tabs-container">
          <TabComponent
            v-for="(name, mode) in modes"
            :key="mode + 'tab'"
            :active="mode === activeMode"
            :onClick="createSetActiveMode(mode)"
          >
            {{ name }}
          </TabComponent>
        </TabsWrapper>

        <!-- Tab Content -->
        <div class="main-content">
          <!-- Human Readable Addresses Tab -->
          <div v-if="activeMode === 'domains'" class="tab-content">
            <div class="grid grid-cols-2 gap-6">
              <!-- First Column -->
              <div class="space-y-4">
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ada Domains</label>
                  <input type="text" v-model="domains.ada" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="example.ada" />
                </div>
                
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ethereum Name Service</label>
                  <input type="text" v-model="domains.ens" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="example.eth" />
                </div>
                
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Solana Name Service</label>
                  <input type="text" v-model="domains.solana" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="example.sol" />
                </div>
                
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tezos Domains</label>
                  <input type="text" v-model="domains.tezos" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="example.tez" />
                </div>
              </div>
              
              <!-- Second Column -->
              <div class="space-y-4">
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">BTC.us</label>
                  <input type="text" v-model="domains.btcus" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="example.btc" />
                </div>
                
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Interchain Name Service</label>
                  <input type="text" v-model="domains.icns" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="example.cosmos" />
                </div>
                
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Terra Name Service</label>
                  <input type="text" v-model="domains.terra" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="example.ust" />
                </div>
                
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Unstoppable Domains</label>
                  <input type="text" v-model="domains.unstoppable" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="example.crypto" />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Social Media Presence Tab -->
          <div v-if="activeMode === 'social'" class="tab-content">
            <div class="grid grid-cols-2 gap-6">
              <!-- First Column -->
              <div class="space-y-4">
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <GithubIcon size="18" class="mr-2" />
                    Github
                  </label>
                  <input type="text" v-model="social.github" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="username" />
                </div>
                
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <LinkedinIcon size="18" class="mr-2" />
                    LinkedIn
                  </label>
                  <input type="text" v-model="social.linkedin" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="username" />
                </div>
                
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Hash size="18" class="mr-2" />
                    TikTok
                  </label>
                  <input type="text" v-model="social.tiktok" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="@username" />
                </div>
                
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <TwitterIcon size="18" class="mr-2" />
                    Twitter/X
                  </label>
                  <input type="text" v-model="social.twitter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="@username" />
                </div>
                
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FileTextIcon size="18" class="mr-2" />
                    Medium
                  </label>
                  <input type="text" v-model="social.medium" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="@username or publication name" />
                </div>
              </div>
              
              <!-- Second Column -->
              <div class="space-y-4">
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <InstagramIcon size="18" class="mr-2" />
                    Instagram
                  </label>
                  <input type="text" v-model="social.instagram" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="username" />
                </div>
                
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MessageCircleIcon size="18" class="mr-2" />
                    Threads
                  </label>
                  <input type="text" v-model="social.threads" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="@username" />
                </div>
                
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <TwitchIcon size="18" class="mr-2" />
                    Twitch
                  </label>
                  <input type="text" v-model="social.twitch" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="username" />
                </div>
                
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <YoutubeIcon size="18" class="mr-2" />
                    YouTube
                  </label>
                  <input type="text" v-model="social.youtube" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="channel name" />
                </div>
                
                <div class="form-group">
                  <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Hash size="18" class="mr-2" />
                    fxHash
                  </label>
                  <input type="text" v-model="social.fxhash" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="username" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer with Save Button -->
        <div class="modal-footer">
          <button 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            @click="saveChanges"
          >
            Save Changes
          </button>
          <button 
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            @click="hideModal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import TabComponent from '@/components/global/TabComponent.vue'
import TabsWrapper from '@/components/global/TabsWrapper.vue'
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon, TwitchIcon, YoutubeIcon, Hash, FileTextIcon, MessageCircleIcon } from 'lucide-vue-next'

export default {
  name: 'DomainsAndSocialMedia',
  components: { 
    TabComponent, 
    TabsWrapper,
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
    TwitchIcon,
    YoutubeIcon,
    Hash,
    FileTextIcon,
    MessageCircleIcon
  },
  data() {
    return {
      activeMode: 'domains',
      modes: {
        domains: 'Human Readable Addresses',
        social: 'Social Media Presence'
      },
      isVisible: false,
      domains: {
        ada: '',
        btcus: '',
        ens: '',
        icns: '',
        solana: '',
        terra: '',
        tezos: '',
        unstoppable: ''
      },
      social: {
        github: '',
        instagram: '',
        linkedin: '',
        medium: '',
        threads: '',
        tiktok: '',
        twitch: '',
        twitter: '',
        fxhash: '',
        youtube: ''
      }
    }
  },
  methods: {
    createSetActiveMode(mode) {
      return () => this.setActiveMode(mode)
    },
    setActiveMode(mode) {
      this.activeMode = mode
    },
    saveChanges() {
      // Emit an event with all the collected data
      this.$emit('save', {
        domains: this.domains,
        social: this.social
      })
      this.hideModal()
    },
    showModal() {
      this.isVisible = true
      this.$emit('opened')
    },
    hideModal() {
      this.isVisible = false
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #666;
  }
}

.tabs-container {
  margin-bottom: 0.5rem;
  padding-bottom: 0;
}

.main-content {
  overflow-y: auto;
  margin-top: 0;
  padding-top: 0.5rem;
  min-height: 0;
  flex-grow: 1;
}

.tab-content {
  padding: 1rem 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
  margin-top: 1rem;
}
</style> 