// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// F// support/commands.js
import 'cypress-file-upload' // for file uploads

// Generic: clear session storage/local storage
Cypress.Commands.add('clearAppData', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
})

// Login commands
Cypress.Commands.add('visitLogin', () => {
  cy.visit('/') // baseUrl
})

// Tutor login using UI
Cypress.Commands.add('loginTutorUI', (email, password) => {
  cy.visit('/login')
  cy.get('input[type="email"]').should('be.visible').clear().type(email)
  cy.get('input[type="password"]').should('be.visible').clear().type(password, { log: false })
  cy.get('button[type="submit"], button:contains("Login")').first().click()
  // basic post-login check can be enhanced
  cy.url({ timeout: 10000 }).should('include', '/dashboard')
})

// Admin login (admin portal might be different domain)
Cypress.Commands.add('loginAdmin', (username, password) => {
  cy.visit(Cypress.env('adminUrl'))
  cy.get('input[name="username"], input[type="text"]').type(username)
  cy.get('input[name="password"]').type(password, { log: false })
  cy.get('button[type="submit"]').click()
})

// Reusable: wait for API call (example)
Cypress.Commands.add('waitFor', (alias, timeout = 10000) => {
  cy.wait(alias, { timeout })
})
