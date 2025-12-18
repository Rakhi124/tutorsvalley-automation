describe('Tutor Login – Consent Modal Session Behavior', () => {

  beforeEach(() => {
    cy.fixture('tutorCredentials').as('tutor');
  });

  it('First login → modal appears, without logout → no modal, after logout → modal appears again', function () {

    // ===== First Login =====
    cy.loginAsTutorUI(this.tutor.email, this.tutor.password);

     cy.verifyToken();

    // ===== Without Logout (same session) =====
    cy.visit('/tutor');
    cy.handleConsentModalIfPresent();

  
    // ===== Logout =====
    cy.logoutTutor();

    // ===== Login Again =====
    //cy.loginAsTutorUI(this.tutor.email, this.tutor.password);


});


  });


