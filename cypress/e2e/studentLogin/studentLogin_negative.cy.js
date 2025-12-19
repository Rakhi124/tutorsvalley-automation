import studentLoginPage from "../../pages/studentLoginPage"
import negativecreds from "../../fixtures/studentCredentials.json";

describe('Student Login - Negative testcases', () => {
     
     beforeEach(() => {
         cy.visit('/login');
         cy.clearAppData()
        
     }) 
   
    // Wrong Credential Login
    negativecreds.wrongCredentials.forEach((cred) => {
       it(cred.Description, function () 
       {
        studentLoginPage.wrongcredlogin(cred)  // Wrong Credential Login
     })});

    //Invalid credentials login 
     negativecreds.invalidCredentials.forEach((cred) => {
        it(cred.Description, function () 
        {
         studentLoginPage.invalidcredlogin(cred) //Invalid credentials login 
      })}); 
    
   
});