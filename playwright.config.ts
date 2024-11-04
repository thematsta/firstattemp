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

export default defineConfig<TestOptions>({



  /* Retry on CI only */
  retries:1,
  
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    // ["allure-playwright"],
    ['html'],
  ],

  use: {
     baseURL: baseURL,


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'off'
  },

  projects: [
    {
      name: 'chromium',

    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        video: 'on'
      },
    },
    {
      name: 'mobile',
      testMatch: ['**/testMobile.spec.ts'],
      use:{
        ...devices['Galaxy S9+']
      }
    }
  ],

});
