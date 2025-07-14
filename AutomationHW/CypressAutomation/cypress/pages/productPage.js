class ProductPage {
    // Ürün başlığı
    getProductTitle() {
        return cy.get('.page-title > span');
    }

    // Sepete ekle butonu
    getAddToCartButton() {
        return cy.get('#product-addtocart-button');
    }

    // Adet inputu
    getQtyInput() {
        return cy.get('input#qty');
    }

    // Size seçme seçimi
    selectSize(sizeLabel) {
        cy.get('.swatch-attribute.size .swatch-option.text')
            .contains(sizeLabel)
            .click();
    }

    // Renk seçme işlemi
    selectColor(colorLabel) {
        cy.get(`.swatch-option.color[option-label="${colorLabel}"]`).click();
    }

    // Sepete ekle işlemi
    addToCart(quantity = 1) {
        if (quantity > 1) {
            this.getQtyInput().clear().type(quantity);
        }
        this.getAddToCartButton().click();
    }

    getSuccessMessage() {
        return cy.get('.message-success');
    }
}

export default new ProductPage();
