import { LoginPage } from '../pages/login';
const loginPage = new LoginPage();
describe('Edit Account Information', () => {
  it('İsim, soyisim ve şifre güncellenmeli', () => {
            loginPage.navigate();
        loginPage.login('denemeauto@gmail.com', 'Deneme123');
    cy.visit('https://magento.softwaretestingboard.com/customer/account/edit/');

    cy.get('h1.page-title > span.base')
      .should('have.text', 'Edit Account Information');

    cy.get('input#firstname')
      .clear()
      .type('TestFirstName');

    cy.get('input#lastname')
      .clear()
      .type('TestLastName');

    cy.get('input#change-email').check().should('be.checked');
    cy.get('input#email').should('not.be.disabled');

    cy.get('input#change-password').check().should('be.checked');
    cy.get('input#current-password').should('not.be.disabled').type('currentPass123');
    cy.get('input#password').should('not.be.disabled').type('newPass123!');
    cy.get('input#password-confirmation').should('not.be.disabled').type('newPass123!');

    cy.get('button.action.save').click();

    cy.contains('You saved the account information.').should('be.visible');
  });
});
