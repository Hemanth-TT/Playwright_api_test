import { expect } from "@playwright/test";


export class LoginPage {

    constructor(page) {

        this.page = page;

        this.UserName = page.getByPlaceholder('Username');
        this.Password = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        
        this.menuItem = page.locator("//span[@class='oxd-userdropdown-tab']");
        this.logoutbtn = page.locator('a').filter({ hasText: 'Logout' });

    }
    async navigate(){
        
        await this.page.goto('/web/index.php/auth/login'); 
        await this.page.waitForLoadState('domcontentloaded');

    }

    async assertLoginPage() {

        console.log(await this.page.title());
        await expect(this.page).toHaveTitle("OrangeHRM");

    }

    async login(username, password) {

        await this.UserName.fill(username);
        await this.Password.fill(password);
        await this.loginBtn.click();


    }

    async assertDashboard() {

        await expect(this.page.locator('h6').filter({ hasText: 'Dashboard' })).toBeVisible();

    }


    async logout() {


        await this.menuItem.click();
        await this.logoutbtn.click();


    }




}

module.exports = { LoginPage };