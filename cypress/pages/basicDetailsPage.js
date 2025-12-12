class TutorOnboardingStep1 {
  uploadProfilePhoto(imageName) {
    // Upload image file
    cy.get('input[type="file"]').attachFile(imageName, { force: true });

    // Ensure image is loaded
    cy.get('.ReactCrop__child-wrapper img[alt="Crop me"]', {
      timeout: 10000,
    }).should("be.visible");

    // 👉 STEP 1 — Focus the image (ReactCrop needs initial mouse activation)
    cy.get('.ReactCrop__child-wrapper img[alt="Crop me"]').click({
      force: true,
    });

    // 👉 STEP 2 — Perform a drag to create crop region
    cy.get(".ReactCrop__child-wrapper")
      .trigger("mousedown", { clientX: 50, clientY: 50, button: 0 })
      .trigger("mousemove", { clientX: 250, clientY: 250, button: 0 })
      .trigger("mouseup", { force: true });

    // 👉 STEP 3 — Ensure crop box appears
    cy.get(".ReactCrop__crop-selection", { timeout: 7000 }).should("exist");

    // 👉 STEP 4 — Now crop button will be enabled
    cy.get("#modal-btn-0", { timeout: 7000 }).should("not.be.disabled").click();
  }

  enterFirstName(name) {
    const input = cy.get('input[name="firstName"]');
    input.clear();
    if (name) {
      input.type(name);
    }
  }

  enterLastName(name) {
    const input = cy.get('input[name="lastName"]');
    input.clear();
    if (name) {
      input.type(name);
    }
  }

  enterEmail(email) {
    const input = cy.get('input[name="email"]');
    input.clear();
    if (email) {
      input.type(email);
    }
  }

  clickNext() {
    cy.get("button.next-btn")
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });
  }

  validateErrorMessage(fieldName, message) {
    cy.contains(fieldName)
      .parent()
      .find(".error-message")
      .should("be.visible")
      .and("have.text", message);
  }

  assertPageLoaded() {
    // Check step progress indicator
    cy.get(".progress-bar-circle").first().should("have.class", "active-btn");

    // Check heading text
    cy.contains("Basic Details").should("be.visible");
  }
  // ✅ Add this function for error validation
  expectError(message) {
    cy.get(".error-message") // replace with your actual error selector
      .should("be.visible")
      .and("contain.text", message);
  }
   //Reusable Step-1 Flow (Use this everywhere)
  completeStep1(data) {
    this.assertPageLoaded();
    this.uploadProfilePhoto(data.photo);
    this.enterFirstName(data.firstName);
    this.enterLastName(data.lastName);
    this.enterEmail(data.email);
    this.clickNext();
  }
}

export default new TutorOnboardingStep1();
