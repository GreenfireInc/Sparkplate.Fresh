<template>
  <div class="application-settings">
    <h3 class="text-lg font-semibold mb-4">Application Settings</h3>
    
    <div class="grid grid-cols-2 gap-6">
      <!-- First Column: Theme and Language -->
      <div class="space-y-4">
        <div>
          <label for="theme" class="block text-sm font-medium text-gray-700">Theme</label>
          <select id="theme" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('defaultLanguage') }}</label>
          <select v-model="profile.language" @change="handleLanguageChange" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
              {{ lang.flag }} {{ lang.name }}
            </option>
          </select>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Close to tray</p>
            <p class="text-sm text-gray-600">Minimize to system tray when closed</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="closeToTray" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <!-- Second Column: Servers -->
      <div class="space-y-4">
        <h4 class="text-md font-medium text-gray-700">Servers</h4>
        
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Blessed</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="blessedServer" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p class="font-medium">Express</p>
            <p class="text-sm text-gray-600">Access via {{ localIp }}:3000</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="expressServer" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

export default defineComponent({
  name: 'ApplicationSettings',
  setup() {
    const { locale, setLocale, languages, t } = useI18n()
    
    const localIp = ref('')
    const closeToTray = ref(false)
    const blessedServer = ref(false)
    const expressServer = ref(false)
    
    const profile = ref({
      language: locale.value
    })

    const handleLanguageChange = () => {
      setLocale(profile.value.language)
    }

    const fetchLocalIP = async () => {
      try {
        // Use RTCPeerConnection to get local IP addresses
        const pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel('');
        await pc.createOffer().then(offer => pc.setLocalDescription(offer));
        
        pc.onicecandidate = (ice) => {
          if (!ice || !ice.candidate || !ice.candidate.candidate) {
            pc.close();
            return;
          }
          
          const match = ice.candidate.candidate.match(/(([0-9]{1,3}\.){3}[0-9]{1,3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/i);
          if (match && match[1] && !match[1].startsWith('0.0.0.0') && !match[1].startsWith('127.')) {
            localIp.value = match[1];
            pc.close();
          }
        };
      } catch (error) {
        console.error('Error fetching local IP:', error);
      }
    }

    onMounted(() => {
      fetchLocalIP();
    })

    return {
      localIp,
      closeToTray,
      blessedServer,
      expressServer,
      profile,
      handleLanguageChange,
      languages,
      t
    }
  }
})
</script> 