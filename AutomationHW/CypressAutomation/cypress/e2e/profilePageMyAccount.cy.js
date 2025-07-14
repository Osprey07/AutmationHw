import { accountPage } from '../pages/profilePageMyAccount';
import { LoginPage } from '../pages/login';
const loginPage = new LoginPage();
describe('My Account Page', () => {
    beforeEach(() => {
        loginPage.navigate();
        loginPage.login('denemeauto@gmail.com', 'Deneme123');
        accountPage.visit();
    });

    it('My Account sayfa başlığı görünmeli', () => {
        accountPage.verifyPageTitle();
    });

    it('Doğru iletişim bilgileri gösterilmeli', () => {
        accountPage.verifyContactInfo('denemeauto auto', 'denemeauto@gmail.com');
    });

    it('Düzenle ve şifre değişikliği butonları görünmeli', () => {
        accountPage.verifyEditButtons();
    });

    it('Fatura ve teslimat adresi bölümleri düzenleme butonlarıyla birlikte gösterilmeli', () => {
        accountPage.verifyBillingEditButton();
        accountPage.verifyShippingEditButton();
    });

    it('En az bir adet son sipariş görüntülenmeli', () => {
        accountPage.verifyRecentOrders();
    });
});
