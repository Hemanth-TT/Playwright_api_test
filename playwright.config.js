// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  retries: 0,

  workers: process.env.CI ? 1 : undefined,

  timeout: 40000,

  expect: {
    timeout: 15000
  },

  reporter: [
    ['html'], 
    ['list'],
    ['allure-playwright']
],

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login' ,
      // baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      //baseURL: 'http://localhost:6060/web/index.php/auth/login',
    browserName: 'chromium',
    headless: false,

    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },

 
});