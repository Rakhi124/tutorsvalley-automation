import studentLoginPage from "../../pages/studentLoginPage";

describe('Student Login - Negative testcases', () => {
   // let userData;
     
     before(() => {
        cy.visit('/login');
         cy.fixture('studentCredentials').then((userData) => {
         //userData = creds.wrongCredentials});
         cy.clearAppData()
        
     })
    
     userData.wrongCredentials.forEach((creds) => {
       it('Student Login (Negative testcase)', function () 
       {
        studentLoginPage.wrongcredlogin(creds.email, creds.password, creds.errorMessage) //Wrong credentials login 
       //cy.studentLogin(creds.email, creds.password);
     })});
    
   });
});