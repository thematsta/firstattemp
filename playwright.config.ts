import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();
const baseURL = process.env.ENVIRONMENT === 'development' 
    ? process.env.DEV_URL
    : process.env.ENVIRONMENT === 'staging'
    ? process.env.STAGING_URL
    : process.env.PROD_URL;
    : process.env.PROD_URL || 'https://automationexercise.com/';

export default defineConfig<TestOptions>({



  /* Retry on CI only */
  retries:1,
  
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    // ["allure-playwright"],
    ['html'],
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

     
        
      },
    ],
  ],

  use: {
     baseURL: baseURL,


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
     // Collect trace when retrying the failed test.


     // Capture screenshot after each test failure.
     screenshot: "only-on-failure",
  },

  projects: [
    {
      name: 'chromium',

    },

    // {
    //   name: 'firefox',
    //   use: { 
    //     browserName: 'firefox',
    //     video: 'on'
    //   },
    // },
    {
      name: 'mobile',
      testMatch: ['**/testMobile.spec.ts'],
      use:{
        ...devices['Galaxy S9+']
      }
    }
  ],

});
