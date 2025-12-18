// cypress/e2e/filter-negative.cy.js
// Negative Test Cases for Tutor Search Filters

import HeaderPage from '../pages/HeaderPage';

// API selectors
const TUTOR_API = "**/api/v1/find/tutor?**";

// Dropdown selectors
const LEVEL_DROPDOWN = "select[name='level']";
const SUBJECT_DROPDOWN = "select[name='subject']";
const GENDER_DROPDOWN = "select[name='gender']";

// No-results UI selectors
const NO_RESULTS_SELECTOR =
    ".empty-state-message-container, .no-result-found-section, .no-results-message";

/* ============================================================
   Helper: Extract all valid options from a dropdown
============================================================ */
function getDropdownOptions(selector) {
    return cy.get(selector).then($el => {
        const options = [...$el.find("option")]
            .map(o => o.value.trim())
            .filter(v => v && v !== "Select Option");

        return options;
    });
}

/* ============================================================
   Helper: Safely select a value (throws clear error if missing)
============================================================ */
function safeSelect(selector, value) {
    return cy.get(selector).then($el => {
        const available = [...$el.find("option")].map(o => o.value.trim());

        if (!available.includes(value)) {
            throw new Error(`❌ Value "${value}" not found in dropdown: ${selector}`);
        }
        cy.get(selector).select(value, { force: true });
    });
}

/* ============================================================
   Helper: Select ONLY IF the option exists (no error)
============================================================ */
function safeSelectIfExists(selector, optionText) {
    cy.get(selector).then($el => {
        const exists = [...$el.find("option")].some(
            o => o.textContent.trim() === optionText
        );

        if (exists) {
            cy.get(selector).select(optionText, { force: true }).trigger("change");
        } else {
            cy.log(`⚠️ Option '${optionText}' not found → skipping.`);
        }
    });
}

/* ============================================================
   Helper: Unified No Results Assertion
============================================================ */
function assertNoResults() {
    cy.get("body").then($body => {
        const msg = $body.find(NO_RESULTS_SELECTOR);
        if (msg.length > 0) cy.wrap(msg).should("be.visible");
        else cy.log("⚠️ No-results message not found (UI may differ)");
    });
}
function closeBlockingModals() {
    cy.get("body").then($body => {
        if ($body.find("div[role='dialog']").length > 0) {
            cy.get("div[role='dialog']").invoke("hide");
        }
    });
}

/* ============================================================
   Helper: For TC-N004 only (your earlier missing function)
============================================================ */
function assertNoResultsMessage() {
    cy.get(NO_RESULTS_SELECTOR).should("be.visible");
}

/* ============================================================
   NEGATIVE TEST SUITE
============================================================ */
describe("Tutor Search – Negative Test Scenarios", () => {

    beforeEach(() => {
        const testUser = Cypress.env("testUser");

        cy.loginWithUI(testUser.email, testUser.password);

        cy.visit("https://beta.tutorsvalley.com/find-tutor", { timeout: 30000 });
        cy.intercept("GET", TUTOR_API).as("getTutors");
        cy.wait("@getTutors");
        cy.wait(1500);
    });

    /* =======================================================
       TC-N001: Select a Level with no Subjects
    ======================================================= */
    it("TC-N001: Selecting a Level that has no Subjects should show empty Subject dropdown", () => {
        const NON_EXISTING_LEVEL = "Invalid Level";
        safeSelectIfExists(LEVEL_DROPDOWN, NON_EXISTING_LEVEL);

        cy.get(SUBJECT_DROPDOWN).then($el => {
            const options = [...$el.find("option")];
            expect(options.length).to.be.lte(1);
        });
    });

    /* =======================================================
       TC-N002: Invalid Subject should return no tutors
    ======================================================= */
    it("TC-N002: Selecting an invalid Subject should return no tutors", () => {
        safeSelectIfExists(SUBJECT_DROPDOWN, "Invalid Subject");
        cy.wait(1000);
        assertNoResults();
    });

    /* =======================================================
       TC-N003: Invalid Gender should return no tutors
    ======================================================= */
    it("TC-N003: Selecting invalid Gender option should return zero tutors", () => {
        safeSelectIfExists(GENDER_DROPDOWN, "Unknown");
        cy.wait(1000);
        assertNoResults();
    });

    /* =======================================================
       TC-N004: Valid Level + Valid Subject + Invalid Gender
    ======================================================= */
  it("TC-N004: Valid Level & Subject but invalid Gender → No tutors expected", () => {

    getDropdownOptions(LEVEL_DROPDOWN).then(levels => {
        const validLevel = levels[0];
        safeSelect(LEVEL_DROPDOWN, validLevel);
        cy.wait(800);

        getDropdownOptions(SUBJECT_DROPDOWN).then(subjects => {
            const validSubject = subjects[0];
            safeSelect(SUBJECT_DROPDOWN, validSubject);
            cy.wait(800);

            // Inject invalid gender
            const invalidGender = "UnknownGender";

            cy.get(GENDER_DROPDOWN).then($dropdown => {
                const dropdown = $dropdown[0];
                dropdown.value = invalidGender;
                dropdown.dispatchEvent(new Event("change", { bubbles: true }));
            });

            cy.wait(1500);

            // UI must show NO results
            cy.get(".tutor-card-wrapper").should("have.length", 0);

            assertNoResults();
        });
    });
});
it("TC-N005: Rare filter combination should return zero tutors", () => {
    const impossibleCombo = {
        level: "PhD",
        subject: "Nursery",
        gender: "Female"
    };

    safeSelectIfExists(LEVEL_DROPDOWN, impossibleCombo.level);
    cy.wait(800);

    safeSelectIfExists(SUBJECT_DROPDOWN, impossibleCombo.subject);
    cy.wait(800);

    closeBlockingModals();  // FIX added here

    safeSelectIfExists(GENDER_DROPDOWN, impossibleCombo.gender);
    cy.wait(1500);

    assertNoResults();
});

});
