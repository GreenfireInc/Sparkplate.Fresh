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
            @delete="handleDeleteContact"
          />
        </div>
      </div>
      <div class="profile-grid">
        <div class="profile-sidebar">
          <div class="initials-avatar" :style="{ backgroundColor: avatarBackgroundColor }">
            <img
              v-if="gravatarUrl && !gravatarError"
              :src="gravatarUrl"
              :alt="`${contact.firstname} ${contact.lastname}`"
              class="gravatar-image"
              @error="handleGravatarError"
            />
            <span v-else>{{ contactInitials }}</span>
          </div>
          <h2 class="name">{{ contact.firstname }} {{ contact.lastname }} <QrCode :size="20" class="name-icon" @click="showQRCodeModal = true" /></h2>
          
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
            <div class="bio-content">
              <template v-if="!isEditing">
                <p v-if="editedContact.bio">{{ editedContact.bio }}</p>
                <p v-else>Someone to know, possibly work with and ultimately build a deep connection with.</p>
              </template>
              <template v-else>
                <textarea 
                  v-model="editedContact.bio" 
                  placeholder="Bio description" 
                  class="form-textarea-bio"
                  rows="3"
                ></textarea>
              </template>
            </div>
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

              <span><i class="bi bi-bluesky link-icon"></i>
                <template v-if="!isEditing">
                  <a v-if="editedContact.bluesky" :href="editedContact.bluesky" target="_blank">{{ editedContact.bluesky }}</a>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="url" v-model="editedContact.bluesky" placeholder="Bluesky Profile URL" class="form-input-inline" />
                </template>
              </span>

              <span><i class="bi bi-telegram link-icon"></i>
                <template v-if="!isEditing">
                  <a v-if="editedContact.telegram" :href="editedContact.telegram" target="_blank">{{ editedContact.telegram }}</a>
                  <span v-else>N/A</span>
                </template>
                <template v-else>
                  <input type="url" v-model="editedContact.telegram" placeholder="Telegram Profile URL" class="form-input-inline" />
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
                GPG publicKeys <span class="badge">{{ gpgKeysCount }}</span>
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
                Notes <span class="badge">{{ notesCount }}</span>
              </a>
          </div>
          <div class="profile-body">
              <WalletsTab 
                v-if="activeTab === 'wallets' && contact?.id"
                :contactId="contact.id"
                @wallet-deleted="refreshWalletCount"
                ref="walletsTabRef"
              />
              <GPGTab 
                v-else-if="activeTab === 'gpg' && contact?.id"
                :contactId="contact.id"
                ref="gpgTabRef"
              />
              <div v-else-if="activeTab === 'invoices'" class="readme">
                  <h3>Invoices</h3>
                  <p>Invoices functionality coming soon...</p>
              </div>
              <NotesTab 
                v-else-if="activeTab === 'notes' && contact?.id"
                :contactId="contact.id"
                :contactName="`${contact.firstname || ''} ${contact.lastname || ''}`.trim() || 'Unknown'"
                ref="notesTabRef"
              />
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
      @wallets-imported="handleWalletsImported"
    />
    <ContactQRCodeModal
      :show="showQRCodeModal"
      :contact="contact"
      @close="showQRCodeModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import type { Contact } from '../../services/contactService';
import { updateContact } from '../../services/contactService';
import ActionsDropdown from '../dropdown/ActionsDropdown.vue';
import AddCurrencyModal from './AddCurrencyModal.vue';
import ContactQRCodeModal from './ContactQRCodeModal.vue';
import WalletsTab from '../tabs/contactDetails/WalletsTab.vue';
import GPGTab from '../tabs/contactDetails/GPGTab.vue';
import NotesTab from '../tabs/contactDetails/NotesTab.vue';
import { addWallet, getWalletCountForContact, getWalletsForContact, type Wallet } from '../../services/walletService';
import { getNoteCountForContact, notesRevision } from '../../services/noteService';
import { Wallet as WalletIcon, FileKey, ReceiptText, NotebookPen, Github, MapPinned, Globe, Mailbox, Twitter, Instagram, Linkedin, QrCode, Phone } from 'lucide-vue-next';
import { generateGravatarUrl } from '../../lib/cores/displayStandard/generateGravatarUrl';

const props = defineProps<{ 
  show: boolean; 
  contact: Contact | null; 
}>();

const emit = defineEmits(['close', 'contact-updated', 'contact-deleted']);

const isEditing = ref(false);
const editedContact = ref<Partial<Contact>>({});
const selectedRelationship = ref(''); // To hold the selected relationship
const showAddCurrencyModal = ref(false);
const showQRCodeModal = ref(false);
const activeTab = ref<'wallets' | 'gpg' | 'invoices' | 'notes'>('wallets');
const walletCount = ref(0);
const walletsTabRef = ref<InstanceType<typeof WalletsTab> | null>(null);
const gpgTabRef = ref<InstanceType<typeof GPGTab> | null>(null);
const notesTabRef = ref<InstanceType<typeof NotesTab> | null>(null);
const gpgKeysCount = ref(0);
const notesCount = ref(0);
const gravatarError = ref(false);

// Watch notesRevision to refresh notes count when notes change
watch(notesRevision, async () => {
  if (props.contact?.id) {
    await refreshNotesCount();
  }
});

// Sync selectedRelationship with editedContact.relationship and auto-save
watch(selectedRelationship, async (newValue) => {
  if (editedContact.value) {
    (editedContact.value as any).relationship = newValue;
    
    // Auto-save relationship when changed (if contact has an id)
    if (props.contact?.id) {
      const contactToSave: Contact = {
        ...editedContact.value,
        id: props.contact.id,
        relationship: newValue
      } as Contact;
      
      await updateContact(contactToSave);
      editedContact.value = { ...contactToSave };
      emit('contact-updated');
    }
  }
});

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

const gravatarUrl = computed(() => {
  if (!props.contact?.email || gravatarError.value) {
    return null;
  }
  return generateGravatarUrl(props.contact.email, 200, 'mp');
});

const handleGravatarError = () => {
  gravatarError.value = true;
};

watch(() => props.contact, async (newContact) => {
  if (newContact) {
    editedContact.value = { ...newContact };
    selectedRelationship.value = newContact.relationship || ''; 
    isEditing.value = false; // Reset edit mode when contact changes
    gravatarError.value = false; // Reset Gravatar error when contact changes
    // Refresh wallet count, GPG keys, and notes count when contact changes
    await refreshWalletCount();
    await refreshGpgKeys();
    await refreshNotesCount();
  } else {
    editedContact.value = {};
    selectedRelationship.value = '';
    walletCount.value = 0;
    gpgKeysCount.value = 0;
    notesCount.value = 0;
    gravatarError.value = false;
  }
}, { immediate: true });

const toggleEditMode = (value: boolean) => {
  // `value` comes from ActionsDropdown.vue's @update:edit-mode event
  isEditing.value = value;
  if (!isEditing.value && props.contact) {
    // If exiting edit mode without saving (e.g., via cancel), revert changes
    editedContact.value = { ...props.contact };
    selectedRelationship.value = props.contact.relationship || '';
  }
};

const saveChanges = async () => {
  if (props.contact?.id && editedContact.value) {
    // Ensure relationship is included in the contact data
    const contactToSave: Contact = {
      ...editedContact.value,
      id: props.contact.id,
      relationship: selectedRelationship.value
    } as Contact;
    
    await updateContact(contactToSave);
    isEditing.value = false;
    // Update the local editedContact to reflect saved relationship
    editedContact.value = { ...contactToSave };
  }
};

const cancelEdit = () => {
  if (props.contact) {
    editedContact.value = { ...props.contact }; // Revert changes
    selectedRelationship.value = props.contact.relationship || ''; // Revert relationship
  }
  isEditing.value = false; // Exit edit mode
  console.log('Edit cancelled.');
};

const handleCurrencyAdded = async (currencyData: { contactId: number; network: string; address: string }) => {
  console.log('Currency added from modal:', currencyData);
  
  // Check for duplicate before adding (for single wallet additions via form)
  const existingWallets = await getWalletsForContact(currencyData.contactId);
  const isDuplicate = existingWallets.some(
    w => w.coinTicker === currencyData.network && w.address === currencyData.address
  );
  
  if (isDuplicate) {
    alert('This wallet already exists for this contact.');
    return;
  }
  
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
  await refreshNotesCount();
  
  // Refresh the wallets tab if it's open
  if (walletsTabRef.value) {
    walletsTabRef.value.refresh();
  }
};

const handleWalletsImported = async () => {
  // Handle bulk wallet import completion
  // Refresh wallet count and wallets list
  await refreshWalletCount();
  await refreshGpgKeys();
  await refreshNotesCount();
  
  // Refresh the wallets tab if it's open
  if (walletsTabRef.value) {
    walletsTabRef.value.refresh();
  }
  
  // Refresh GPG tab if it's open
  if (gpgTabRef.value) {
    gpgTabRef.value.refresh();
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
    // Filter wallets that have GPG public keys and get the count
    gpgKeysCount.value = wallets.filter(w => w.gpgPublicKey).length;
  } else {
    gpgKeysCount.value = 0;
  }
  
  // Also refresh the GPG tab if it's open
  if (gpgTabRef.value) {
    gpgTabRef.value.refresh();
  }
};

const refreshNotesCount = async () => {
  if (props.contact?.id) {
    notesCount.value = await getNoteCountForContact(props.contact.id);
  } else {
    notesCount.value = 0;
  }
  
  // Also refresh the notes tab if it's open
  if (notesTabRef.value) {
    notesTabRef.value.refresh();
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

const handleDeleteContact = () => {
  if (props.contact) {
    emit('contact-deleted', props.contact);
    emit('close');
  }
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
  overflow: hidden;
  position: relative;
}

.gravatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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
    cursor: pointer;
    transition: opacity 0.2s;
}

.name-icon:hover {
    opacity: 0.7;
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

.bio-content {
    margin-bottom: 1rem;
}

.bio-content p {
    margin: 0;
    color: #374151;
    line-height: 1.5;
}

.form-textarea-bio {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #ffffff;
    font-size: 0.875rem;
    color: #374151;
    font-family: inherit;
    resize: vertical;
    min-height: 60px;
}

.form-textarea-bio:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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

.bio .links .icon-github, .icon-location, .icon-link, .icon-twitter, .icon-linkedin, .icon-instagram {
    margin-right: 0.5rem;
    width: 1rem; /* Adjust icon size */
    height: 1rem;
}

.bio .links .link-icon {
    margin-right: 0.5rem;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    display: inline-block;
    font-size: 16px;
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
</style>