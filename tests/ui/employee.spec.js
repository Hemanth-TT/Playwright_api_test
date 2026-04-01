import { test, expect } from '@playwright/test';
import { PIMPage } from '../../pageObject/PIMPage';
import { LoginPage } from '../../pageObject/LoginPage';

test('PIM add employee', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.assertLoginPage();
    await loginPage.login('admin', 'Admin@1234');
    await loginPage.assertDashboard();

    const pimpage = new PIMPage(page);
    await pimpage.navigate_PIM_module();
    await pimpage.add_employee_tab();
    
    const name= "Jimow"+Date.now();
    await pimpage.addEmployee(name, "jack");
    //personal details
    await pimpage.addEmployee_full("Indian","Single","1996-11-10","Female")

    // capture ID once
    const empId = await pimpage.getEmployeeId();
    console.log(`Created Employee: ${name}, ID: ${empId}`);

    //search and validate  //navigate to employee list
    await pimpage.employee_List_Tab.click();
    await expect(page).toHaveURL(/viewEmployeeList/);
    await pimpage.searchEmployeeById(empId);
    await pimpage.assertEmployeePresent(empId);

    //edit

    await pimpage.editEmployeeById(empId, "Sorn")
    // Verify again
    await pimpage.searchEmployeeById(empId);
    await pimpage.assertEmployeePresent(empId);


    //delete
    await pimpage.deleteEmployeeById(empId)

    //validate delete
    await pimpage.searchEmployeeById(empId);
    await pimpage.assertEmployeeDeleted();


});

