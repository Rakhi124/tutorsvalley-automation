# TutorsValley Cypress Automation

## Setup
1. `npm ci`
2. `npx cypress open` (for interactive)
3. `npm run cypress:run` (for headless & report)

## Structure
- cypress/e2e — test specs
- cypress/pages — page objects
- cypress/fixtures — test data & files
- cypress/support — custom commands

## Add a test
- Create a spec in `cypress/e2e/...`
- Create any page objects in `cypress/pages/...`
- Use fixtures and commands for reuse

## CI
See `.github/workflows/cypress-run.yml`
