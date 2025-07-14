export class RegisterPage {
  navigate() {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/create/')
  }

  fillFirstName(firstName) {
    cy.get('#firstname').type(firstName)
  }

  fillLastName(lastName) {
    cy.get('#lastname').type(lastName)
  }

  fillEmail(email) {
    cy.get('#email_address').type(email)
  }

  fillPassword(password) {
    cy.get('#password').type(password)
  }

  fillConfirmPassword(confirmPassword) {
    cy.get('#password-confirmation').type(confirmPassword)
  }

  submit() {
    cy.get('button[title="Create an Account"]').click()
  }

  getSuccessMessage() {
    return cy.get('.message-success')
  }

  getValidationError(fieldId) {
    return cy.get(`#${fieldId}-error`)
  }

  getPasswordMismatchError() {
    return cy.get('#password-confirmation-error')
  }
}
