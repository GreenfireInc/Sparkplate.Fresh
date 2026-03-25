<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div v-if="contact" class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Contact Details</h2>
        <div class="modal-header-actions">
          <ActionsDropdown 
            :contact="contact" 
            :isEditing="isEditing"
            @update:edit-mode="toggleEditMode"
            @save-changes="saveChanges"
            @cancel-edit="cancelEdit"
            @add-currency-request="showAddCurrencyModal = true"
            @generate-qrcode-png="onGenerateQrCodePng"
            @generate-qrcode-svg="onGenerateQrCodeSvg"
            @export-csv="onExportCsv"
            @export-vcf="onExportVcf"
          />
        </div>
      </div>
      <div class="profile-grid">
        <div class="profile-sidebar">
          <div class="initials-avatar" :style="{ backgroundColor: avatarBackgroundColor }">
            {{ contactInitials }}
          </div>
          <h2 class="name">{{ contact.firstname }} {{ contact.lastname }} <QrCode :size="20" class="name-icon" /></h2>
          
          <div class="form-group">
            <label for="relationship">Relationship:</label>
            <select id="relationship" v-model="selectedRelationship" class="form-select">
              <option value="">Select Relationship</option>
              <option value="Friend">Friend</option>
              <option value="Co-Worker">Co-Worker</option>
              <option value="Family">Family</option>
              <option value="Acquaintance">Acquaintance</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="bio">
            <p>Product Design @github working on open source communities.</p>
            <p>she/her</p>
            <p class="links">
              <span><Phone :size="16" class="link-icon" /> 
                <template v-if="!isEditing">
                  <a v-if="editedContact.phone" :href="`tel:${editedContact.phone}`">{{ editedContact.phone }}</a>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="tel" v-model="editedContact.phone" placeholder="Phone number" class="form-input-inline" />
                </template>
              </span>
              <span><MapPinned :size="16" class="link-icon" /> 
                <template v-if="!isEditing">
                  <span v-if="editedContact.location">{{ editedContact.location }}</span>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="text" v-model="editedContact.location" placeholder="Location" class="form-input-inline" />
                </template>
              </span>
              <span><Mailbox :size="16" class="link-icon" />
                <template v-if="!isEditing">
                  <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
                </template>
                <template v-else>
                  <input type="email" v-model="editedContact.email" placeholder="Email Address" class="form-input-inline" />
                </template>
              </span>
              <span><Globe :size="16" class="link-icon" /> 
                <template v-if="!isEditing">
                  <a v-if="editedContact.website" :href="editedContact.website" target="_blank">{{ editedContact.website }}</a>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="url" v-model="editedContact.website" placeholder="Website URL" class="form-input-inline" />
                </template>
              </span>
              
              <span><Github :size="16" class="link-icon" /> 
                <template v-if="!isEditing">
                  <a v-if="editedContact.github" :href="`https://github.com/${editedContact.github}`" target="_blank">{{ editedContact.github }}</a>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="text" v-model="editedContact.github" placeholder="GitHub username" class="form-input-inline" />
                </template>
              </span>
              <span><Twitter :size="16" class="link-icon" /> 
                <template v-if="!isEditing">
                  <a v-if="editedContact.twitter" :href="`https://twitter.com/${editedContact.twitter}`" target="_blank">@{{ editedContact.twitter }}</a>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="text" v-model="editedContact.twitter" placeholder="Twitter handle" class="form-input-inline" />
                </template>
              </span>

              <span><Linkedin :size="16" class="link-icon" />
                <template v-if="!isEditing">
                  <a v-if="editedContact.linkedin" :href="editedContact.linkedin" target="_blank">{{ editedContact.linkedin }}</a>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="url" v-model="editedContact.linkedin" placeholder="LinkedIn Profile URL" class="form-input-inline" />
                </template>
              </span>

              <span><Instagram :size="16" class="link-icon" />
                <template v-if="!isEditing">
                  <a v-if="editedContact.instagram" :href="`https://instagram.com/${editedContact.instagram}`" target="_blank">@{{ editedContact.instagram }}</a>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="text" v-model="editedContact.instagram" placeholder="Instagram handle" class="form-input-inline" />
                </template>
              </span>

              <span><Facebook :size="16" class="link-icon" />
                <template v-if="!isEditing">
                  <a v-if="editedContact.facebook" :href="editedContact.facebook" target="_blank">{{ editedContact.facebook }}</a>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="url" v-model="editedContact.facebook" placeholder="Facebook Profile URL" class="form-input-inline" />
                </template>
              </span>

             
            </p>
          </div>
        </div>
        <div class="profile-main">
          <div class="profile-header">
              <a 
                href="#" 
                class="tab" 
                :class="{ active: activeTab === 'wallets' }"
                @click.prevent="activeTab = 'wallets'"
              >
                <WalletIcon :size="16" class="tab-icon" />
                Wallets<span class="badge">{{ walletCount }}</span>
              </a>
              <a 
                href="#" 
                class="tab" 
                :class="{ active: activeTab === 'gpg' }"
                @click.prevent="activeTab = 'gpg'"
              >
                <FileKey :size="16" class="tab-icon" />
                GPG publicKeys <span class="badge">{{ gpgKeys.length }}</span>
              </a>
              <a 
                href="#" 
                class="tab" 
                :class="{ active: activeTab === 'invoices' }"
                @click.prevent="activeTab = 'invoices'"
              >
                <ReceiptText :size="16" class="tab-icon" />
                Invoices <span class="badge">0</span>
              </a>
              <a 
                href="#" 
                class="tab" 
                :class="{ active: activeTab === 'notes' }"
                @click.prevent="activeTab = 'notes'"
              >
                <NotebookPen :size="16" class="tab-icon" />
                Notes <span class="badge">72</span>
              </a>
          </div>
          <div class="profile-body">
              <WalletsTab 
                v-if="activeTab === 'wallets' && contact?.id"
                :contactId="contact.id"
                @wallet-deleted="refreshWalletCount"
                ref="walletsTabRef"
              />
              <div v-else-if="activeTab === 'gpg'" class="gpg-tab">
                  <h3>GPG Public Keys</h3>
                  <div v-if="gpgKeys.length === 0" class="empty-state">
                      <p>No GPG public keys found for this contact.</p>
                  </div>
                  <div v-else class="gpg-keys-list">
                      <div v-for="wallet in gpgKeys" :key="wallet.id" class="gpg-key-item">
                          <div class="gpg-key-header">
                              <div class="gpg-key-info">
                                  <strong class="gpg-currency">{{ wallet.coinTicker }}</strong>
                                  <span v-if="wallet.keyFingerprint" class="gpg-fingerprint">
                                      <code>{{ wallet.keyFingerprint }}</code>
                                  </span>
                              </div>
                          </div>
                          <div v-if="wallet.gpgPublicKey" class="gpg-key-content">
                              <pre class="gpg-public-key"><code>{{ wallet.gpgPublicKey }}</code></pre>
                          </div>
                      </div>
                  </div>
              </div>
              <div v-else-if="activeTab === 'invoices'" class="readme">
                  <h3>Invoices</h3>
                  <p>Invoices functionality coming soon...</p>
              </div>
              <div v-else-if="activeTab === 'notes'" class="readme">
                  <h3>Notes</h3>
                  <p>Notes functionality coming soon...</p>
              </div>
              <div v-else class="readme">
                  <h3>.github/README.md</h3>
                  <h2>{{ contact.firstname }} {{ contact.lastname }}</h2>
                  <p>Hi, I'm {{ contact.firstname }} - a senior product designer at GitHub working on Sponsors to support open source sustainability...</p>
                  <h4>My values</h4>
                  <ul>
                      <li><span class="emoji">💖</span> Expression as authentic self</li>
                      <li><span class="emoji">🛡️</span> Safety and trust</li>
                      <li><span class="emoji">🌱</span> Beginner's mindset and curiosity</li>
                      <li><span class="emoji">🤝</span> Shared understanding and consensus</li>
                  </ul>
                  <h4>How I work</h4>
                  <p>My motivations are to stabilize and provide clarity through curiosity...</p>
                  <h4>Get in touch</h4>
                   <ul>
                      <li>Twitter: <a :href="`https://twitter.com/${editedContact.twitter || ''}`">https://twitter.com/{{ editedContact.twitter || '' }}</a></li>
                      <li>Personal site: <a :href="editedContact.website || '#'">{{ editedContact.website || 'N/A'}}</a></li>
                  </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
    <AddCurrencyModal
      v-if="contact.id"
      :show="showAddCurrencyModal"
      :contactId="contact.id!"
      @close="showAddCurrencyModal = false"
      @currency-added="handleCurrencyAdded"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import type { Contact } from '@/services/addressBook/contactService';
import ActionsDropdown from '../ActionsDropdown.vue';
import AddCurrencyModal from './AddCurrencyModal.vue';
import WalletsTab from '../tabs/contactDetails/WalletsTab.vue';
import { addWallet, getWalletCountForContact, getWalletsForContact, type Wallet } from '@/services/addressBook/walletService';
import { Wallet as WalletIcon, FileKey, ReceiptText, NotebookPen, Github, MapPinned, Globe, Mailbox, Twitter, Instagram, Linkedin, Facebook, QrCode, Phone } from 'lucide-vue-next';

const props = defineProps<{ 
  show: boolean; 
  contact: Contact | null; 
}>();

const emit = defineEmits(['close']);

const isEditing = ref(false);
const editedContact = ref<Partial<Contact>>({});
const selectedRelationship = ref(''); // To hold the selected relationship
const showAddCurrencyModal = ref(false);
const activeTab = ref<'wallets' | 'gpg' | 'invoices' | 'notes'>('wallets');
const walletCount = ref(0);
const walletsTabRef = ref<InstanceType<typeof WalletsTab> | null>(null);
const gpgKeys = ref<Wallet[]>([]);

const contactInitials = computed(() => {
  if (!props.contact) return '';
  const firstInitial = props.contact.firstname ? props.contact.firstname.charAt(0) : '';
  const lastInitial = props.contact.lastname ? props.contact.lastname.charAt(0) : '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
});

const avatarBackgroundColor = computed(() => {
  if (!props.contact) return '#cccccc';
  const name = `${props.contact.firstname}${props.contact.lastname}`;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
});

watch(() => props.contact, async (newContact) => {
  if (newContact) {
    editedContact.value = { ...newContact };
    // Assume relationship can be stored in contact.notes or a new field
    selectedRelationship.value = (newContact as any).relationship || ''; 
    isEditing.value = false; // Reset edit mode when contact changes
    // Refresh wallet count and GPG keys when contact changes
    await refreshWalletCount();
    await refreshGpgKeys();
  } else {
    editedContact.value = {};
    selectedRelationship.value = '';
    walletCount.value = 0;
    gpgKeys.value = [];
  }
}, { immediate: true });

const toggleEditMode = (value: boolean) => {
  // `value` comes from ActionsDropdown.vue's @update:edit-mode event
  isEditing.value = value;
  if (!isEditing.value && props.contact) {
    // If exiting edit mode without saving (e.g., via cancel), revert changes
    editedContact.value = { ...props.contact };
    selectedRelationship.value = (props.contact as any).relationship || '';
  }
};

const saveChanges = () => {
  // In a real application, you would send editedContact.value to a service to update the contact
  console.log('Saving changes:', editedContact.value);
  console.log('Selected Relationship:', selectedRelationship.value);
  isEditing.value = false;
  // Ideally, after saving, you would re-emit the updated contact or trigger a refresh
};

const cancelEdit = () => {
  if (props.contact) {
    editedContact.value = { ...props.contact }; // Revert changes
    selectedRelationship.value = (props.contact as any).relationship || ''; // Revert relationship
  }
  isEditing.value = false; // Exit edit mode
  console.log('Edit cancelled.');
};

const handleCurrencyAdded = async (currencyData: { contactId: number; network: string; address: string }) => {
  console.log('Currency added from modal:', currencyData);
  
  // Save wallet to the service
  await addWallet({
    contactId: currencyData.contactId,
    coinTicker: currencyData.network,
    address: currencyData.address
  });
  
  showAddCurrencyModal.value = false;
  
  // Refresh wallet count and wallets list
  await refreshWalletCount();
  await refreshGpgKeys();
  
  // Refresh the wallets tab if it's open
  if (walletsTabRef.value) {
    walletsTabRef.value.refresh();
  }
};

const refreshWalletCount = async () => {
  if (props.contact?.id) {
    walletCount.value = await getWalletCountForContact(props.contact.id);
  }
};

const refreshGpgKeys = async () => {
  if (props.contact?.id) {
    const wallets = await getWalletsForContact(props.contact.id);
    // Filter wallets that have GPG public keys
    gpgKeys.value = wallets.filter(w => w.gpgPublicKey);
  } else {
    gpgKeys.value = [];
  }
};

const onGenerateQrCodePng = (contact: Contact) => {
  console.log(`Generating QR Code (PNG) for contact: ${contact.id}`);
  // Implement QR code generation logic
};

const onGenerateQrCodeSvg = (contact: Contact) => {
  console.log(`Generating QR Code (SVG) for contact: ${contact.id}`);
  // Implement QR code generation logic
};

const onExportCsv = (contact: Contact) => {
  console.log(`Exporting CSV for contact: ${contact.id}`);
  // Implement CSV export logic
};

const onExportVcf = (contact: Contact) => {
  console.log(`Exporting VCF for contact: ${contact.id}`);
  // Implement VCF export logic
};

const close = () => {
  isEditing.value = false; // Ensure edit mode is off when closing
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 960px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid #e1e4e8;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  line-height: 1;
}

.close-button:hover {
  color: #374151;
}

.profile-grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
  padding: 2rem;
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

.profile-sidebar {
  position: sticky;
  top: 0;
  align-self: start;
  max-height: calc(90vh - 4rem);
  overflow-y: auto;
}

.profile-main {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.profile-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  max-height: calc(90vh - 200px);
}

.initials-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #ffffff;
  font-weight: bold;
  margin: 0 auto 1rem auto;
  border: 1px solid #e1e4e8;
}

.name {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.name-icon {
    flex-shrink: 0;
    vertical-align: middle;
}

.form-group {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #ffffff;
  font-size: 1rem;
  color: #374151;
}

.bio {
    margin-top: 1rem;
    font-size: 0.875rem;
}

.bio .links {
    margin-top: 1rem;
}

.bio .links span {
    display: block;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    word-break: break-all; /* Ensure long URLs wrap */
}

.bio .links .icon-github, .icon-location, .icon-link, .icon-twitter, .icon-linkedin, .icon-instagram, .icon-facebook {
    margin-right: 0.5rem;
    width: 1rem; /* Adjust icon size */
    height: 1rem;
}

.bio .links .link-icon {
    margin-right: 0.5rem;
    flex-shrink: 0;
}

.form-input-inline {
  flex-grow: 1;
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}


.profile-header {
    display: flex;
    border-bottom: 1px solid #e1e4e8;
    margin-bottom: 1rem;
}

.tab {
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #586069;
    border-bottom: 2px solid transparent;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
}

.tab-icon {
    flex-shrink: 0;
}

.tab.active {
    border-bottom-color: #f9826c;
    font-weight: 600;
}

.badge {
    background-color: #f6f8fa;
    padding: 2px 6px;
    border-radius: 20px;
    font-size: 0.75rem;
}

.readme {
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 1rem;
}

.gpg-tab {
    padding: 1rem;
}

.gpg-tab h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.gpg-tab .empty-state {
    text-align: center;
    padding: 2rem;
    color: #6b7280;
}

.gpg-keys-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.gpg-key-item {
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 1rem;
    background-color: #f9fafb;
}

.gpg-key-header {
    margin-bottom: 0.75rem;
}

.gpg-key-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.gpg-currency {
    font-size: 1rem;
    color: #1f2937;
}

.gpg-fingerprint {
    font-size: 0.875rem;
}

.gpg-fingerprint code {
    background-color: #ffffff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #e5e7eb;
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    color: #374151;
    word-break: break-all;
}

.gpg-key-content {
    margin-top: 0.75rem;
}

.gpg-public-key {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    padding: 1rem;
    margin: 0;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-all;
}

.gpg-public-key code {
    color: #374151;
    background: transparent;
    padding: 0;
    border: none;
}
</style>