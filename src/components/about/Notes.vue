<template>
  <div class="releaseNotes">
    <div class="docs-container">
      <!-- File Navigation -->
      <div class="docs-sidebar">
        <h3 class="sidebar-title">Documentation</h3>
        <div class="file-list">
          <button 
            v-for="file in docFiles" 
            :key="file.name"
            @click="selectFile(file)"
            :class="['file-item', { active: selectedFile?.name === file.name }]"
          >
            <span class="file-icon">📄</span>
            <span class="file-name">{{ formatFileName(file.name) }}</span>
          </button>
        </div>
      </div>

      <!-- Content Display -->
      <div class="docs-content">
        <div v-if="selectedFile" class="content-header">
          <h2 class="content-title">{{ formatFileName(selectedFile.name) }}</h2>
          <div class="content-meta">
            <span class="file-size">{{ formatFileSize(selectedFile.size) }}</span>
            <span class="file-date">{{ formatDate(selectedFile.lastModified) }}</span>
          </div>
        </div>
        
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading documentation...</p>
        </div>
        
        <div v-else-if="selectedFile" class="markdown-content" v-html="renderedContent"></div>
        
        <div v-else class="empty-state">
          <h3>Select a document to view</h3>
          <p>Choose a file from the sidebar to view its contents.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutNotes',
  data() {
    return {
      docFiles: [],
      selectedFile: null,
      renderedContent: '',
      loading: false
    }
  },
  async mounted() {
    await this.loadDocFiles()
  },
  methods: {
    async loadDocFiles() {
      try {
        // Get list of files in the docs directory
        const files = [
          { name: '05302025.progress.page.settings.md', size: 12000, lastModified: new Date('2025-05-30') },
          { name: '05292025.progress.page.games.md', size: 8200, lastModified: new Date('2025-05-29') },
          { name: '05292025.progress.page.networking.md', size: 6500, lastModified: new Date('2025-05-29') },
          { name: '05292025.progress.page.package.md', size: 7700, lastModified: new Date('2025-05-29') },
          { name: '05292025.progress.page.publish.md', size: 8100, lastModified: new Date('2025-05-29') },
          { name: '05292025.progress.page.repurposing.md', size: 6300, lastModified: new Date('2025-05-29') },
          { name: '05292025.progress.page.sandbox.md', size: 11000, lastModified: new Date('2025-05-29') },
          { name: '05292025.progress.page.techstack.md', size: 6700, lastModified: new Date('2025-05-29') },
          { name: '05292025.progress.page.build.md', size: 7100, lastModified: new Date('2025-05-29') },
          { name: '05292025.progress.page.cryptocurrency.md', size: 7900, lastModified: new Date('2025-05-29') },
          { name: '05292025.progress.page.cryptography.md', size: 11000, lastModified: new Date('2025-05-29') },
          { name: '05242025.progress.page.keyfiles.md', size: 6100, lastModified: new Date('2025-05-24') },
          { name: '05242025.sparkplate.progress.md', size: 9200, lastModified: new Date('2025-05-24') },
          { name: '05252025.progress.infrastructure.build.md', size: 5200, lastModified: new Date('2025-05-25') }
        ]
        
        // Sort by date (newest first)
        this.docFiles = files.sort((a, b) => b.lastModified - a.lastModified)
        
        // Auto-select the first file
        if (this.docFiles.length > 0) {
          this.selectFile(this.docFiles[0])
        }
      } catch (error) {
        console.error('Error loading doc files:', error)
      }
    },
    
    async selectFile(file) {
      this.selectedFile = file
      this.loading = true
      
      try {
        const response = await fetch(`/docs/${file.name}`)
        if (response.ok) {
          const content = await response.text()
          this.renderedContent = this.parseMarkdown(content)
        } else {
          this.renderedContent = '<p>Error loading file content.</p>'
        }
      } catch (error) {
        console.error('Error loading file:', error)
        this.renderedContent = '<p>Error loading file content.</p>'
      } finally {
        this.loading = false
      }
    },
    
    parseMarkdown(content) {
      // Basic markdown parsing - you could use a library like marked.js for more complete parsing
      return content
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^\* (.*$)/gim, '<li>$1</li>')
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/\n/g, '<br>')
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    },
    
    formatFileName(filename) {
      // Remove date prefix and .md extension, format nicely
      return filename
        .replace(/^\d{8}\./, '') // Remove date prefix
        .replace(/\.md$/, '') // Remove .md extension
        .replace(/\./g, ' ') // Replace dots with spaces
        .replace(/progress/g, '') // Remove "progress" word
        .replace(/page/g, '') // Remove "page" word
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    
    formatFileSize(bytes) {
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB'
      return Math.round(bytes / (1024 * 1024)) + ' MB'
    },
    
    formatDate(date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.releaseNotes {
  height: 100%;
}

.docs-container {
  display: flex;
  height: 100%;
  gap: 1rem;
}

.docs-sidebar {
  width: 250px;
  border-right: 1px solid #e5e5e5;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
  height: 350px; /* Fixed height that should work within modal */
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  &.active {
    background-color: #dbeafe;
    color: #1e40af;
  }
}

.file-icon {
  font-size: 1rem;
}

.file-name {
  font-size: 0.875rem;
  line-height: 1.2;
}

.docs-content {
  flex: 1;
  overflow-y: auto;
  padding-left: 1rem;
}

.content-header {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 1rem;
}

.content-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.content-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid #e5e5e5;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
  text-align: center;
}

.markdown-content {
  line-height: 1.6;
  
  :deep(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1f2937;
  }
  
  :deep(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem 0;
    color: #374151;
  }
  
  :deep(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
    color: #4b5563;
  }
  
  :deep(h4) {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0.75rem 0 0.5rem 0;
    color: #6b7280;
  }
  
  :deep(ul) {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  
  :deep(li) {
    margin-bottom: 0.25rem;
    list-style-type: disc;
  }
  
  :deep(code) {
    background-color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: ui-monospace, monospace;
    font-size: 0.875rem;
  }
  
  :deep(pre) {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
    
    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }
  
  :deep(strong) {
    font-weight: 600;
  }
  
  :deep(em) {
    font-style: italic;
  }
}
</style> 