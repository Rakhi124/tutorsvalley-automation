import step1 from "../../../pages/basicDetailsPage";
import contactPage from "../../../pages/contactDetailsPage";
import testData from "../../../fixtures/tutorData.json";

describe("Tutor Onboarding - Step1 + Step2 (Positive Flow)", () => {

    beforeEach(() => {
        cy.visit("https://beta.tutorsvalley.com/enrol-tutor");
    });

    it("Should complete Step 1 + Step 2 successfully", () => {

        // -------------------------
        // Step 1: Basic Details
        // -------------------------
        step1.completeStep1(testData.step1.valid);

        // -------------------------
        // Step 2: Contact Details
        // -------------------------
        contactPage.completeStep2(testData.step2.valid);

        // Assert Step 3 page
        cy.url().should("include", "/enrol-tutor");
    });

});
