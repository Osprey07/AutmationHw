class AccountPage {
  visit() {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/');
  }

  verifyPageTitle() {
    cy.get('.page-title span')
      .should('have.text', 'My Account');
  }

  verifyContactInfo(name, email) {
    cy.get('.box-information .box-content')
      .should('contain.text', name)
      .and('contain.text', email);
  }

  verifyEditButtons() {
    cy.get('.box-information .box-actions a.action.edit')
      .should('contain.text', 'Edit')
      .and('have.attr', 'href')
      .and('include', '/customer/account/edit');

    cy.get('.box-information .box-actions a.change-password')
      .should('contain.text', 'Change Password')
      .and('have.attr', 'href')
      .and('include', '/changepass');
  }

  verifyBillingEditButton() {
    cy.get('.box-billing-address .box-title span')
      .should('have.text', 'Default Billing Address');

    cy.get('[data-ui-id="default-billing-edit-link"]')
      .should('contain.text', 'Edit Address')
      .and('have.attr', 'href')
      .and('include', '/customer/address/edit');
  }

  verifyShippingEditButton() {
    cy.get('.box-shipping-address .box-title span')
      .should('have.text', 'Default Shipping Address');

    cy.get('[data-ui-id="default-shipping-edit-link"]')
      .should('contain.text', 'Edit Address')
      .and('have.attr', 'href')
      .and('include', '/customer/address/edit');
  }

  verifyRecentOrders() {
    cy.get('#my-orders-table tbody tr').should('have.length.at.least', 1);
    cy.get('#my-orders-table tbody tr').first().within(() => {
      cy.get('.col.id').should('exist');
      cy.get('.col.date').should('exist');
      cy.get('.col.shipping').should('contain.text', 'Deniz Test');
      cy.get('.col.total').should('contain.text', '$');
      cy.get('.col.status').should('contain.text', 'Pending');
      cy.get('.col.actions a').should('contain.text', 'View Order');
    });
  }
}

export const accountPage = new AccountPage();
