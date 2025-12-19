import studentChangePassword from "../../pages/studentChangePassword";
import chngpswdata from "../../fixtures/studentChangePasswordData.json";

describe('Student Change Passowrd - Negative Testcases', () => {

    let userData
    before(() => {
      cy.fixture('studentCredentials').then((creds) => {
        userData = creds.validStudent});
        cy.clearAppData()
    })

        
    
    chngpswdata.invalidChangePassword.forEach((cred) => {
    
      it(cred.Description, function () 
      {
        cy.studentLogin(userData.email, userData.password, userData.firstname, userData.lastname); // login
        studentChangePassword.chngepswnav()

        studentChangePassword.studentChangePassword(cred.currentpassword, cred.newpassword, cred.confirmpassword, cred.wrongpassword, cred.message)  // Wrong Credential Login
        if (cred.currentpassword == cred.wrongpassword) 
          {
            cy.intercept('POST', '/api/v1/student/change-password').as('changePassword')

            cy.wait('@changePassword')
            .its('response.statusCode')
            .should('eq', 422) 

           cy.get('div.Toastify__toast-body > div:nth-child(2)').should('have.text', cred.message).should('be.visible'); // Assertion : Assuming an element with class 'error-message' displays the error
          cy.wait(1000)
          }
       if (cred.newpassword != cred.confirmpassword)
        {
          cy.get('p[class="text-danger"]').should('have.text', cred.message).should('be.visible');
        }
      }
  )});

});