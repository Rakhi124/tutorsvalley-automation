import { loginPage } from '../../pages/loginPage'

describe('Tutor Login Flow', () => {
  beforeEach(() => {
    cy.fixture('tutorCredentials').as('creds')
    cy.clearAppData()
  })

  it('should login tutor with valid credentials and land on dashboard', function () {
    loginPage.login(this.creds.email, this.creds.password)
    // verify dashboard visible
    cy.url().should('include', '/dashboard')
    cy.get('h1, h2').should('contain.text', 'Dashboard').or('contain.text', 'Welcome')
    // optional: check analytics widget
    cy.get('[data-testid="analytics-widget"]').should('be.visible')
  })

  it('should fail login with invalid password', function () {
    loginPage.login(this.creds.email, 'wrongpassword')
    cy.get('.error-message, .alert-danger').should('be.visible').and('contain', 'Invalid')
    cy.url().should('include', '/login')
  })
})
