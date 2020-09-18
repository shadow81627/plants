const { setHeadlessWhen } = require('@codeceptjs/configure')

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.CI)

exports.config = {
  tests: './test/e2e/specs/*.spec.ts',
  output: './test/e2e/output',
  helpers: {
    // Playwright: {
    //   url: 'http://localhost:3001',
    //   show: true,
    //   browser: 'chromium',
    //   waitForNavigation: 'networkidle0',
    // },
    Puppeteer: {
      url: process.env.BASE_URL || 'http://localhost:3001',
      show: true,
      waitForNavigation: 'networkidle0',
    },
    ResembleHelper: {
      require: 'codeceptjs-resemblehelper',
      // screenshotFolder: './test/e2e/output/',
      baseFolder: './test/e2e/screenshots/base/',
      diffFolder: './test/e2e/screenshots/diff/',
      prepareBaseImage: true,
    },
  },
  bootstrap: null,
  mocha: {},
  name: 'free-native-plants',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
}
