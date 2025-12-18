

describe('Student Login - Positive testcase', () => {
   let userData;
    
    before(() => {
        cy.fixture('studentCredentials').then((creds) => {
        userData = creds.validStudent});
        cy.clearAppData()
    })
   
      it('Student Login (Positive testcase)', function () 
      {

        cy.visit('https://beta.tutorsvalley.com/'); // Opens tutorsvalley webpage
        cy.wait(1000);
        cy.get('span.top-bar-text').contains('Login').click() // Click Login and opens login page 
        cy.wait(1000);

      cy.studentLogin(userData.email, userData.password, userData.firstname, userData.lastname);
    });
        
  });