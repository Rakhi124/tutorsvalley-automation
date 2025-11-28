class LoginPage {
  visit() { cy.visit('/login') }
  emailInput() {
    return cy.get('form').find('input[name="email"]:visible')
  }

  //emailInput() { return cy.get('input[type="email"]') }
  passwordInput() { return cy.get('input[type="password"]') }
  submitBtn() { return cy.get('button[type="submit"], button:contains("Login")').first() }

  login(email, password) {
    this.visit()
    this.emailInput().clear().type(email)
    this.passwordInput().clear().type(password, { log: false })
    this.submitBtn().click()
  }
}
export const loginPage = new LoginPage()
