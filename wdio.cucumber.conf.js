export const config = {

  runner: 'local',
  specs: ['./features/**/*.feature'],

  maxInstances: 2,

  capabilities: [
    {
      browserName: 'chrome',
      maxInstances: 2,
    },
    {
      browserName: 'MicrosoftEdge',
      maxInstances: 2,
    },
  ],

  logLevel: 'error',
  baseUrl: 'https://practicesoftwaretesting.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'cucumber',

  reporters: [
    'spec',
    [
      'html',
      {
        outputDir: 'reports/cucumber-reports/',
        filename: 'report-cucumber.html',
        reportTitle: 'WDIO Cucumber Test Report',
        showInBrowser: false,
      }
    ]
  
  ],

  cucumberOpts: {
    import: ['./features/step-definitions/**/*.js'],
    timeout: 120000,
  },

  before: async function () {
    const chai = await import('chai');
    global.assert = chai.assert;
    global.chaiExpect = chai.expect;
    chai.should();

    await browser.setWindowSize(1440, 900);
  },
};
