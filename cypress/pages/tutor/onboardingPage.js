class OnboardingPage {
  // selectors — use stable data-* attributes in app when possible
  nextBtn() { return cy.get('button:contains("Next"), button[data-testid="next"]') }
  submitBtn() { return cy.get('button:contains("Submit"), button[type="submit"]') }

  // Step 1 Basic Details
  fullName() { return cy.get('input[name="fullName"], input[data-testid="fullName"]') }
  dob() { return cy.get('input[name="dob"]') }
  genderSelect() { return cy.get('select[name="gender"]') }
  nationality() { return cy.get('input[name="nationality"]') }
  languages() { return cy.get('input[name="languages"]') }

  // Step 2 Contact
  address() { return cy.get('textarea[name="address"]') }
  countrySelect() { return cy.get('select[name="country"]') }
  stateInput() { return cy.get('input[name="state"]') }
  cityInput() { return cy.get('input[name="city"]') }
  postalCode() { return cy.get('input[name="postalCode"]') }
  phoneInput() { return cy.get('input[name="phone"]') }

  // Step 3 Courses
  addCourseBtn() { return cy.get('button:contains("Add Course")') }
  courseSelect() { return cy.get('select[name="course"]') }
  levelCheckbox(level) { return cy.get(`input[type="checkbox"][value="${level}"]`) }

  // Step 4 About & uploads
  resumeUpload() { return cy.get('input[type="file"][name="resume"]') }
  dbsUpload() { return cy.get('input[type="file"][name="dbs"]') }
  headline() { return cy.get('input[name="headline"]') }
  bio() { return cy.get('textarea[name="bio"]') }

  // Step 5 Availability
  timezoneSelect() { return cy.get('select[name="timezone"]') }
  addSlotBtn() { return cy.get('button:contains("Add Slot")') }
  daySelect() { return cy.get('select[name="day"]') }
  fromInput() { return cy.get('input[name="from"]') }
  toInput() { return cy.get('input[name="to"]') }

  // convenience flows
  fillBasicDetails(basic) {
    this.fullName().clear().type(basic.fullName)
    this.dob().clear().type(basic.dob)
    this.genderSelect().select(basic.gender)
    this.nationality().clear().type(basic.nationality)
    // languages may be tokenized input; send comma-separated then blur
    this.languages().clear().type(basic.languages.join(',')).blur()
    this.nextBtn().click()
  }

  fillContactDetails(contact) {
    this.address().clear().type(contact.address)
    this.countrySelect().select(contact.country)
    this.stateInput().clear().type(contact.state)
    this.cityInput().clear().type(contact.city)
    this.postalCode().clear().type(contact.postalCode)
    this.phoneInput().clear().type(contact.mobile)
    this.nextBtn().click()
  }

  uploadDocuments(about) {
    this.headline().clear().type(about.headline)
    this.bio().clear().type(about.bio)
    // use fixtures path: 'files/resume-sample.pdf'
    this.resumeUpload().attachFile(about.resume) // using cypress-file-upload
    this.dbsUpload().attachFile(about.dbs)
    this.nextBtn().click()
  }

  setAvailability(av) {
    this.timezoneSelect().select(av.timezone)
    av.slots.forEach(slot => {
      this.addSlotBtn().click()
      // depending on the DOM, select the last slot row
      cy.get('.availability-row').last().within(() => {
        cy.get('select[name="day"]').select(slot.day)
        cy.get('input[name="from"]').clear().type(slot.from)
        cy.get('input[name="to"]').clear().type(slot.to)
      })
    })
    cy.get('input[name="rate"]').clear().type(av.rate)
    this.nextBtn().click()
  }
}

export const onboardingPage = new OnboardingPage()
