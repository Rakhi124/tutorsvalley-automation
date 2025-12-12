describe('Tutor Onboarding - Contact Details (Negative)', () => {

    beforeEach(() => {
        cy.visit('/onboarding/contact-details');
    });

    it('Should show error if country not selected', () => {
        cy.enterZipCode('12345');
        cy.enterPhone('9876543210');
        cy.clickNext();

        cy.contains('Country is required').should('be.visible');
    });

    it('Should validate invalid zip code', () => {
        cy.selectCountry('India');
        cy.enterZipCode('00000');

        cy.get('input[name="state"]').should('have.value', '');
        cy.get('input[name="city"]').should('have.value', '');
        
        cy.contains('Invalid postal code').should('be.visible');
    });

    it('Should validate invalid phone number', () => {
        cy.selectCountry('India');
        cy.enterZipCode('560001');

        cy.enterPhone('123');
        cy.clickNext();

        cy.contains('Enter valid phone number').should('be.visible');
    });

});
