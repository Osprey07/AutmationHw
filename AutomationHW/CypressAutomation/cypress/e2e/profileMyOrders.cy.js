import { ordersPage } from '../pages/profileMyOrders';
import { LoginPage } from '../pages/login';
const loginPage = new LoginPage();

describe('My Orders Page', () => {
    beforeEach(() => {
        loginPage.navigate();
        loginPage.login('denemeauto@gmail.com', 'Deneme123');
        ordersPage.visit();
    });

    it('Doğru sayfa başlığı görünmeli', () => {
        ordersPage.verifyPageTitle();
    });

    it('En az bir sipariş içeren sipariş tablosu olmalı', () => {
        ordersPage.verifyOrdersTable();
        ordersPage.verifyFirstOrderDetails();
    });

    it('İlk siparişin detayları görüntülenebilmeli', () => {
        ordersPage.clickViewOrderOfFirstRow();
        cy.url().should('include', '/sales/order/view/');
    });

    it('İlk sipariş yeniden sipariş edilebilmeli', () => {

        ordersPage.clickReorderFirstOrder();

    });
});
