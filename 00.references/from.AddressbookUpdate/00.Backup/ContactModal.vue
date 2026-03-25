<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close-button" @click="close">&times;</button>
      <div class="profile-grid">
        <div class="profile-sidebar">
          <img :src="contact.avatar || 'https://via.placeholder.com/260'" alt="Avatar" class="avatar" />
          <h2 class="name">{{ contact.firstname }} {{ contact.lastname }}</h2>
          <p class="username">@{{ contact.username || (contact.firstname + contact.lastname).toLowerCase() }}</p>
          <button class="btn btn-follow">Follow</button>
          <div class="bio">
            <p>Product Design @github working on open source communities.</p>
            <p>she/her</p>
            <p class="links">
              <span><i class="icon-github"></i> GitHub <strong>STAFF</strong></span>
              <span><i class="icon-location"></i> Yay Area</span>
              <span><i class="icon-link"></i> <a :href="'http://www.' + contact.email.split('@')[1]" target="_blank">http://www.{{ contact.email.split('@')[1] }}</a></span>
              <span><i class="icon-twitter"></i> <a :href="'http://twitter.com/' + (contact.username || (contact.firstname + contact.lastname).toLowerCase()) " target="_blank">@{{ contact.username || (contact.firstname + contact.lastname).toLowerCase() }}</a></span>
            </p>
          </div>
        </div>
        <div class="profile-main">
          <div class="profile-header">
              <a href="#" class="tab active">Overview</a>
              <a href="#" class="tab">Repositories <span class="badge">14</span></a>
              <a href="#" class="tab">Projects <span class="badge">0</span></a>
              <a href="#" class="tab">Stars <span class="badge">72</span></a>
              <a href="#" class="tab">Followers <span class="badge">350</span></a>
              <a href="#" class="tab">Following <span class="badge">34</span></a>
          </div>
          <div class="profile-body">
              <div class="readme">
                  <h3>.github/README.md</h3>
                  <h2>{{ contact.firstname }} {{ contact.lastname }} - @{{ contact.username || (contact.firstname + contact.lastname).toLowerCase() }}</h2>
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
                      <li>Twitter: <a :href="'http://twitter.com/' + (contact.username || (contact.firstname + contact.lastname).toLowerCase()) ">https://twitter.com/{{ contact.username || (contact.firstname + contact.lastname).toLowerCase() }}</a></li>
                      <li>Personal site: <a :href="'http://www.' + contact.email.split('@')[1]">https://{{contact.email.split('@')[1]}}</a></li>
                  </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  contact: Object,
});

const emit = defineEmits(['close']);

const close = () => {
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
  overflow-y: auto;
  position: relative;
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.profile-grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
  padding: 2rem;
}

.avatar {
  width: 100%;
  border-radius: 50%;
  border: 1px solid #e1e4e8;
}

.name {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1rem;
}

.username {
    font-size: 1.25rem;
    color: #6a737d;
    margin-bottom: 1rem;
}

.btn-follow {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #e1e4e8;
    background-color: #fafbfc;
    font-weight: 500;
    cursor: pointer;
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
}

.bio .links .icon-github, .icon-location, .icon-link, .icon-twitter {
    margin-right: 0.5rem;
}

.profile-main {
    /* styles as needed */
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
