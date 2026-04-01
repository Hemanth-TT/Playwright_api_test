import { expect } from '@playwright/test';



export class PIMPage {


    constructor(page) {

        this.page = page;
        this.PIM_module = page.getByRole('link', { name: 'PIM' });
        this.PIM_page = page.locator("//h6[text()='PIM']");
        this.Add_employee = page.locator("//a[text()='Add Employee']");
        this.employeeId = page.locator('label:has-text("Employee Id")').locator('xpath=following::input[1]');
        this.FirstName = page.getByPlaceholder('First Name');
        this.LastName = page.getByPlaceholder('Last Name');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.checkbox = page.locator("//input[@type='checkbox']");
        this.personal_details = page.getByRole('link', { name: 'Personal Details' });
        this.nationality_drpdwn = page.locator("//div[text()='-- Select --']").first();
        this.marital_drpdwn = page.locator("//div[text()='-- Select --']").last();
        this.dob = page.getByPlaceholder('yyyy-mm-dd').last();
        this.savetoast = page.locator('#oxd-toaster_1');
        this.employee_List_Tab = page.getByText('Employee List', { exact: true });
        this.delete_btn = page.locator("//i[@class='oxd-icon bi-trash']");
        this.search_btn = page.getByRole('button', { name: 'Search' })
        this.searchEmpIdInput = page.locator('label:has-text("Employee Id")').locator('xpath=following::input[1]');
        this.resultTable = page.locator('.oxd-table-body');
        this.confirmDelete = page.getByRole('button', { name: 'Yes, Delete' });
        this.noRecordtoast= page.locator("//div[@id='oxd-toaster_1']");




    }

    async navigate_PIM_module() {

        await this.PIM_module.click();
        await expect(this.PIM_page).toBeVisible();

    }


    async add_employee_tab() {

        await this.Add_employee.click();
        await expect(this.page).toHaveURL(/addEmployee/);
        await expect(this.FirstName).toBeVisible();

    }

    async addEmployee(firstname, lastname) {

        await this.FirstName.fill(firstname);
        await this.LastName.fill(lastname);
        await this.saveBtn.click();
    }

    async getEmployeeId() {

        await expect(this.page).toHaveURL(/viewPersonalDetails/);
        const id = await this.employeeId.inputValue();
        await expect(this.employeeId).not.toHaveValue('');
        console.log("capture employee id:", id);
        return id;

    }

    async addEmployee_full(Nationality, Marital_status, DOB, Gender) {


        await expect(this.page).toHaveURL(/viewPersonalDetails/);
        await expect(this.personal_details).toBeVisible();

        //nationality
        await this.nationality_drpdwn.click()
        const nationality = this.page.getByRole('option', { name: Nationality });
        await nationality.click();
        //marital
        await this.marital_drpdwn.click();
        const marital = this.page.getByText(`${Marital_status}`)
        await marital.click();
        //DOB--yyyy-mm-dd
        await this.dob.fill(DOB);
        //gender
        const genderOption = this.page.getByText(Gender, { exact: true });
        await expect(genderOption).toBeVisible();
        await genderOption.click();
        //save
        await this.saveBtn.click();
        await expect(this.page.getByText('Successfully Updated')).toBeVisible();
    }

    async searchEmployeeById(empId) {


        await this.employee_List_Tab.click();
        await this.searchEmpIdInput.fill(empId);
        await this.search_btn.click();


    }
    async assertEmployeePresent(empId) {

        await expect(this.resultTable).toContainText(empId);

    }
    async editEmployeeById(empId, newName) {

        const row = this.page.locator('.oxd-table-row').filter({ hasText: empId });
        await expect(row).toBeVisible();

        await row.locator('i.bi-pencil-fill').click();
        await expect(this.FirstName).toBeVisible();
        await this.FirstName.fill(newName);
        await this.saveBtn.click();
        await expect(this.page).toHaveURL(/viewPersonalDetails/);
    }

    async deleteEmployeeById(empId) {

        const row = this.page.locator('.oxd-table-row').filter({ hasText: empId });
        await expect(row).toBeVisible();

        await row.locator('i.bi-trash').click();
        // wait for confirm popup
        await expect(this.confirmDelete).toBeVisible();

        await this.confirmDelete.click();
        await expect(this.page.getByText('Successfully Deleted')).toBeVisible();

    }

    // async assertEmployeeDeleted(empId) {

    //     const row = this.page.locator('.oxd-table-row').filter({ hasText: empId });
    //     await expect(row).toHaveCount(0);
    // }

    async assertEmployeeDeleted(empId) {

    await expect(this.noRecordtoast).toBeVisible({ timeout: 10000 });
}


}


