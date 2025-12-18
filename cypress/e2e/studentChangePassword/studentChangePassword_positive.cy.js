import studentChangePassword from "../../pages/studentChangePassword";
//import validStudent from "../../../fixtures/studentLogin.json";
import validChangePassword from "../../fixtures/studentChangePasswordData.json";

describe('Student Change Passowrd', () => {

    let pswdchng
    let userData
    before(() => {
        cy.fixture('studentChangePasswordData').then((pswd) => {
        pswdchng = pswd.validChangePassword});
        cy.fixture('studentCredentials').then((creds) => {
        userData = creds.validStudent});
        cy.clearAppData()
    })

 it('Should allow Login, Change password, and Re-login with new password', () => {

    // Intercept Change Password API
    cy.intercept('POST', '/api/v1/student/change-password').as('changePassword')

    cy.studentLogin(userData.email, userData.password, userData.firstname, userData.lastname); // login

    studentChangePassword.studentChangePassword(pswdchng.currentpassword, pswdchng.newpassword, pswdchng.confirmpassword);// change passowrd

    // Waits until the 'Change Password' request completes
    cy.wait('@changePassword')
    .its('response.statusCode')
    .should('eq', 200) 

    cy.get('div.Toastify__toast-body > div:nth-child(2)').should('have.text', 'Password Changed successfully!').should('be.visible');  // Assert Password Changed successfully! message
    cy.wait(1000);
    cy.get('button > svg > path').click();
    cy.wait(1000);
    


    // 3. Logout (optional, but good practice before re-login)
    cy.get('button[id="user-dropdown"]').click();
    cy.wait(1000);
    cy.get('span.menu_link').contains('Logout').click(); //Logout
    cy.wait(1000);
    cy.url().should('include', '/login');

    // 4. Re-login with New Password
   cy.studentLogin(userData.email, pswdchng.newpassword, userData.firstname, userData.lastname);

   // 5. Password Reset to old password 
   studentChangePassword.studentChangePassword (pswdchng.newpassword, pswdchng.currentpassword, pswdchng.currentpassword);

     // Waits until the 'Change Password' request completes
     cy.wait('@changePassword')
     .its('response.statusCode')
     .should('eq', 200) 

    cy.get('div.Toastify__toast-body > div:nth-child(2)').should('have.text', 'Password Changed successfully!').should('be.visible');  // Assert Password Changed successfully! message
    cy.wait(1000);
    cy.get('button > svg > path').click();
    cy.get('button[id="user-dropdown"]').click();
    cy.wait(1000);
    cy.get('span.menu_link').contains('Logout').click(); //Logout
    cy.wait(1000);
    cy.url().should('include', '/login');
    cy.studentLogin(userData.email, pswdchng.currentpassword, userData.firstname, userData.lastname);

  });
});