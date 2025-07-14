export class LoginPage {
  navigate() {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login')
  }

  login(email, password) {
    cy.get('#email').type(email)
    cy.get('#pass').type(password)
    cy.get('#send2').click()
  }

  submit() {
    cy.get('#send2').click()
  }

  enterEmail(email) {
    cy.get('#email').type(email)
  }

  enterPassword(password) {
    cy.get('#pass').type(password)
  }

  getErrorMessage() {
    return cy.get('.message-error')
  }

  getEmailValidationError() {
    return cy.get('#email-error')
  }

  getPasswordValidationError() {
    return cy.get('#pass-error')
  }
}
