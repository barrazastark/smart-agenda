import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3100',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      apiUrl: 'http://localhost:4100',
    },

    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,

    // Viewport
    viewportWidth: 1280,
    viewportHeight: 720,

    // Retries for flaky tests
    retries: {
      runMode: 2, // Retry failed tests up to 2 times in CI
      openMode: 0, // No retries in interactive mode
    },

    // Screenshots on failure
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',

    // Videos
    video: true,
    videosFolder: 'cypress/videos',
    videoCompression: 32,

    // Other settings
    chromeWebSecurity: false, // Allow cross-origin requests
    experimentalRunAllSpecs: true, // Run all specs in a single browser session
  },
})
