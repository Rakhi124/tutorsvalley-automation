import { loginPage } from '../../pages/loginPage'

describe('Tutor Login Flow', () => {

  beforeEach(() => {
    cy.fixture('tutorCredentials').as('creds')
    cy.clearAppData()
  })

  it('should login tutor, accept modal & verify dashboard & store token', function () {

    // Intercept login API
    cy.intercept('POST', '/api/v1/login').as('tutorLogin')

    // Perform UI Login
    loginPage.login(this.creds.email, this.creds.password)

    cy.wait('@tutorLogin')
      .its('response.statusCode')
      .should('eq', 200)

    // Ensure T&C Modal is visible
    cy.get('.modal-content', { timeout: 10000 })
      .should('be.visible')

    // Scroll & Click "I Agree" Button
    cy.contains('button', 'I Agree')
      .scrollIntoView()
      .should('be.visible')
      .click()

    // Verify redirected to Tutor Dashboard
    cy.url().should('include', '/tutor')

    // Verify Welcome message
    cy.contains('Welcome, DEMO.TUTOR', { timeout: 10000 })
      .should('be.visible')

    // Verify Token in LocalStorage
    cy.verifyToken()
  })

  it('should fail login with invalid password', function () {
    cy.intercept('POST', '/api/v1/login').as('loginFail')

    loginPage.login(this.creds.email, 'wrongpassword')

    cy.wait('@loginFail')
      .its('response.statusCode')
      .should('eq', 400)

    cy.contains('Invalid login credentials').should('be.visible')
    cy.url().should('include', '/login')
  })

})
