import landingPage from "../../../pages/landingPage";
import step1 from "../../../pages/basicDetailsPage";
import data from "../../../fixtures/tutorData.json";

describe("Tutor Onboarding - Step 1 (Basic Details)", () => {

    beforeEach(() => {
        cy.visit("https://beta.tutorsvalley.com/");
    });

    it("Positive Case: Complete Step 1 Successfully", () => {

        landingPage.hoverBecomeTutor();
        landingPage.clickEnrollTutor();

        step1.assertPageLoaded();
         step1.completeStep1(data.step1.valid);

       /* step1.uploadProfilePhoto(data.valid.photo);
        step1.enterFirstName(data.valid.firstName);
        step1.enterLastName(data.valid.lastName);
        step1.enterEmail(data.valid.email);

        step1.clickNext();*/

        cy.url().should("include", "/enrol-tutor");
    });
});

/*it("Negative: All fields empty should show errors", () => {
    landingPage.hoverBecomeTutor();
    landingPage.clickEnrollTutor();

    step1.clickNext();

    step1.validateErrorMessage("First Name", "First Name is required");
    step1.validateErrorMessage("Last Name",  "Last Name is required");
    step1.validateErrorMessage("Email",      "Email is required");
});
it("Negative: Invalid email format", () => {
    landingPage.hoverBecomeTutor();
    landingPage.clickEnrollTutor();

    step1.enterFirstName("Test");
    step1.enterLastName("User");
    step1.enterEmail("invalid-email");

    step1.clickNext();

    step1.validateErrorMessage("Email", "Please enter a valid email");
});
it("Negative: Should show error if profile picture is not uploaded", () => {
    landingPage.hoverBecomeTutor();
    landingPage.clickEnrollTutor();

    step1.enterFirstName("Test");
    step1.enterLastName("User");
    step1.enterEmail("test@test.com");

    step1.clickNext();

    cy.contains("Profile photo is required").should("be.visible");
});*/
