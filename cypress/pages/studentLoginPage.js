class studentLoginPage {

    wrongcredlogin(email, password, errorMessage)  {  

        // Intercept login API
        cy.intercept('POST', '/api/v1/login').as('loginFail')
    
        // cy.studentLogin(creds.email, creds.password);
        this.enterEmail(email)
        this.enterPassword(password)
        cy.scrollTo('top');
    
       // Waits until the 'studentLogin' request completes
       cy.wait('@loginFail')
       .its('response.statusCode')
       .should('eq', 400)
       
        cy.get(' div.Toastify__toast-body > div:nth-child(2)').should('have.text', errorMessage); // Assertion : Assuming an element with class 'error-message' displays the error. 
        cy.wait(1000);
        cy.url().should('include', '/login'); // Assert that the user remains on the login page
    }
     
    
      enterEmail(email) {
        const input = cy.get('input[name="email"]');
        input.clear();
        if (email) {
          input.type(email);
        }
      }

      enterPassword(password) {
        const input = cy.get('input[type="lastName"]');
        input.clear();
        if (password) {
          input.type(password);
        }
      }


};
export default new StudentChangePassword();















//     visit() { cy.visit('/login') }
//     emailInput() {
//       return cy.get('form').find('input[name="email"]:visible')
//     }
  
//     //emailInput() { return cy.get('input[type="email"]') }
//     passwordInput() { return cy.get('input[type="password"]') }
//     submitBtn() { return cy.get('button[type="submit"], button:contains("Login")').first() }
  
//     studentLogin(email, password) {
//       this.visit()
//       this.emailInput().clear().type(email)
//       this.passwordInput().clear().type(password, { log: false })
//       this.submitBtn().click()
//     }
//   }
//   export const loginPage = new studentLoginPage()
  