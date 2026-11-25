import { ReportAggregator } from '@wdio/html-reporter';
let reportAggregator;

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
        useOnAfterCommandForScreenshot: false,
      },
    ],
  ],

  cucumberOpts: {
    import: ['./features/step-definitions/**/*.js'],
    timeout: 120000,
  },

  onPrepare: function (_config, _capabilities) {
    reportAggregator = new ReportAggregator({
      outputDir: './reports/cucumber-reports/',
      filename: 'cucumber-report.html',
      reportTitle: 'WDIO Cucumber Test Report',
      collapseTests: true,
      showInBrowser: false,
    });
    reportAggregator.clean();
  },

  before: async function () {
    const chai = await import('chai');
    global.assert = chai.assert;
    global.chaiExpect = chai.expect;
    chai.should();

    await browser.setWindowSize(1440, 900);
  },

  onComplete: async function () {
    await reportAggregator.createReport();
  },
};
