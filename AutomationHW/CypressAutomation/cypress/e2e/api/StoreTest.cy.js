// cypress/e2e/store/store_api.cy.js

context('Store Tests', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';
  const orderId = 7;

  const order = {
    id: orderId,
    petId: 3,
    quantity: 2,
    shipDate: new Date().toISOString(),
    status: 'placed',
    complete: true
  };

  it('Place Order - POST /store/order', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/store/order`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: order
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', orderId);
      expect(res.body).to.have.property('status', 'placed');
    });
  });

  it('Find Order - GET /store/order/{orderId}', () => {
    cy.wait(200)
    cy.request({
      method: 'GET',
      url: `${baseUrl}/store/order/${orderId}`,
      headers: {
        accept: 'application/json'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('id', orderId);
      expect(res.body).to.have.property('petId', order.petId);
    });
  });

  it('Delete Order - DELETE /store/order/{orderId}', () => {
    cy.wait(500)
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/store/order/${orderId}`,
      headers: {
        accept: 'application/json'
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
