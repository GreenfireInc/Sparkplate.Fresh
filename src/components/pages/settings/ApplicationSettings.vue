<template>
  <div class="application-settings">
    <h3 class="text-lg font-semibold mb-4">Application Settings</h3>
    
    <div class="grid grid-cols-3 gap-6">
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
        
        <div>
          <label for="language" class="block text-sm font-medium text-gray-700">Language</label>
          <select id="language" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
      </div>

      <!-- Second Column: Empty -->
      <div>
        <!-- Intentionally left empty -->
      </div>

      <!-- Third Column: Servers -->
      <div class="space-y-4">
        <h4 class="text-md font-medium text-gray-700">Servers</h4>
        
        <div class="flex items-center">
          <input id="blessed-server" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
          <label for="blessed-server" class="ml-2 block text-sm text-gray-900">
            Blessed
          </label>
        </div>
        
        <div class="flex items-center">
          <input id="express-server" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
          <label for="express-server" class="ml-2 block text-sm text-gray-900">
            Express (Access via {{ localIp }}:3000)
          </label>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationSettings',
  data() {
    return {
      localIp: '',
      closeToTray: false
    }
  },
  mounted() {
    this.fetchLocalIP();
  },
  methods: {
    async fetchLocalIP() {
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
            this.localIp = match[1];
            pc.close();
          }
        };
      } catch (error) {
        console.error('Error fetching local IP:', error);
      }
    }
  }
}
</script> 