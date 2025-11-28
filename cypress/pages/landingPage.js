class LandingPage {
  becomeTutorMenu() { return cy.contains('a', 'Become a Student / Tutor ').trigger('mouseover') }
  enrollTutorBtn() { return cy.contains('a', 'Enroll as Tutor') }

  navigateToTutorRegistration() {
    cy.visit('/')  // baseUrl set in cypress.config.js
    this.becomeTutorMenu()
    this.enrollTutorBtn().click({ force: true })
  }
}

export const landingPage = new LandingPage()
