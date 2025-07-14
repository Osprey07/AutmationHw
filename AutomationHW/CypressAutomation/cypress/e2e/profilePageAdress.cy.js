import { profilePage } from '../pages/profilePageAdress';
import { LoginPage } from '../pages/login';
const loginPage = new LoginPage();
describe('Address Book', () => {
    beforeEach(() => {
        loginPage.navigate();
        loginPage.login('denemeauto@gmail.com', 'Deneme123');
        profilePage.visit();
    });

    it('Adres Defteri sayfa başlığı görünmeli', () => {
        profilePage.verifyPageTitle();
    });

    it('Varsayılan fatura adresi doğru şekilde gösterilmeli', () => {
        profilePage.verifyDefaultBillingAddress();
    });

    it('Varsayılan teslimat adresi doğru şekilde gösterilmeli', () => {
        profilePage.verifyDefaultShippingAddress();
    });

    it('Ek adresler olmamalı', () => {
        profilePage.verifyNoAdditionalAddresses();
    });

    it('Doğru yan menü bağlantılarını içermeli', () => {
        profilePage.verifySidebarLinks();
    });

    it('Yeni adres eklemeye izin vermeli', () => {
        profilePage.clickAddNewAddress();
        cy.url().should('include', '/customer/address/new');
    });
});
