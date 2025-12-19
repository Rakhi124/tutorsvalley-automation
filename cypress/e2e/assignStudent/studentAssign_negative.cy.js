import LoginPage from '../../Pages/LoginPage';
import QuizPage from '../../Pages/QuizPage';
import AssignStudentsPage from '../../Pages/AssignStudentsPage';


const loginPage = new LoginPage();
const quizPage = new QuizPage();
const assignPage = new AssignStudentsPage();

describe('Quiz Module – Negative Tests', () => {

  let data;

  before(() => {
    cy.fixture("quizdata").then((json) => {
      data = json;
    });
  });

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


  it('Shows No data found when selecting a date with no quizzes', () => {
    quizPage.open();
    quizPage.selectDay(data.invalidDate.day, data.invalidDate.month, data.invalidDate.year);
    quizPage.assertNoDataFound();
    quizPage.closeCalendar();
  });

  it('Shows no results for invalid search text', () => {
    quizPage.searchQuiz(data.invalidSearch);
    quizPage.assertNoQuizResults();
  });

  it("Shows validation toast when submitting without selecting a student", () => {
    assignPage.clickAssignStudentsInFirstCard();
    assignPage.verifyAssignStudentModalOpen();

    cy.get('button.btn.btn-primary.border-radius-20')
      .first()
      .click({ force: true });

    assignPage.verifySelectStudentToast();
  });

});
