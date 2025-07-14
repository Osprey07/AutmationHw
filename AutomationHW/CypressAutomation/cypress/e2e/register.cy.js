import { RegisterPage } from '../pages/register'

const registerPage = new RegisterPage()

describe('Magento Register POM Genişletilmiş Testleri', () => {
    beforeEach(() => {
        registerPage.navigate()
    })

    it('Pozitif: Geçerli bilgilerle kayıt olunmalı', () => {
        const timestamp = Date.now()
        registerPage.fillFirstName('Deniz')
        registerPage.fillLastName('Test')
        registerPage.fillEmail(`deneme${timestamp}@test.com`)
        registerPage.fillPassword('Deneme123!')
        registerPage.fillConfirmPassword('Deneme123!')
        registerPage.submit()
        cy.url().should('include', '/customer/account')
        cy.get('.message-success').should('contain', 'Thank you for registering')
    })

    it('Negatif: Tüm alanlar boş geçildiğinde validasyon hataları gösterilmeli', () => {
        registerPage.submit()
        registerPage.getValidationError('firstname').should('contain', 'This is a required field.')
        registerPage.getValidationError('lastname').should('contain', 'This is a required field.')
        registerPage.getValidationError('email_address').should('contain', 'This is a required field.')
        registerPage.getValidationError('password').should('contain', 'This is a required field.')
        registerPage.getValidationError('password-confirmation').should('contain', 'This is a required field.')
    })

    it('Negatif: Şifre ve onay şifresi uyuşmadığında hata gösterilmeli', () => {
        registerPage.fillFirstName('Ali')
        registerPage.fillLastName('Veli')
        registerPage.fillEmail(`mismatch${Date.now()}@test.com`)
        registerPage.fillPassword('Deneme123!')
        registerPage.fillConfirmPassword('Farkli123!')
        registerPage.submit()
        registerPage.getPasswordMismatchError().should('contain', 'Please enter the same value again.')
    })

    it('Validasyon: Geçersiz email formatı için hata gösterilmeli', () => {
        registerPage.fillFirstName('Hatalı')
        registerPage.fillLastName('Email')
        registerPage.fillEmail('hatalıemail')
        registerPage.fillPassword('Deneme123!')
        registerPage.fillConfirmPassword('Deneme123!')
        registerPage.submit()
        registerPage.getValidationError('email_address').should('contain', 'Please enter a valid email address')
    })

    it('Şifre 8 karakterden kısa ise hata vermeli', () => {
        registerPage.fillPassword('Ab1!')
        registerPage.fillConfirmPassword('Ab1!')
        registerPage.submit()
        registerPage.getValidationError('password')
            .should('contain', 'Minimum length of this field must be equal or greater than 8 symbols')
    })

    it('Şifre büyük harf içermiyorsa hata vermeli', () => {
        registerPage.fillPassword('deneme123!')
        registerPage.fillConfirmPassword('deneme123!')
        registerPage.submit()
        registerPage.getValidationError('password')
            .should('contain', 'Minimum of different classes of characters in password is 3')
    })

    it('Şifre küçük harf içermiyorsa hata vermeli', () => {
        registerPage.fillPassword('DENEME123!')
        registerPage.fillConfirmPassword('DENEME123!')
        registerPage.submit()
        registerPage.getValidationError('password')
            .should('contain', 'Minimum of different classes of characters in password is 3')
    })

    it('Şifre rakam içermiyorsa hata vermeli', () => {
        registerPage.fillPassword('Denemeabc!')
        registerPage.fillConfirmPassword('Denemeabc!')
        registerPage.submit()
        registerPage.getValidationError('password')
            .should('contain', 'Minimum of different classes of characters in password is 3')
    })

    it('Şifre özel karakter içermiyorsa hata vermeli', () => {
        registerPage.fillPassword('Deneme1234')
        registerPage.fillConfirmPassword('Deneme1234')
        registerPage.submit()
        registerPage.getValidationError('password')
            .should('contain', 'Minimum of different classes of characters in password is 3')
    })

    it('Geçerli güçlü şifre kabul edilmeli', () => {
        registerPage.fillPassword('Deneme123!')
        registerPage.fillConfirmPassword('Deneme123!')
        registerPage.submit()

        cy.url().should('include', '/customer/account')
    })


    it('Validasyon: Şifre sadece rakam içerirse hata vermeli', () => {
        registerPage.fillFirstName('Only')
        registerPage.fillLastName('Numbers')
        registerPage.fillEmail(`onlynum${Date.now()}@test.com`)
        registerPage.fillPassword('12345678')
        registerPage.fillConfirmPassword('12345678')
        registerPage.submit()
        registerPage.getValidationError('password').should('contain', 'Minimum of different classes of characters in password is 3.')
    })

    it('Negatif: Sadece ad girildiğinde diğer alanlar uyarı vermeli', () => {
        registerPage.fillFirstName('SadeceAd')
        registerPage.submit()
        registerPage.getValidationError('lastname').should('contain', 'This is a required field.')
        registerPage.getValidationError('email_address').should('contain', 'This is a required field.')
        registerPage.getValidationError('password').should('contain', 'This is a required field.')
    })

    it('Negatif: Aynı email ile tekrar kayıt olmaya çalışıldığında hata alınmalı', () => {

        registerPage.fillFirstName('Test')
        registerPage.fillLastName('User')
        registerPage.fillEmail('denemeauto@gmail.com') 
        registerPage.fillPassword('Deneme123!')
        registerPage.fillConfirmPassword('Deneme123!')
        registerPage.submit()
        cy.get('.message-error').should('contain', 'There is already an account with this email address')
    })

    it('Negatif: Email alanına sadece boşluk girilirse uyarı alınmalı', () => {
        registerPage.fillFirstName('Boşluk')
        registerPage.fillLastName('Email')
        registerPage.fillEmail('     ')
        registerPage.fillPassword('Deneme123!')
        registerPage.fillConfirmPassword('Deneme123!')
        registerPage.submit()
        registerPage.getValidationError('email_address').should('contain', 'This is a required field.')
    })

    it('Validasyon: Büyük harfli email de kabul edilmeli', () => {
        const timestamp = Date.now()
        registerPage.fillFirstName('Buyuk')
        registerPage.fillLastName('Harf')
        registerPage.fillEmail(`BUYUKHARF${timestamp}@GMAIL.COM`)
        registerPage.fillPassword('Deneme123!')
        registerPage.fillConfirmPassword('Deneme123!')
        registerPage.submit()
        cy.url().should('include', '/customer/account')
    })
})
