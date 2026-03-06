<template>
  <div class="services-protocols">
    <h4 class="net-section-title">Services / Protocols</h4>
    <p class="net-section-desc">Enable or disable networking services and real-time protocols.</p>

    <div class="services-list">
      <div class="service-row">
        <Label for="colyseus" class="service-label">
          <img src="/assets/icons/protocols/colyseus.svg" alt="" class="service-icon" />
          <span class="service-text">
            <span class="service-name">Colyseus</span>
            <span class="service-desc">Multiplayer game server framework</span>
          </span>
        </Label>
        <label class="service-toggle">
          <input id="colyseus" type="checkbox" v-model="colyseusEnabled" class="sr-only" />
          <span class="service-toggle-track" />
        </label>
      </div>
      <div class="service-row">
        <Label for="peerjs" class="service-label">
          <img src="/assets/icons/protocols/peerJS.svg" alt="" class="service-icon" />
          <span class="service-text">
            <span class="service-name">PeerJS</span>
            <span class="service-desc">WebRTC peer-to-peer data channels</span>
          </span>
        </Label>
        <label class="service-toggle">
          <input id="peerjs" type="checkbox" v-model="peerjsEnabled" class="sr-only" />
          <span class="service-toggle-track" />
        </label>
      </div>
      <div class="service-row">
        <Label for="webrtc" class="service-label">
          <img src="/assets/icons/protocols/webRTC.svg" alt="" class="service-icon" />
          <span class="service-text">
            <span class="service-name">WebRTC</span>
            <span class="service-desc">Real-time voice, video, and data</span>
          </span>
        </Label>
        <label class="service-toggle">
          <input id="webrtc" type="checkbox" v-model="webrtcEnabled" class="sr-only" />
          <span class="service-toggle-track" />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Label } from 'radix-vue'

const colyseusEnabled = ref(false)
const peerjsEnabled = ref(false)
const webrtcEnabled = ref(false)
</script>

<style scoped>
.services-protocols {
  padding: 0.25rem 0;
}

.net-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.net-section-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.service-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.service-row:last-child {
  border-bottom: none;
}

.service-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.service-icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

.service-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.service-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.service-desc {
  font-size: 0.75rem;
  color: #6b7280;
}

.service-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.service-toggle-track {
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: #d1d5db;
}

.service-toggle input:checked + .service-toggle-track {
  background: #3b82f6;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
</style>
