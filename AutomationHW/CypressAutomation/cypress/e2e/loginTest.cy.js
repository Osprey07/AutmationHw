import { LoginPage } from '../pages/login'

const loginPage = new LoginPage()

describe('Magento Login POM Testleri', () => {


  beforeEach(() => {
    loginPage.navigate()
  })

  it('Pozitif: Geçerli bilgilerle giriş yapılmalı', () => {
    loginPage.login('denemeauto@gmail.com', 'Deneme123')
    cy.url().should('include', '/customer/account')
    cy.get('.greet.welcome').should('contain', 'Welcome')
  })

  it('Negatif: Geçersiz şifre ile hata alınmalı', () => {
    loginPage.login('denemeauto@gmail.com', 'invalidPassword')
    loginPage.getErrorMessage().should('be.visible').and('contain', 'incorrect')
  })

  it('Negatif: Email ve şifre boşken uyarı alınmalı', () => {
    loginPage.submit()
    loginPage.getEmailValidationError().should('contain', 'This is a required field.')
    loginPage.getPasswordValidationError().should('contain', 'This is a required field.')
  })

  it('Negatif: Sadece email girilirse uyarı alınmalı', () => {
    loginPage.enterEmail('denemeauto@gmail.com')
    loginPage.submit()
    loginPage.getPasswordValidationError().should('contain', 'This is a required field.')
  })

  it('Negatif: Sadece şifre girilirse uyarı alınmalı', () => {
    loginPage.enterPassword('Deneme123')
    loginPage.submit()
    loginPage.getEmailValidationError().should('contain', 'This is a required field.')
  })

  it('Validasyon: Geçersiz email formatında uyarı alınmalı', () => {
    loginPage.enterEmail('invalidemail')
    loginPage.submit()
    loginPage.getEmailValidationError().should('contain', 'valid email')
  })
  it('Validasyon: Email büyük harfle girilirse de kabul edilmeli', () => {
  loginPage.login('DENEMEAUTO@GMAIL.COM', 'Deneme123')
  cy.url().should('include', '/customer/account')
})
  it('Negatif: Email sadece boşluk karakteri girildiğinde uyarı alınmalı', () => {
    loginPage.enterEmail(' ')
    loginPage.enterPassword('Deneme123')
    loginPage.submit()
    loginPage.getEmailValidationError().should('contain', 'This is a required field.')
  })

})
