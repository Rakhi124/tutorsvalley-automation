class LandingPage {
    hoverBecomeTutor() {
        cy.contains('Become a Student / Tutor').trigger('mouseover');
    }

    clickEnrollTutor() {
        cy.contains('Enroll as Tutor').click({ force: true });
    }
}

export default new LandingPage();
