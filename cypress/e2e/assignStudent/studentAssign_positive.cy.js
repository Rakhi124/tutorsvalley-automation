import LoginPage from '../../Pages/LoginPage';
import QuizPage from '../../Pages/QuizPage';
import AssignStudentsPage from '../../Pages/AssignStudentsPage';


const loginPage = new LoginPage();
const quizPage = new QuizPage();
const assignPage = new AssignStudentsPage();

describe('Quiz Module – Positive Tests', () => {

  let data;

  // Load fixture ONCE
  before(() => {
    cy.fixture("quizdata").then((json) => {
      data = json;
    });
  });

  // ----------------------------------------------------
  // Runs BEFORE every test
  // ----------------------------------------------------
  beforeEach(() => {

    cy.fixture("logincred").then(({ email, password }) => {
    loginPage.login(email, password);
  });
    quizPage.handlePopups()
  // Handle popups
   quizPage.clickAgreeButton();
   quizPage.clickCloseModal(); // ✅ removed unused timeout
   cy.wait(4000);
   
   cy.get('.modal:visible', { timeout: 10000 }).should('not.exist');

  // Navigate to Quiz Page
  quizPage.openMenu()
  cy.wait(6000); // ✅ wait for menu animation
  
  
  

  quizPage.clickQuizMenu();
  cy.intercept("POST", "**/tutor/quiz/list").as("getQuizList");

  // ✅ MUST wait for quiz list
  cy.wait("@getQuizList");

  
  
  });

  it('Selects a valid date and assigns students', () => {
    quizPage.open();
    quizPage.selectDay(data.validDate.day, data.validDate.month, data.validDate.year);
    cy.wait("@getQuizList"); 
    assignPage.clickAssignStudentsForQuiz(data.quizTitle1); 
    assignPage.verifyAssignStudentModalOpen();
    assignPage.assignStudentsFlow();

});
  it('Searches for a quiz by typing valid quiz title and assign students', () => {
    quizPage.searchQuiz(data.validSearch);
    cy.wait("@getQuizList");
    assignPage.clickAssignStudentsForQuiz(data.quizTitle2); 
    assignPage.verifyAssignStudentModalOpen();
    assignPage.assignStudentsFlow();


  });

  
});
