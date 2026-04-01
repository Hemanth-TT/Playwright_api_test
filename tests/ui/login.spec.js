import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageObject/LoginPage';

test('valid login', async ({ page }) => {


    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.assertLoginPage();

    await loginPage.login('admin', 'Admin@1234');
    await loginPage.assertDashboard();

    await loginPage.logout();
    await loginPage.assertLoginPage();

});


test('invalid login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigate();
  await login.assertLoginPage();
  await login.login('Admin', '000@fet');

  await expect(page.getByText('Invalid credentials')).toBeVisible();
});
