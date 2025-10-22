<template>
  <div class="contribute-container">
    <h2 class="text-2xl font-semibold mb-4">{{ tAbout('contributeToSparkplate') }}</h2>
    
    <div class="mb-6">
      <h3 class="text-xl font-medium mb-2">{{ tAbout('githubRepository') }}</h3>
      <p class="mb-2">{{ tAbout('openSourceProject') }}</p>
      <p class="mb-2">{{ tAbout('repository') }}: <code>git@github.com:GreenfireInc/Sparkplate.Fresh.git</code></p>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-medium mb-2">{{ tAbout('howToCloneRepository') }}</h3>
      <p class="mb-2">{{ tAbout('getStartedDevelopment') }}</p>
      <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">git clone git@github.com:GreenfireInc/Sparkplate.Fresh.git
cd Sparkplate.Fresh
nvm use 23
npm install
npm run dev</pre>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-medium mb-2">{{ tAbout('howToSubmitPullRequest') }}</h3>
      <ol class="list-decimal pl-5 space-y-2">
        <li>{{ tAbout('createNewBranchForFeature') }}:
          <pre class="bg-gray-100 p-2 rounded-md text-sm mt-1">git checkout -b yourInitials.Section.featureFunctionName</pre>
        </li>
        <li>{{ tAbout('makeChangesCommitDescriptive') }}:
          <pre class="bg-gray-100 p-2 rounded-md text-sm mt-1">git commit -m "Add new feature: description of changes"</pre>
        </li>
        <li>{{ tAbout('pushBranchToGitHub') }}:
          <pre class="bg-gray-100 p-2 rounded-md text-sm mt-1">git push origin yourInitials.Section.featureFunctionName</pre>
        </li>
        <li>{{ tAbout('goToSparkplateRepository') }} <a href="https://github.com/GreenfireInc/Sparkplate.Fresh" class="text-blue-600 hover:underline">Sparkplate GitHub repository</a> {{ tAbout('clickPullRequestButton') }}</li>
        <li>{{ tAbout('fillOutPRTemplateDetails') }}</li>
        <li>{{ tAbout('submitPullRequestWait') }}</li>
      </ol>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-medium mb-2">{{ tAbout('reportingIssues') }}</h3>
      <p class="mb-2">{{ tAbout('foundBugFeatureRequest') }}</p>
      <ol class="list-decimal pl-5 space-y-2">
        <li>{{ tAbout('visitIssuesPageGitHub') }} <a href="https://github.com/GreenfireInc/Sparkplate.Fresh/issues" class="text-blue-600 hover:underline">Issues page</a> on GitHub.</li>
        <li>{{ tAbout('clickNewIssueButton') }}</li>
        <li>{{ tAbout('selectAppropriateTemplate') }}</li>
        <li>{{ tAbout('fillOutAllRequired') }}:
          <ul class="list-disc pl-5 mt-1">
            <li>{{ tAbout('clearDescriptionIssue') }}</li>
            <li>{{ tAbout('stepsToReproduceBugs') }}</li>
            <li>{{ tAbout('expectedBehavior') }}</li>
            <li>{{ tAbout('screenshotsErrors') }}</li>
            <li>{{ tAbout('environmentDetailsOS') }}</li>
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
import { useUnifiedTranslations } from '@/composables/useUnifiedTranslations'

export default {
  name: 'ContributeView',
  setup() {
    const { tAbout } = useUnifiedTranslations()
    return { tAbout }
  }
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