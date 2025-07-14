import checkoutPage from '../pages/checkoutPage';
import { LoginPage } from '../pages/login';
import productPage from '../pages/productPage';

const loginPage = new LoginPage();

describe('Checkout Tests', () => {

    context('Guest Checkout', () => {
        beforeEach(() => {
            cy.visit('https://magento.softwaretestingboard.com/juno-jacket.html');
            productPage.selectSize('M');
            productPage.selectColor('Blue');
            productPage.addToCart(2);
            cy.visit('https://magento.softwaretestingboard.com/checkout/');
        });

        it('Guest checkout ile sipariş tamamlanabilmeli', () => {
            checkoutPage.enterGuestEmail('guestuser@example.com');

            checkoutPage.fillBillingInformation({
                firstName: 'Deniz',
                lastName: 'Test',
                street: '123 Test St',
                city: 'Test City',
                state: 'California',
                zip: '90001',
                country: 'United States',
                phone: '5551234567'
            });

        
            checkoutPage.selectShippingMethod('flatrate_flatrate'); 

            checkoutPage.continueToShipping();

            checkoutPage.placeOrder();

            cy.contains('Thank you for your purchase!').should('be.visible');

 
            cy.get('a.action.primary.continue')
                .should('have.attr', 'href', 'https://magento.softwaretestingboard.com/')
                .and('be.visible')
                .click();

            cy.url().should('eq', 'https://magento.softwaretestingboard.com/');
        });
    });

    context('Logged-in User Checkout', () => {
        beforeEach(() => {
            loginPage.navigate();
            loginPage.login('denemeauto@gmail.com', 'Deneme123');
            cy.url({ timeout: 10000 }).should('include', '/customer/account');
            cy.visit('https://magento.softwaretestingboard.com/juno-jacket.html');
            productPage.selectSize('M');
            productPage.selectColor('Blue');
            productPage.addToCart(2);
            cy.visit('https://magento.softwaretestingboard.com/checkout/');

        });

        it('Üye olarak checkout tamamlanabilmeli ve fatura bilgileri doldurulmalı', () => {
            checkoutPage.checkAndFillBillingInformationIfNeeded({
                street: '123 Test St',
                city: 'Test City',
                state: 'California',
                zip: '90001',
                country: 'United States',
                phone: '5551234567'
            });


            checkoutPage.selectShippingMethod('flatrate_flatrate');

            checkoutPage.continueToShipping();

            checkoutPage.placeOrder();


            cy.contains('Thank you for your purchase!').should('be.visible');

            cy.get('a.action.primary.continue')
                .should('have.attr', 'href', 'https://magento.softwaretestingboard.com/')
                .and('be.visible')
                .click();

            cy.url().should('eq', 'https://magento.softwaretestingboard.com/');
        });
    });

});
