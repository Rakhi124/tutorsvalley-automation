import { landingPage } from '../../pages/landingPage'
import { onboardingPage } from '../../pages/tutor/onboardingPage'

describe('Tutor Onboarding – Full Workflow Test Suite', function () {

  before(function () {
    cy.fixture('onboarding').then(data => {
      this.data = data
    })
  })

  it('TC01 🟢 Should complete Tutor Onboarding End-to-End Successfully', function () {

    cy.log('STEP 1: Navigate to Tutor Registration')
    landingPage.navigateToTutorRegistration()

    cy.log('STEP 2: Basic Details')
    onboardingPage.fillBasicDetails(this.data.basic)

    cy.log('STEP 3: Contact Details')
    onboardingPage.fillContactDetails(this.data.contact)

    cy.log('STEP 4: Documents & About Section')
    onboardingPage.uploadDocuments(this.data.about)

    cy.log('STEP 5: Availability')
    onboardingPage.setAvailability(this.data.availability)

    cy.log('STEP 6: Submit')
    onboardingPage.clickSubmit()

    cy.url().should('contain', 'success')
  })
})
