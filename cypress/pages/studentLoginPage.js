class studentLoginPage {

    wrongcredlogin(data)  {  

        // Intercept login API
        cy.intercept('POST', '/api/v1/login').as('loginFail')
    
        this.loginSteps(data)
        
       
    
       // Waits until the 'studentLogin' request completes
       cy.wait('@loginFail')
       .its('response.statusCode')
       .should('eq', 400)
       
        cy.get(' div.Toastify__toast-body > div:nth-child(2)').should('have.text', data.errorMessage); // Assertion : Assuming an element with class 'error-message' displays the error. 
        cy.wait(1000);
        cy.url().should('include', '/login'); // Assert that the user remains on the login page
    }
     

    invalidcredlogin(data)  {  
        this.loginSteps(data)
        cy.wait(1000);
        if ((data.email == null)  && (data.password != null))
            {
            cy.get('div.row.login-box > div:nth-child(1) > div > p').should('have.text', data.errorMessage); // Assertion : Assuming an element with class 'error-message' displays the error.
           }
          else if  ((data.email != null) && (data.password == null))
            {
            cy.get('div.row.login-box > div:nth-child(2) > div > p').should('have.text', data.errorMessage);  // Assertion : Assuming an element with class 'error-message' displays the error.
            }
            else if ((data.email == data.email)  && (data.password != null))
              {
              cy.get('div.row.login-box > div:nth-child(1) > div > p').should('have.text', data.errorMessage); // Assertion : Assuming an element with class 'error-message' displays the error.
             }
        
            else
             {
            cy.get('div.row.login-box > div:nth-child(1) > div > p').should('have.text', data.errorMessage[0]); // Assertion : Assuming an element with class 'error-message' displays the error.
            cy.get('div.row.login-box > div:nth-child(2) > div > p').should('have.text', data.errorMessage[1]); // Assertion : Assuming an element with class 'error-message' displays the error.
             }
        
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
        const input = cy.get('input[type="password"]');
        input.clear();
        if (password) {
          input.type(password);
        }
      }

      clickLoginbtn() {
        cy.get('div.mb-4 > button').contains('Login').scrollIntoView().click();
        }

   
   loginSteps(data)
   {    
    this.enterEmail(data.email)
    this.enterPassword(data.password)
    this.clickLoginbtn()
    cy.scrollTo('top');
   }  


};
export default new studentLoginPage();















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
  