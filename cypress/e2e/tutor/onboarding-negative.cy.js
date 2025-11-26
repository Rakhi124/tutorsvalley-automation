import { loginPage } from '../../../pages/loginPage'

describe('Onboarding Negative / Validation Scenarios', () => {

  before(function () {
    cy.fixture('tutorCredentials').as('creds')
  })

  beforeEach(function () {
    cy.clearAppData()
    loginPage.login(this.creds.email, this.creds.password)
    cy.visit('/tutor/onboarding')
  })

  it('Should show validation errors if required fields left blank', () => {
    cy.get('button:contains("Next")').click()
    cy.get('.error-message,.validation-error')
      .should('contain', 'Required')
      .and('be.visible')
  })

  it('Reject unsupported file types for resume upload', () => {
    cy.get('input[type="file"][name="resume"]').attachFile('files/sample.txt')
    cy.get('.error-message,.alert-danger')
      .should('contain', 'Invalid')
  })

  it('Reject file greater than 5MB', () => {
    cy.get('input[type="file"][name="resume"]').attachFile({
      filePath: 'files/largeFile.pdf',
      encoding: 'utf-8'
    })

    cy.get('.error-message,.alert-danger')
      .should('contain', 'File too large')
  })

  it('Should display error when time slot end time is earlier than start time', () => {
    cy.get('button:contains("Add Slot")').click()

    cy.get('.availability-row').last().within(() => {
      cy.get('select[name="day"]').select('Monday')
      cy.get('input[name="from"]').type('18:00')
      cy.get('input[name="to"]').type('14:00')
    })

    cy.get('button:contains("Next")').click()

    cy.get('.error-message,.validation-error')
      .should('contain', 'End time must be greater')
  })
})
