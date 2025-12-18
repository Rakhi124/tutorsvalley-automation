// ===============================================
// cypress/pages/HeaderPage.js
// Final, Battle-Tested Selectors
// ===============================================
class HeaderPage {
    
    // --- Selectors based on the name attribute (most stable for forms) ---
    
    // 1. Level Dropdown
    getLevelDropdown() {
        // Targets the select element by its name attribute
        return cy.get('select[name="level"]');
    }

    // 2. Subject Dropdown
    getSubjectDropdown() {
        return cy.get('select[name="subject"]');
    }

    // 3. Gender Dropdown
    getGenderDropdown() {
        return cy.get('select[name="gender"]');
    }

    // --- Result Selectors ---

    // The element displaying the total number of tutors found (e.g., "We Found 449 Tutors For You")
    getTutorCountResult() {
        // Targets the paragraph element that contains "We Found" text inside the wrapper
        return cy.get('.tutor-search-wrapper > p:contains("We Found")');
    }

    // --- Actions ---

    /**
     * Selects a value from a given dropdown element.
     * @param {Cypress.Chainable} dropdownElement - The dropdown element chain (e.g., this.getLevelDropdown())
     * @param {string} value - The value to select (e.g., 'A-Level')
     */
    selectDropdownByValue(dropdownElement, value) {
        // Use force: true as a safeguard against overlapping elements blocking the select
        dropdownElement.should('be.visible').select(value, { force: true });
        cy.wait(1000); // Wait for the filter request
    }

    /**
     * Filters tutors by applying all three selections.
     */
    filterTutors(level, subject, gender) {
        cy.log(`Filtering by Level: ${level}, Subject: ${subject}, Gender: ${gender}`);
        this.selectDropdownByValue(this.getLevelDropdown(), level);
        this.selectDropdownByValue(this.getSubjectDropdown(), subject);
        this.selectDropdownByValue(this.getGenderDropdown(), gender);
    }

    /**
     * Gets the numeric tutor count from the result text.
     */
    getNumericTutorCount() {
        return this.getTutorCountResult()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const match = text.match(/\d+/);
                const count = match ? parseInt(match[0], 10) : 0;
                cy.log(`Captured Tutor Count: ${count}`);
                return count;
            });
    }
}

export default new HeaderPage();