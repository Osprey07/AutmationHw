import { CategoryPage } from '../pages/categoryPage'

const categoryPage = new CategoryPage()

describe('Kategori Sayfası Testleri', () => {
    beforeEach(() => {
        // Örnek: Women > Tops > Jackets
        categoryPage.navigateToCategory('women/tops-women/jackets-women.html')
    })

    it('Sayfa başlığı "Jackets" içermeli', () => {
        categoryPage.getCategoryTitle().should('contain.text', 'Jackets')
    })

    it('Ürün listesi görünmeli', () => {
        categoryPage.getProductList().should('have.length.greaterThan', 0)
    })

    it('Sıralama işlemi yapılabilmeli', () => {
        cy.get('div.toolbar-sorter.sorter select[data-role="sorter"]').select('price')
        cy.url().should('include', 'product_list_order=price')
    })
    it('Fiyat filtresi uygulanmalı ve ürünler listelenmeli', () => {
        cy.get('.filter-options-title').contains('Price').click()

  
        cy.get('.filter-options-content')
            .contains(/\$\d+\.?\d* - \$\d+\.?\d*/) 
            .click()


        cy.get('.product-item').should('exist')
    })
    it('Filtre temizleme butonu çalışmalı', () => {

        cy.get('.filter-options-title').contains('Price').click()
        cy.get('.filter-options-content')
            .contains(/\$\d+\.?\d* - \$\d+\.?\d*/).click()


        cy.get('.action.clear.filter-clear').click()

        cy.url().should('not.include', 'price')
    })

})
