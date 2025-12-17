import {
  createQuestion,
  editCreatedQuestion,
  deleteCreatedQuestion,
} from '../../pages/questionsPage'; // adjust path if needed
 
describe('Tutor Create Questions Flow', () => {
 
  before(() => {
    cy.clearAppData();
 
    // Load login data from fixture and login
    cy.fixture('loginData').then((data) => {
   cy.loginTutorUI(data.tutor.email, data.tutor.password);
   cy.acceptModalIfPresent();



 /*
      // Handle modal after login
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("I Agree")').length > 0) {
            cy.contains('button', 'I Agree')
            .scrollIntoView()       // scroll before clicking
            .should('be.visible')
            .click({ force: true });
        }
      });*/
 
      // Confirm dashboard loaded
      //cy.url().should('include', '/tutor'); // replace with real dashboard path if needed
    });
  });
 

  it('should create, edit and delete a question', () => {

   // cy.loginTutorUI(data.tutor.email, data.tutor.password);
    createQuestion();
    editCreatedQuestion();
    deleteCreatedQuestion();
  });
 
});