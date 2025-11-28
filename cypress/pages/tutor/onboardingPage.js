class OnboardingPage {

  nextBtn() { return cy.get('[class="bi bi-arrow-right"]').should('be.visible') }
  submitBtn() { return cy.get('[data-testid="submit"], button[type="submit"]').should('be.visible') }

  clickNext() { this.nextBtn().scrollIntoView().click({ force:true }) }
  clickSubmit() { this.submitBtn().scrollIntoView().click({ force:true }) }

  // STEP 1
  //fullName() { return cy.get('[name="fullName"]') }
  firstName() { return cy.get('[name="firstName"]') }
  lastName() { return cy.get('[name="lastName"]') }
  email(){return cy.get('[name="email"')}
  //dob() { return cy.get('[name="dob"]') }
 // genderSelect() { return cy.get('[name="gender"]') }
  //nationality() { return cy.get('[name="nationality"]') }
  //languages() { return cy.get('[name="languages"]') }

  // STEP 2
  address() { return cy.get('[name="address"]') }
  countrySelect() { return cy.get('[name="country"]') }
  stateInput() { return cy.get('[name="state"]') }
  cityInput() { return cy.get('[name="city"]') }
  postalCode() { return cy.get('[name="postalCode"]') }
  phoneInput() { return cy.get('[name="phone"]') }

  // STEP 3
  addCourseBtn() { return cy.contains('button', 'Add Course') }
  courseSelect() { return cy.get('[name="course"]') }
  levelCheckbox(level) { return cy.get(`input[type="checkbox"][value="${level}"]`) }

  // STEP 4
  resumeUpload() { return cy.get('input[type="file"][name="resume"]') }
  dbsUpload() { return cy.get('input[type="file"][name="dbs"]') }
  headline() { return cy.get('[name="headline"]') }
  bio() { return cy.get('[name="bio"]') }

  // STEP 5
  timezoneSelect() { return cy.get('[name="timezone"]') }
  addSlotBtn() { return cy.contains('button', 'Add Slot') }
  rateInput() { return cy.get('[name="rate"]') }

  // FLOWS
  fillBasicDetails(basic) {
    //this.fullName().clear().type(basic.fullName)
    this.firstName().clear().type(basic.firstName)
    this.lastName().clear().type(basic.lastName)
    this.email().clear().type(basic.email)
    //this.dob().clear().type(basic.dob)
    //this.genderSelect().select(basic.gender)
    //this.nationality().clear().type(basic.nationality)
    //this.languages().clear().type(basic.languages.join(',')).blur()
    this.clickNext()
  }

  fillContactDetails(contact) {
    this.address().clear().type(contact.address)
    this.countrySelect().select(contact.country)
    this.stateInput().clear().type(contact.state)
    this.cityInput().clear().type(contact.city)
    this.postalCode().clear().type(contact.postalCode)
    this.phoneInput().clear().type(contact.mobile)
    this.clickNext()
  }

  uploadDocuments(about) {
    this.headline().clear().type(about.headline)
    this.bio().clear().type(about.bio)
    this.resumeUpload().attachFile(about.resume)
    this.dbsUpload().attachFile(about.dbs)
    this.clickNext()
  }

  setAvailability(av) {
    this.timezoneSelect().select(av.timezone)

    av.slots.forEach(slot => {
      this.addSlotBtn().click()
      cy.get('.availability-row').last().within(() => {
        cy.get('[name="day"]').select(slot.day)
        cy.get('[name="from"]').clear().type(slot.from)
        cy.get('[name="to"]').clear().type(slot.to)
      })
    })

    this.rateInput().clear().type(av.rate)
    this.clickNext()
  }
}

export const onboardingPage = new OnboardingPage()
