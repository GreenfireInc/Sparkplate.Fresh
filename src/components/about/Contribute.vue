<template>
  <div class="contribute-container">
    <h2 class="text-2xl font-semibold mb-4">Contribute to Sparkplate</h2>
    
    <div class="mb-6">
      <h3 class="text-xl font-medium mb-2">GitHub Repository</h3>
      <p class="mb-2">Sparkplate is an open source project. You can contribute by submitting pull requests or reporting issues on GitHub.</p>
      <p class="mb-2">Repository: <code>git@github.com:GreenfireInc/Sparkplate.Fresh.git</code></p>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-medium mb-2">How to Clone the Repository</h3>
      <p class="mb-2">To get started with development, clone the repository to your local machine:</p>
      <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">git clone git@github.com:GreenfireInc/Sparkplate.Fresh.git
cd Sparkplate.Fresh
nvm use 23
npm install
npm run dev</pre>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-medium mb-2">How to Submit a Pull Request</h3>
      <ol class="list-decimal pl-5 space-y-2">
        <li>Create a new branch for your feature or bug fix:
          <pre class="bg-gray-100 p-2 rounded-md text-sm mt-1">git checkout -b yourInitials.Section.featureFunctionName</pre>
        </li>
        <li>Make your changes and commit them with descriptive messages:
          <pre class="bg-gray-100 p-2 rounded-md text-sm mt-1">git commit -m "Add new feature: description of changes"</pre>
        </li>
        <li>Push your branch to GitHub:
          <pre class="bg-gray-100 p-2 rounded-md text-sm mt-1">git push origin yourInitials.Section.featureFunctionName</pre>
        </li>
        <li>Go to the <a href="https://github.com/GreenfireInc/Sparkplate.Fresh" class="text-blue-600 hover:underline">Sparkplate GitHub repository</a> and click the "Pull Request" button.</li>
        <li>Fill out the PR template with details about your changes.</li>
        <li>Submit the pull request and wait for review.</li>
      </ol>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-medium mb-2">Reporting Issues</h3>
      <p class="mb-2">Found a bug or have a feature request? Please report it on our issue tracker:</p>
      <ol class="list-decimal pl-5 space-y-2">
        <li>Visit the <a href="https://github.com/GreenfireInc/Sparkplate.Fresh/issues" class="text-blue-600 hover:underline">Issues page</a> on GitHub.</li>
        <li>Click the "New Issue" button.</li>
        <li>Select the appropriate issue template.</li>
        <li>Fill out all required information, including:
          <ul class="list-disc pl-5 mt-1">
            <li>Clear description of the issue or feature request</li>
            <li>Steps to reproduce (for bugs)</li>
            <li>Expected behavior</li>
            <li>Screenshots if applicable</li>
            <li>Environment details (OS, browser version, etc.)</li>
          </ul>
        </li>
        <li>Submit the issue.</li>
      </ol>
    </div>

    <div class="mb-4">
      <h3 class="text-xl font-medium mb-2">Development Guidelines</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Follow the existing code style and conventions</li>
        <li>Write tests for new features</li>
        <li>Update documentation when necessary</li>
        <li>Make sure your code passes all existing tests</li>
        <li>Keep pull requests focused on a single feature or bug fix</li>
      </ul>
    </div>

    <p class="mt-4 text-sm text-gray-600">
      Thank you for considering contributing to Sparkplate! Your support helps make this application better for everyone.
    </p>
  </div>
</template>

<script>
export default {
  name: 'ContributeView'
}
</script>

<style lang="scss" scoped>
.contribute-container {
  pre {
    white-space: pre-wrap;
    word-break: break-all;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style> 