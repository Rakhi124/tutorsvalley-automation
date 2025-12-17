import {
  createQuestion,
  editCreatedQuestion,
  deleteCreatedQuestion,
} from '../../pages/questionsPage'; // adjust path if needed
 
describe('Tutor Create Questions Flow', () => {
 
  // before(() => {
  //   cy.clearAppData();
 
  //   // Load login data from fixture and login
  //   cy.fixture('loginData').then((data) => {
  //  cy.loginAsTutorUI(data.tutor.email, data.tutor.password);

  //   });
  // });
 

  it('should create, edit and delete a question', () => {

   // cy.loginTutorUI(data.tutor.email, data.tutor.password);
    createQuestion();
    editCreatedQuestion();
    deleteCreatedQuestion();
  });
 
});