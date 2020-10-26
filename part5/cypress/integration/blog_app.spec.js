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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' });
    });

    it('a new blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('input[name="title"]').type('new title blog');
      cy.get('input[name="author"]').type('new author');
      cy.get('input[name="url"]').type('new url');
      cy.get('#createBlog').click();

      cy.contains('new title blog new author');
    });

    describe('operation with blogs', function () {
      beforeEach(function () {
        cy.createBlog({ author: 'first author', title: 'first title', url: 'first url' });
        cy.createBlog({ author: 'second author', title: 'second title', url: 'second url' });
        cy.createBlog({ author: 'third author', title: 'third title', url: 'third url' });
      });

      it('shows only title and author, not url and likes', function () {
        cy.contains('first title first author');
        cy.get('html').should('not.contain', 'first url');
      });

      it.only('shows url and likes on button view click', function () {
        cy.contains('first title first author').parent().find('button').click();
        cy.contains('first url');
        cy.contains('likes 0');
      });
    });
  });
});
