import cartPage from '../pages/cartPage';
import productPage from '../pages/productPage';

describe('Mini Cart Tests', () => {
  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/juno-jacket.html');
    productPage.selectSize('S');
    productPage.selectColor('Green');
    productPage.addToCart();
    cy.wait(1000); 
  });

  it('Mini cart ürün sayısı doğru olmalı', () => {
    cartPage.getMiniCartQty().should('contain', '1');
  });

  it('Mini cart içeriği görüntülenmeli', () => {
    cartPage.openMiniCart();
    cartPage.getMiniCartItems().should('have.length.at.least', 1);
  });

  it('Mini cart alt toplam gösterilmeli', () => {
    cartPage.openMiniCart();
    cartPage.getMiniCartSubtotal().should('contain', '$');
  });

  it('Mini cart üzerinden ürün silinebilmeli', () => {
    cartPage.removeItemFromMiniCart();
    cartPage.confirmRemoveModal(); 
    cartPage.openMiniCart();
    cartPage.getMiniCartItems().should('have.length', 0);
  });

it('Mini carttan "View and Edit Cart" linki çalışmalı', () => {
  cartPage.getMiniCartItems().should('have.length.at.least', 1);
  cartPage.viewAndEditCart();
  cy.url().should('include', '/checkout/cart');
});

  it.only('Mini carttan "Proceed to Checkout" çalışmalı', () => {
    cartPage.getMiniCartItems().should('have.length.at.least', 1);
    cartPage.proceedToCheckout();
    cy.url().should('include', '/checkout');
  });
});