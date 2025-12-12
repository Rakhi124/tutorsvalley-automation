// ***********************************************
// This file is for creating custom Cypress commands
// ***********************************************

import 'cypress-file-upload'; // for file uploads

// ----------------------
// Generic commands
// ----------------------

// Clear cookies, localStorage & sessionStorage
Cypress.Commands.add('clearAppData', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => win.sessionStorage.clear());
});

// ----------------------
// Navigation / Login
// ----------------------

// Reusable: Visit Login Page
Cypress.Commands.add('visitLogin', () => {
  cy.visit('/login'); // Uses baseUrl from config
});

//  Tutor Login using UI (Stable)
Cypress.Commands.add('loginTutorUI', (email, password) => {
  cy.visit('/login');

  cy.get('input[name="email"]').should('be.visible').clear().type(email);
  cy.get('input[type="password"]').should('be.visible').clear().type(password, { log: false });

  cy.contains('button', 'Login').scrollIntoView().click();

  // Handle auto popup/modal after login
  cy.acceptModalIfPresent();

  // Confirm tutor dashboard
  cy.url({ timeout: 15000 }).should('include', '/tutor');
});

// Optional: Admin Login
Cypress.Commands.add('loginAdmin', (username, password) => {
  cy.visit(Cypress.env('adminUrl'));
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password, { log: false });
  cy.get('button[type="submit"]').click();
  cy.url({ timeout: 15000 }).should('include', '/dashboard');
});

// ----------------------
// Modal Handling
// ----------------------

// Smart modal accept helper
Cypress.Commands.add('acceptModalIfPresent', () => {
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("I Agree")').length > 0) {
      cy.contains('button', 'I Agree')
        .scrollIntoView()
        .should('be.visible')
        .click();
    }
  });

  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Close")').length > 0) {
      cy.contains('button', 'Close')
        .scrollIntoView()
        .should('be.visible')
        .click();
    }
  });
});

// ----------------------
// API / Wait Commands
// ----------------------

// Generic wait for an API alias
Cypress.Commands.add('waitForAPI', (alias, timeout = 15000) => {
  cy.wait(alias, { timeout });
});
// Token Verification
// ----------------------

Cypress.Commands.add('verifyToken', () => {
  cy.window().then((win) => {
    const tokenKey = Object.keys(win.localStorage).find((key) =>
      key.startsWith('twk_token')
    );

    expect(tokenKey, 'Tutor Token Key should exist').to.exist;

    const token = win.localStorage.getItem(tokenKey);
    expect(token, 'Token must be valid').to.be.a('string').and.not.be.empty;

    // Store token for later API usage
    Cypress.env('tutorToken', token);
  });
});
Cypress.Commands.add('clickInside', (selector, xOffset, yOffset) => {
  cy.get(selector).then($el => {
    const rect = $el[0].getBoundingClientRect()
    const x = rect.left + xOffset
    const y = rect.top + yOffset

    cy.wrap($el).click(x, y, { force: true })
  })
})
Cypress.Commands.add("clearAndType", (selector, text) => {
  cy.get(selector).should("be.visible").clear().type(text);
});

Cypress.Commands.add("selectDropdown", (selector, option) => {
  cy.get(selector).click();
  cy.contains(option).should("be.visible").click({ force: true });
});

Cypress.Commands.add("assertText", (selector, expected) => {
  cy.get(selector)
    .should("exist")
    .and("be.visible")
    .and("have.text", expected);
});

import 'cypress-file-upload';

Cypress.Commands.add("assertElementVisible", (selector) => {
    cy.get(selector).should("be.visible").and("not.be.disabled");
});
// Clear & type safely
Cypress.Commands.add('clearAndType', (selector, text) => {
    cy.get(selector)
        .clear({ force: true })
        .type(text, { force: true })
        .should('have.value', text);
});

// Click Next (reusable)
Cypress.Commands.add('clickNext', () => {
    cy.get('button.next-btn')
        .should('be.visible')
        .and('not.be.disabled')
        .click({ force: true });
});

// Validate error message
Cypress.Commands.add('shouldShowError', (message) => {
    cy.contains(message)
        .should('exist')
        .and('be.visible');
});
// -----------------------
// Tutor Onboarding Commands
// -----------------------

Cypress.Commands.add('selectCountry', (countryName) => {
    cy.get('button[data-testid="rfs-btn"]').click();
    cy.contains('li', countryName).click();
});

Cypress.Commands.add('enterZipCode', (zip) => {
    cy.get('input[name="zipCode"]').clear().type(zip);

    // Optional: wait for auto-fill API
    cy.intercept('GET', '**/zip*').as('zipLookup');
    cy.wait('@zipLookup', { timeout: 8000 });
});

Cypress.Commands.add('enterPhone', (phone) => {
    cy.get('input[name="phone"]').clear().type(phone);
});

Cypress.Commands.add('assertAutoFilledAddress', () => {
    cy.get('input[name="state"]').should('not.be.empty');
    cy.get('input[name="city"]').should('not.be.empty');
});

// Fills entire contact details page
Cypress.Commands.add('fillContactDetails', (data) => {
    cy.selectCountry(data.country);
    
    cy.enterZipCode(data.zipCode);

    cy.assertAutoFilledAddress();

    cy.enterPhone(data.phone);
});

// Click Next button on onboarding step
Cypress.Commands.add('clickNext', () => {
    cy.get('button').contains('Next').click();
});
