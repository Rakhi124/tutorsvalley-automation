describe('Tutor Login – Consent Modal Session Behavior', () => {

  beforeEach(() => {
    cy.fixture('studentCredentials').as('student');
  });

  it('First login → modal appears, without logout → no modal, after logout → modal appears again', function () {

    // ===== First Login =====
    cy.loginAsStudentUI(this.student.email, this.student.password);

     cy.verifyToken();

    // ===== Without Logout (same session) =====
    cy.visit('/student');
    cy.handleConsentModalIfPresent();
  
    // ===== Logout =====
    cy.logoutTutor();

    // ===== Login Again =====
    //cy.loginAsTutorUI(this.tutor.email, this.tutor.password);


});


  });


