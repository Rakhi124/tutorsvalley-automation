class ContactDetailsPage {

    elements = {
        countryDropdown: () => cy.get('button[data-testid="rfs-btn"]'),
        countryOption: (countryName) => cy.contains('li', countryName),

        zipCode: () => cy.get('input[name="zipCode"]'),
        state: () => cy.get('input[name="state"]'),
        city: () => cy.get('input[name="city"]'),
        phone: () => cy.get('input[name="phone"]'),

        nextButton: () => cy.contains('button', 'Next')
    }
     assertPageLoaded() {
         cy.get('div.progress-bar-circle.active-btn').should('be.visible');
        this.elements.countryDropdown().should('be.visible');
        this.elements.phone().should('be.visible');
    }


    selectCountry(country) {
        this.elements.countryDropdown().click();
        this.elements.countryOption(country).click();
    }

    enterZipCode(zip) {
        this.elements.zipCode().clear().type(zip);
    }

    enterPhone(phone) {
        this.elements.phone().clear().type(phone);
    }

clickNext() {
    cy.get('button:has(i.bi.bi-arrow-right)')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });
}
//Reusable full flow for Step 2
  completeStep2(data) {
    this.assertPageLoaded();
    this.selectCountry(data.country);

    this.enterZipCode(data.zipCode);

    // 🟩 IMPORTANT — wait until state + city autofill
    this.waitForAutoFill();

    this.enterPhone(data.phone);
}
}

module.exports = new ContactDetailsPage();
