import { ReportAggregator } from '@wdio/html-reporter';
let reportAggregator;

export const config = {
    runner: 'local',

    specs: [
        './features/**/*.feature'
    ],
    
    // Capabilities
    maxInstances: 3,

    capabilities: [
        {
            browserName: 'chrome',
            maxInstances: 2
        },
        {
            browserName: 'MicrosoftEdge',
            maxInstances: 2,
        }
    ],

    logLevel: 'error',
    
    baseUrl: 'https://practicesoftwaretesting.com/',

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,
    
    connectionRetryCount: 3,

    framework: 'cucumber',
    
    reporters: ['spec', 
        ['html', {
            outputDir: './reports/cucumber-reports/',
            filename: 'report.html',
            reportTitle: 'WDIO Test Report',
            showInBrowser: true
            }]
        ],

    cucumberOpts: {
        import: ['./features/step-definitions/**/*.js'],
        strict: true,
        timeout: 120000,
        ignoreUndefinedDefinitions: true
    },


    // Hooks
    onPrepare: function (config, capabilities) {
        reportAggregator = new ReportAggregator({
            outputDir: "./reports/cucumber-reports/",
            filename: "report.html",
            reportTitle: "WDIO Test Report",
            browserName: capabilities.browserName,
            collapseTests: true
        });
        reportAggregator.clean();
    },
    
    before: async function (capabilities, specs) {
        const chai = await import('chai');
        global.assert = chai.assert;
        global.chaiExpect = chai.expect;
        chai.should();
        
        await browser.setWindowSize(1440, 900);
    },
   
    onComplete: async function(exitCode, config, capabilities, results) {
        await reportAggregator.createReport();
    }
}