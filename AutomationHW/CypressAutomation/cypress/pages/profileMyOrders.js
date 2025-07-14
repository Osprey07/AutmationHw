class OrdersPage {
  visit() {
    cy.visit('https://magento.softwaretestingboard.com/sales/order/history/');
  }

  verifyPageTitle() {
    cy.get('.page-title span')
      .should('have.text', 'My Orders');
  }

  verifyOrdersTable() {
    cy.get('#my-orders-table').should('exist');
    cy.get('#my-orders-table tbody tr').should('have.length.at.least', 1);
  }

  verifyFirstOrderDetails() {
    cy.get('#my-orders-table tbody tr').first().within(() => {
      cy.get('.col.id').should('not.be.empty');
      cy.get('.col.date').should('not.be.empty');
      cy.get('.col.shipping').should('contain.text', 'Deniz Test');
      cy.get('.col.total .price').invoke('text').should('match', /^\$\d+[\d,.]*$/);
      cy.get('.col.status').should('not.be.empty');
      cy.get('.col.actions a.action.view').should('contain.text', 'View Order');
      cy.get('.col.actions a.action.order').should('contain.text', 'Reorder');
    });
  }

  clickViewOrderOfFirstRow() {
    cy.get('#my-orders-table tbody tr').first()
      .find('.col.actions a.action.view').click();
  }

  clickReorderFirstOrder() {
    cy.get('#my-orders-table tbody tr').first()
      .find('.col.actions a.action.order').click();
  }
}

export const ordersPage = new OrdersPage();
