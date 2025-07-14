class ProfilePage {
  visit() {
    cy.visit('https://magento.softwaretestingboard.com/customer/address/'); // veya doğrudan profil sayfanın URL'si
  }

  verifyPageTitle() {
    cy.get('.page-title span').should('have.text', 'Address Book');
  }

verifyDefaultBillingAddress() {
  // Başlık kontrolü
  cy.get('.box-address-billing .box-title span')
    .should('have.text', 'Default Billing Address');

  // Change butonu kontrolü
  cy.get('.box-address-billing .box-actions a')
    .should('contain.text', 'Change Billing Address')
    .and('have.attr', 'href')
    .and('include', '/customer/address/edit');
}

verifyDefaultShippingAddress() {
  // Başlık kontrolü
  cy.get('.box-address-shipping .box-title span')
    .should('have.text', 'Default Shipping Address');

  // Change butonu kontrolü
  cy.get('.box-address-shipping .box-actions a')
    .should('contain.text', 'Change Shipping Address')
    .and('have.attr', 'href')
    .and('include', '/customer/address/edit');
}

  clickAddNewAddress() {
    cy.get('button[role="add-address"]').click();
  }

  verifyNoAdditionalAddresses() {
    cy.get('.block-addresses-list .block-content')
      .should('contain.text', 'You have no other address entries in your address book.');
  }

verifySidebarLinks() {
  const expectedLinks = [
    'My Account',
    'My Orders',
    'My Downloadable Products',
    'My Wish List',
    'Address Book',
    'Account Information',
    'Stored Payment Methods',
    'My Product Reviews'
  ];

  cy.get('.block-collapsible-nav-content .nav.items li').then($items => {
    // Tüm li'leri gez, boş olanları ayıkla, metinleri trimle
    const actualLinks = [...$items]
      .map(el => el.innerText.trim())
      .filter(text => text.length > 0);

    expect(actualLinks).to.deep.eq(expectedLinks);
  });
}

}

export const profilePage = new ProfilePage();
