const user = {
  name: 'Test User',
  username: 'test',
  password: 'test',
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('test');
      cy.get('#password').type('test');
      cy.get('#login-button').click();

      cy.contains('Test User logged in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('test');
      cy.get('#password').type('wrong password');

      cy.contains('wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.contains('wrong username or password').should(
        'have.css',
        'border',
        '2px solid rgb(255, 0, 0)'
      );
      cy.get('html').should('not.contain', 'Test User logged in');
    });
  });
});
