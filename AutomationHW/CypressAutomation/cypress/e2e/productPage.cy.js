import productPage from '../pages/productPage';

describe('Product Page Tests', () => {
    const productUrl = 'https://magento.softwaretestingboard.com/juno-jacket.html'; // Test etmek istediğin ürün URL'sini değiştir

    beforeEach(() => {
        cy.visit(productUrl);
    });

    it('Ürün sayfası başlığı görünür olmalı', () => {
        productPage.getProductTitle().should('be.visible').and('not.be.empty');
    });

    it('Ürün sepete eklenebilmeli', () => {
        productPage.selectSize('M');
        productPage.selectColor('Blue');
        productPage.addToCart(2);

        productPage.getSuccessMessage()
            .should('be.visible')
            .and('contain.text', 'You added')
    })
});