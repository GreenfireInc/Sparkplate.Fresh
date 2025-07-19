<template>
  <div :class="{'flex items-center space-x-2': !vertical, 'flex flex-col items-start space-y-1': vertical}">
    <div v-if="!hideStatus" class="flex items-center">
      <div class="w-3 h-3 rounded-full" :class="indicatorClass"></div>
      <span 
        class="font-medium cursor-pointer hover:underline ml-2" 
        @click="checkConnection"
        title="Click to refresh network status"
      >{{ statusText }}</span>
    </div>
    
    <span v-if="ip" :class="{'ml-2': !vertical}">
      <b>IP:</b> {{ ip }}
    </span>
    
    <div v-if="country" class="flex items-center" :class="{'ml-2': !vertical && !hideStatus}">
      <span class="country-flag" :class="`flag-${country.sortname.toLowerCase()}`"></span>
      <span class="ml-1">{{ country.name }}</span>
    </div>
    
    <div v-if="!vertical" class="ml-auto flex items-center space-x-2">
      <!-- <span class="text-xs text-gray-600">{{ connectionType }}</span> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import csc from 'country-state-city'
import isOnline from 'is-online'

interface GeoData {
  country?: string;
  [key: string]: any;
}

// Extend Window interface to include geoip
declare global {
  interface Window {
    geoip?: {
      lookup: (ip: string) => Promise<GeoData>;
    };
  }
}

export default defineComponent({
  name: 'NetworkStatus',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    hideStatus: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isOnlineStatus = ref(false)
    const connectionType = ref('Unknown')
    const ip = ref('')
    const country = ref<any>(null)

    const statusText = computed(() => {
      return props.hideStatus ? '' : (isOnlineStatus.value ? 'Connected' : 'Offline')
    })

    const statusClass = computed(() => {
      return isOnlineStatus.value 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-red-50 border border-red-200'
    })

    const indicatorClass = computed(() => {
      return isOnlineStatus.value ? 'bg-green-500' : 'bg-red-500'
    })

    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        return data.ip
      } catch (error) {
        console.error('Error fetching IP:', error)
        return null
      }
    }

    const fetchCountryFromIP = async (ipAddress: string): Promise<GeoData | null> => {
      try {
        // Try using window.geoip if available
        if (typeof window.geoip !== 'undefined' && window.geoip?.lookup) {
          return await window.geoip.lookup(ipAddress);
        }
        
        // Fallback to a public API
        const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const data = await response.json();
        return { country: data.country_code };
      } catch (error) {
        console.error('Error fetching country data:', error);
        return null;
      }
    };

    const checkConnection = async () => {
      try {
        isOnlineStatus.value = await isOnline()
        
        if (isOnlineStatus.value) {
          ip.value = await fetchIP() || '';
          
          if (ip.value) {
            const geo = await fetchCountryFromIP(ip.value);
            if (geo && geo.country) {
              country.value = csc.getCountryByCode(geo.country);
            }
          }
        } else {
          ip.value = ''
          country.value = null
        }
        
        // Try to detect connection type if available
        if ('connection' in navigator) {
          const connection = (navigator as any).connection
          connectionType.value = connection.effectiveType || 'Unknown'
        } else {
          connectionType.value = isOnlineStatus.value ? 'Ethernet/WiFi' : 'None'
        }
      } catch (error) {
        console.error('Error checking connection:', error)
        isOnlineStatus.value = navigator.onLine
      }
    }

    onMounted(async () => {
      await checkConnection()
      
      // Listen for online/offline events
      window.addEventListener('online', checkConnection)
      window.addEventListener('offline', checkConnection)
    })

    return {
      isOnlineStatus,
      statusText,
      statusClass,
      indicatorClass,
      connectionType,
      checkConnection,
      ip,
      country
    }
  }
})
</script>

<style lang="scss" scoped>
.network-status {
  margin-bottom: 1rem;
}

.vertical {
  flex-direction: column-reverse;
}

.country-flag {
  display: inline-block;
  width: 24px;
  height: 18px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 4px;
  border: 1px solid #ddd;
}

/* Add some common country flags */
.flag-us {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjM1IDY1MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KPGRlZnM+DQo8ZyBpZD0idW5pb24iPg0KPHVzZSB5PSItLjIxNiIgeGxpbms6aHJlZj0iI3g0Ii8+DQo8dXNlIHk9Ii0uNDMyIiB4bGluazpocmVmPSIjczYiLz4NCjx1c2UgeT0iLS42NDgiIHhsaW5rOmhyZWY9IiN4NCIvPg0KPHVzZSB5PSItLjg2NCIgeGxpbms6aHJlZj0iI3M1Ii8+DQo8dXNlIHk9Ii0xLjA4IiB4bGluazpocmVmPSIjeDQiLz4NCjx1c2UgeT0iLTEuMjk2IiB4bGluazpocmVmPSIjczYiLz4NCjx1c2UgeT0iLTEuNTEyIiB4bGluazpocmVmPSIjeDQiLz4NCjx1c2UgeT0iLTEuNzI4IiB4bGluazpocmVmPSIjczUiLz4NCjx1c2UgeT0iLTEuOTQ0IiB4bGluazpocmVmPSIjeDQiLz4NCjx1c2UgeT0iLTIuMTYiIHhsaW5rOmhyZWY9IiNzNiIvPg0KPC9nPg0KPGcgaWQ9IngiPg0KPHVzZSB4bGluazpocmVmPSIjYiIvPg0KPHVzZSB4PSIuMjM1IiB4bGluazpocmVmPSIjYSIvPg0KPC9nPg0KPGcgaWQ9Ink0Ij4NCjx1c2UgeGxpbms6aHJlZj0iI3giLz4NCjx1c2UgeD0iLjQ3IiB4bGluazpocmVmPSIjeCIvPg0KPHVzZSB4PSIuOTQiIHhsaW5rOmhyZWY9IiN4Ii8+DQo8dXNlIHg9IjEuNDEiIHhsaW5rOmhyZWY9IiN4Ii8+DQo8L2c+DQo8ZyBpZD0ieDQiPg0KPHVzZSB4bGluazpocmVmPSIjeTQiLz4NCjx1c2UgeD0iMS44OCIgeGxpbms6aHJlZj0iI3k0Ii8+DQo8L2c+DQo8ZyBpZD0ieTYiPg0KPHVzZSB4bGluazpocmVmPSIjeTQiLz4NCjx1c2UgeD0iMS44OCIgeGxpbms6aHJlZj0iI3k0Ii8+DQo8dXNlIHg9IjMuNzYiIHhsaW5rOmhyZWY9IiN5NCIvPg0KPC9nPg0KPGcgaWQ9InM1Ij4NCjx1c2UgeD0iLS4yMzUiIHhsaW5rOmhyZWY9IiNhIi8+DQo8dXNlIHhsaW5rOmhyZWY9IiN5NiIvPg0KPC9nPg0KPGcgaWQ9InM2Ij4NCjx1c2UgeGxpbms6aHJlZj0iI3M1Ii8+DQo8dXNlIHg9IjQuNyIgeGxpbms6aHJlZj0iI2EiLz4NCjwvZz4NCjxnIGlkPSJzdGFyIj4NCjx1c2UgeGxpbms6aHJlZj0iI2MiLz4NCjx1c2UgeT0iLS4yNTIiIHhsaW5rOmhyZWY9IiNkIi8+DQo8L2c+DQo8ZyBpZD0iYSI+DQo8cGF0aCBpZD0iYiIgZD0iTS0uMTA4LS4yMzV2LjQ3aC0uMjM1di0uNDdoLjIzNXoiIHRyYW5zZm9ybT0ic2NhbGUoLjUxOTQpIi8+DQo8cGF0aCBpZD0iYyIgZD0iTS0uMjYgMGwuMzEzLjIyOC0uMTItLjM2OS4zMTMtLjIyOGgtLjM4N2wtLjEyLS4zNy0uMTIuMzdoLS4zODdsLjMxMy4yMjgtLjEyLjM3eiIgdHJhbnNmb3JtPSJzY2FsZSguMDYxNikiLz4NCjxwYXRoIGlkPSJkIiBkPSJNMCAwbC4zMTMuMjI4LS4xMi0uMzY5LjMxMy0uMjI4aC0uMzg3bC0uMTItLjM3LS4xMi4zN2gtLjM4N2wuMzEzLjIyOC0uMTIuMzd6IiB0cmFuc2Zvcm09InNjYWxlKC4wNjE2KSIvPg0KPC9nPg0KPC9kZWZzPg0KPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGgxMjM1djY1MEgweiIvPg0KPHBhdGggc3Ryb2tlPSIjYjIyMjM0IiBzdHJva2Utd2lkdGg9IjUwIiBkPSJNMCAyNWgxMjM1bTAgMjAwSDBtMCAyMDBoMTIzNSIvPg0KPHBhdGggZmlsbD0iIzNjM2I2ZSIgZD0iTTAgMGg0OTR2MzUwSDB6Ii8+DQo8dXNlIHhsaW5rOmhyZWY9IiN1bmlvbiIgdHJhbnNmb3JtPSJtYXRyaXgoNjUwIDAgMCA2NTAgMjQ3IDE3NSkiLz4NCjwvc3ZnPg==');
}

.flag-gb {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCAxMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KPGRlZnM+DQo8Y2xpcFBhdGggaWQ9InQiPg0KPHBhdGggZD0iTTMwLDBoMzB2MzBIMHoiLz4NCjwvY2xpcFBhdGg+DQo8L2RlZnM+DQo8cGF0aCBmaWxsPSIjMDAyNDdkIiBkPSJNMCwwIHYzMCBoNjAgdi0zMCB6Ii8+DQo8cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNiIgZD0iTTAsMCBMNjAsMzAgTTYwLDAgTDAsMzAiLz4NCjxwYXRoIHN0cm9rZT0iI2NmMTQyYiIgc3Ryb2tlLXdpZHRoPSI0IiBkPSJNMCwwIEw2MCwzMCBNNjAsMCBMMCwzMCIgY2xpcC1wYXRoPSJ1cmwoI3QpIi8+DQo8cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTAiIGQ9Ik0zMCwwIHYzMCBNMCwxNSBoNjAiLz4NCjxwYXRoIHN0cm9rZT0iI2NmMTQyYiIgc3Ryb2tlLXdpZHRoPSI2IiBkPSJNMzAsMCB2MzAgTTAsMTUgaDYwIi8+DQo8L3N2Zz4=');
}

.flag-ca {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDEyMDAgNjAwIj4NCjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0wLDBoMTIwMHY2MDBoLTEyMDB6Ii8+DQo8cGF0aCBmaWxsPSIjZDUyYjFlIiBkPSJtMCwwaDMwMHY2MDBoLTMwMHptOTAwLDBoMzAwdjYwMGgtMzAweiIvPg0KPHBhdGggZmlsbD0iI2Q1MmIxZSIgZD0ibTYwMCwyNTRsMjUsMzEgNTAtOSAyNS0zMSA5LDQ3IDQ3LTMtMzEsMzggMzEsMzgtNDctMyAtOS00Ny0yNSwzMS01MC05LTI1LTMxLTI1LDMxLTUwLDktMjUsMzEtOC00Ny00OCwzIDMxLTM4LTMxLTM4IDQ4LDMgOCw0NyAyNS0zMSA1MCw5eiIvPg0KPC9zdmc+');
}

.flag-au {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjgwIDY0MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KPGRlZnM+DQo8Y2xpcFBhdGggaWQ9ImMiPg0KPHBhdGggZD0iTTAsMGg2NDB2NDgwSDB6Ii8+DQo8L2NsaXBQYXRoPg0KPGcgaWQ9ImQiPg0KPGcgaWQ9ImIiPg0KPHBhdGggaWQ9ImEiIGQ9Ik0wLDBoMjF2MTJIMHoiIGZpbGw9IiNmZmYiLz4NCjx1c2UgeGxpbms6aHJlZj0iI2EiIHk9IjEyIi8+DQo8dXNlIHhsaW5rOmhyZWY9IiNhIiB5PSIyNCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjYiIgeD0iMjEiLz4NCjx1c2UgeGxpbms6aHJlZj0iI2IiIHg9IjQyIi8+DQo8L2c+DQo8L2RlZnM+DQo8cGF0aCBmaWxsPSIjMDAyOGI3IiBkPSJNMCwwaDEyODB2NjQwSDB6Ii8+DQo8cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNjAiIGQ9Ik0wLDBoMTI4MHY2NDBIMHoiLz4NCjxnIHRyYW5zZm9ybT0ibWF0cml4KC42LDAsLDAsLjYsMCwwKSI+DQo8ZyBpZD0iZSI+DQo8dXNlIHhsaW5rOmhyZWY9IiNkIiB0cmFuc2Zvcm09Im1hdHJpeCgzLDAsLDMsMCwwKSIvPg0KPHVzZSB4bGluazpocmVmPSIjZCIgdHJhbnNmb3JtPSJtYXRyaXgoMywyLjEsLTIuMSwzLDEyNiwwKSIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjZSIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLDI0MCkiLz4NCjx1c2UgeGxpbms6aHJlZj0iI2UiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMjQwLDApIi8+DQo8dXNlIHhsaW5rOmhyZWY9IiNlIiB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDI0MCwyNDApIi8+DQo8L2c+DQo8dXNlIHhsaW5rOmhyZWY9IiNlIiB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDEwMCwyMDApIi8+DQo8cGF0aCBmaWxsPSIjMDAyOGI3IiBkPSJNMCwwSDY0MHY0ODBIMHoiLz4NCjxwYXRoIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI2MCIgZD0iTTAsMGg2NDB2NDgwSDB6IiBjbGlwLXBhdGg9InVybCgjYykiLz4NCjxwYXRoIHN0cm9rZT0iI2ZmMjIwMCIgc3Ryb2tlLXdpZHRoPSI0MCIgZD0iTTAsMGg2NDB2NDgwSDB6IiBjbGlwLXBhdGg9InVybCgjYykiLz4NCjxwYXRoIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxMjAiIGQ9Ik0wLDI0MGg2NDBNMzIwLDBoMHY0ODAiLz4NCjxwYXRoIHN0cm9rZT0iI2ZmMjIwMCIgc3Ryb2tlLXdpZHRoPSI4MCIgZD0iTTAsMjQwaDY0ME0zMjAsMGgwdjQ4MCIvPg0KPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMyMCwyNDBtLTYwLDBhNjAsNjAsMCwxLDEsMTIwLDBhNjAsNjAsMCwxLDEsLTEyMCwwIi8+DQo8cGF0aCBmaWxsPSIjZmYyMjAwIiBkPSJNMzIwLDI0MG0tNDAsMGE0MCw0MCwwLDEsMSw4MCwwYTQwLDQwLDAsMSwxLC04MCwwIi8+DQo8cGF0aCBmaWxsPSIjZmYyMjAwIiBkPSJNNjAwLDEyMGwtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzAgMTAtMzAtMzAtMTAtMzAtMTAgMTAtMzAtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzB6Ii8+DQo8cGF0aCBmaWxsPSIjZmYyMjAwIiBkPSJNNTIwLDM2MGwtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzAgMTAtMzAtMzAtMTAtMzAtMTAgMTAtMzAtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzB6Ii8+DQo8cGF0aCBmaWxsPSIjZmYyMjAwIiBkPSJNNDAwLDQwMGwtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzAgMTAtMzAtMzAtMTAtMzAtMTAgMTAtMzAtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzB6Ii8+DQo8cGF0aCBmaWxsPSIjZmYyMjAwIiBkPSJNNDgwLDIwMGwtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzAgMTAtMzAtMzAtMTAtMzAtMTAgMTAtMzAtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzB6Ii8+DQo8cGF0aCBmaWxsPSIjZmYyMjAwIiBkPSJNMTYwLDIwMGwtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzAgMTAtMzAtMzAtMTAtMzAtMTAgMTAtMzAtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzB6Ii8+DQo8cGF0aCBmaWxsPSIjZmYyMjAwIiBkPSJNMTYwLDM2MGwtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzAgMTAtMzAtMzAtMTAtMzAtMTAgMTAtMzAtMTAsMzAtMzAtMTAgMzAsMTAtMTAtMzB6Ii8+DQo8L3N2Zz4=');
}

.flag-de {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCA1IDMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNMCwwaDV2M0gweiIgZmlsbD0iIzAwMCIvPg0KPHBhdGggZD0iTTAsMWg1djJIMHoiIGZpbGw9IiNEMDAiLz4NCjxwYXRoIGQ9Ik0wLDJoNXYxSDB6IiBmaWxsPSIjRkZDRTAwIi8+DQo8L3N2Zz4=');
}

.flag-fr {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNjAwIj4NCjxwYXRoIGZpbGw9IiNlZDI5MzkiIGQ9Im0wLDBoOTAwdjYwMGgtOTAweiIvPg0KPHBhdGggZmlsbD0iI2ZmZiIgZD0ibTAsMGg2MDB2NjAwaC02MDB6Ii8+DQo8cGF0aCBmaWxsPSIjMDAyMzk1IiBkPSJtMCwwaDMwMHY2MDBIMHoiLz4NCjwvc3ZnPg==');
}

.flag-jp {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNjAwIj4NCjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0wLDBoOTAwdjYwMGgtOTAweiIvPg0KPGNpcmNsZSBmaWxsPSIjYmMwMDJkIiBjeD0iNDUwIiBjeT0iMzAwIiByPSIxODAiLz4NCjwvc3ZnPg==');
}
</style> 