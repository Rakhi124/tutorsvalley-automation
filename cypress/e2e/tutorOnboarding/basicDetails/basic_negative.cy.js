import step1 from "../../../pages/basicDetailsPage";
import testData from "../../../fixtures/tutorData.json";

describe("Tutor Onboarding - Step 1 Negative Test Cases (Data-Driven)", () => {

    beforeEach(() => {
        cy.visit("https://beta.tutorsvalley.com/enrol-tutor");
        step1.assertPageLoaded();
    });

    // Loop through all negative test cases from JSON
    testData.basicDetailsNegative.forEach((test) => {
        it(test.description, () => {
            // Enter fields if provided
            if (test.firstName !== undefined) step1.enterFirstName(test.firstName);
            if (test.lastName !== undefined) step1.enterLastName(test.lastName);
            if (test.email !== undefined) step1.enterEmail(test.email);

            // Upload photo if provided
            if (test.photo) {
                step1.uploadPhoto(test.photo);
            }

            step1.clickNext();
            step1.expectError(test.expectedError);
        });
    });
});
