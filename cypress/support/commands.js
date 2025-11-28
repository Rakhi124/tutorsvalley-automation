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

// 🔥 Tutor Login using UI (Stable)
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
