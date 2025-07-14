export class CategoryPage {
  navigateToCategory(categoryPath) {
    // Örnek: 'women/tops-women/jackets-women.html'
    cy.visit(`https://magento.softwaretestingboard.com/${categoryPath}`)
  }

  getCategoryTitle() {
    return cy.get('h1.page-title span.base')
  }

  getProductList() {
    return cy.get('.product-item')
  }

  getSortDropdown() {
    return cy.get('[title="Sort By"]')
  }

  applyPriceFilter(index = 0) {
    cy.get('.filter-options-title').contains('Price').click()
    cy.get('.filter-options-content input[type="checkbox"]').eq(index).check({ force: true })
  }

  clearAllFilters() {
    cy.get('.action.clear.filter-clear').click()
  }
}
