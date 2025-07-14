class CheckoutPage {
  enterGuestEmail(email) {
    cy.get('div.field.required input#customer-email:visible')
      .should('be.visible')
      .clear()
      .type(email);
  }
  selectShippingMethod(methodValue) {
    // örnek: methodValue = 'flatrate_flatrate'
    cy.get(`input[type="radio"][value="${methodValue}"]`, { timeout: 10000 })
      .should('be.visible')
      .check({ force: true });
  }

  fillBillingInformation({
    firstName,
    lastName,
    street,
    city,
    state,
    zip,
    country,
    phone,
  }) {
    cy.get('input[name="firstname"]').should('be.visible').clear().type(firstName);
    cy.get('input[name="lastname"]').clear().type(lastName);
    cy.get('input[name="street[0]"]').clear().type(street);
    cy.get('input[name="city"]').clear().type(city);

    // State dropdown için önce açılıp seçilmeli
    cy.get('select[name="region_id"]').should('be.visible').select(state);

    cy.get('input[name="postcode"]').clear().type(zip);

    // Country dropdown
    cy.get('select[name="country_id"]').select(country);

    cy.get('input[name="telephone"]').clear().type(phone);
  }
  fillBillingInformationUser({
    street,
    city,
    state,
    zip,
    country,
    phone,
  }) {
    cy.get('input[name="street[0]"]').clear().type(street);
    cy.get('input[name="city"]').clear().type(city);

    // State dropdown için önce açılıp seçilmeli
    cy.get('select[name="region_id"]').should('be.visible').select(state);

    cy.get('input[name="postcode"]').clear().type(zip);

    // Country dropdown
    cy.get('select[name="country_id"]').select(country);

    cy.get('input[name="telephone"]').clear().type(phone);
  }
  continueToShipping() {
    // shipping method görünene kadar bekle ve seç
    cy.get('input[type="radio"][name^="ko_unique_"]', { timeout: 10000 })
      .should('be.visible')
      .first()  // ilk shipping methodu seç
      .check({ force: true });

    cy.get('[data-role="opc-continue"]')
      .should('be.visible')
      .click();
  }
  checkAndFillBillingInformationIfNeeded(info) {
    cy.get('body').then($body => {
      const hasSavedAddress = $body.find('div.shipping-address-item.selected-item').length > 0;

      if (hasSavedAddress) {
        cy.log('Kayıtlı adres bulundu, form doldurma atlandı.');
      } else {
        const $form = $body.find('form[data-role="billing-address-form"]');

        if ($form.length > 0 && $form.is(':visible')) {
          cy.log('Form görünür, doldurulacak.');
          this.fillBillingInformationUser(info);
        } else {
          cy.log('Form DOM’da var ama görünür değil. Doldurulmayacak.');
        }
      }
    });
  }



  placeOrder() {
    // Ödeme yöntemi adımı görünene kadar bekle
    cy.get('li#payment.checkout-payment-method', { timeout: 10000 }).should('be.visible');

    // Place Order butonu görünür ve aktif olana kadar bekle
    cy.get('button.action.primary.checkout', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }






}

export default new CheckoutPage();
