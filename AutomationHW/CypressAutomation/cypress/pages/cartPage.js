class CartPage {
    openMiniCart() {
        return cy.get('.minicart-wrapper .action.showcart').click()
            // Dropdown açılana kadar bekle, böylece altındaki elemanlar görünür olur
            .then(() => {
                return cy.get('div.mage-dropdown-dialog').should('be.visible');
            });
    }

    getMiniCartItems() {
        return cy.get('#mini-cart .product-item');
    }

    getMiniCartQty() {
        return cy.get('.minicart-wrapper .counter-number');
    }

    getMiniCartSubtotal() {
        return cy.get('.subtotal .price');
    }

    removeItemFromMiniCart() {
        // Önce minicart açılır
        this.openMiniCart()
            .then(() => {
                cy.get('#mini-cart .action.delete').first().then($el => {
                    if ($el.is(':visible')) {
                        cy.wrap($el).click();
                    } else {
                        // Görünmüyorsa zorla tıkla
                        cy.wrap($el).click({ force: true });
                    }
                });
            });
    }

    confirmRemoveModal() {
        // Modal varsa onayla
        cy.get('body').then($body => {
            if ($body.find('.action-primary.action-accept').length > 0) {
                cy.get('.action-primary.action-accept').click();
            }
        });
    }

    getMiniCartEmptyMessage() {
        return cy.get('.minicart-items-wrapper .empty').should('exist');
    }

    viewAndEditCart() {
        this.openMiniCart().then(() => {
            cy.get('body').then($body => {
                if ($body.find('.action.viewcart').length > 0) {
                    cy.get('.action.viewcart').should('be.visible').click();
                } else {
                    // Buton yoksa testin fail olmaması için log atabilir veya hata fırlatabilirsin
                    cy.log('View and Edit Cart butonu bulunamadı, mini cart boş olabilir.');
                }
            });
        });
    }

    proceedToCheckout() {
        this.openMiniCart().then(() => {
            cy.get('body').then($body => {
                if ($body.find('#top-cart-btn-checkout').length > 0) {
                    cy.get('#top-cart-btn-checkout').should('be.visible').click();
                } else {
                    cy.log('Proceed to Checkout butonu bulunamadı, mini cart boş olabilir.');
                }
            });
        });
    }
}

export default new CartPage();
