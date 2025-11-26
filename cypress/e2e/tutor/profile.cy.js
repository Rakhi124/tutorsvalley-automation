import { loginPage } from '../../pages/loginPage'
import { dashboardPage } from '../../pages/tutor/dashboardPage'

describe('Tutor Profile & Dashboard Validation', () => {

  before(function () {
    cy.fixture('tutorCredentials').as('creds')
  })

  beforeEach(function () {
    cy.clearAppData()
    loginPage.login(this.creds.email, this.creds.password)
  })

  it('Validate Tutor Dashboard Metrics', () => {
    cy.url().should('include', '/dashboard')
    dashboardPage.analyticsWidget().should('be.visible')

    // Example verify metrics are showing numbers
    dashboardPage.analyticsWidget().within(() => {
      cy.contains('Total Sessions').next().invoke('text').should('match', /^[0-9]+$/)
      cy.contains('Completed').next().invoke('text').should('match', /^[0-9]+$/)
    })
  })

  it('Update Profile Information and Validate Save', function () {
    cy.visit('/tutor/profile')
    cy.url().should('include', '/profile')

    cy.get('input[name="headline"]').clear().type('Updated Automation Tutor Profile')
    cy.get('textarea[name="bio"]').clear().type('Automation Testing expert with Cypress & JS')
    cy.get('button:contains("Save Changes")').click()

    cy.get('.alert-success,.toast-success')
      .should('contain', 'updated')
      .and('be.visible')

    // validate that change is reflected
    cy.reload()
    cy.get('input[name="headline"]').should('have.value', 'Updated Automation Tutor Profile')
  })

  it('Upload Profile Picture', () => {
    cy.visit('/tutor/profile')
    cy.get('input[type="file"][name="avatar"]').attachFile('files/sample-avatar.png')
    cy.get('button:contains("Upload")').click()

    cy.get('.alert-success,.toast-success')
      .should('contain', 'uploaded')
      .and('be.visible')
  })
})
