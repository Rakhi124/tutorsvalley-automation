import { onboardingPage } from '../../../pages/tutor/onboardingPage'
import { loginPage } from '../../../pages/loginPage'

describe('Tutor Onboarding & Profile', () => {
  before(() => {
    cy.fixture('tutorCredentials').as('creds')
    cy.fixture('tutorOnboarding').as('onboard')
  })

  it('Complete onboarding happy path', function () {
    // login first (if onboarding requires authenticated tutor)
    loginPage.login(this.creds.email, this.creds.password)
    // navigate to onboarding if not auto
    cy.visit('/tutor/onboarding') // adjust path as per app
    cy.url().should('include', '/onboarding')

    // Basic Details
    onboardingPage.fillBasicDetails(this.onboard.basicDetails)

    // Contact
    onboardingPage.fillContactDetails(this.onboard.contactDetails)

    // Courses: add first course example
    this.onboard.courses.forEach(course => {
      onboardingPage.addCourseBtn().click()
      cy.get('.course-row').last().within(() => {
        cy.get('input[name="course"]').type(course.name)
        course.levels.forEach(level => {
          // assume levels are checkbox values
          cy.get(`input[type="checkbox"][value="${level}"]`).check({ force: true })
        })
      })
    })
    onboardingPage.nextBtn().click()

    // About and uploads
    onboardingPage.uploadDocuments(this.onboard.about)

    // Availability & Rates
    onboardingPage.setAvailability(this.onboard.availability)

    // Qualification step (simplified)
    // assume there is a qualification upload area
    cy.get('input[type="file"][name="qualification"]').attachFile('files/resume-sample.pdf')
    onboardingPage.nextBtn().click()

    // Submit
    cy.get('button:contains("Submit Application")').click()

    // Confirmation
    cy.get('.alert-success').should('contain', 'submitted').and('be.visible')
  })

  it('Verify profile reflects submitted data', function () {
    cy.visit('/tutor/profile')
    cy.get('.profile-name').should('contain', this.onboard.basicDetails.fullName)
    cy.get('.profile-headline').should('contain', this.onboard.about.headline)
  })
})
