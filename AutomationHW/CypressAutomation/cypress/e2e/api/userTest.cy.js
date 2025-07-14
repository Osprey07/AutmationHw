// cypress/e2e/user/user_api.cy.js

context('User Tests', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';
  const user = {
    id: 12,
    username: 'yokasd',
    firstName: 'deniadaz',
    lastName: 'güdadn',
    email: 'denemeadauto@gmail.com',
    password: 'Denemade123',
    phone: '551123ad4567',
    userStatus: 0
  };

  it('Create User - POST /user', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/user`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: user
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

it('Login User - GET /user/login', () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}/user/login`,
    qs: {
      username: user.username,
      password: user.password
    }
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.include('logged in user');
  });
});

  it('Update User - PUT /user/{username}', () => {
    const updatedUser = { ...user, firstName: 'updated', lastName: 'user' };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/user/${user.username}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: updatedUser
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('Logout User - GET /user/logout', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/user/logout`
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('Delete User - DELETE /user/{username}', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/user/${user.username}`
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
