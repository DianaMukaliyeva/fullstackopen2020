const user = {
  name: 'Test User',
  username: 'test',
  password: 'test',
};

const user2 = {
  name: 'Test User2',
  username: 'test2',
  password: 'test2',
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
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

      it('shows url and likes on button view click', function () {
        cy.contains('first title first author').parent().find('button').click();
        cy.contains('first url');
        cy.contains('likes 0');
      });

      it('hide url and likes on button hide click', function () {
        cy.contains('first title first author').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('html').should('contain', 'first url');
        cy.get('@theButton').click();
        cy.get('html').should('not.contain', 'first url');
      });

      it('like blog add likes to a blog', function () {
        cy.contains('first title first author').parent().as('theFirstBlog');
        cy.get('@theFirstBlog').find('button').click();
        cy.get('@theFirstBlog').contains('likes 0');
        cy.get('@theFirstBlog').contains('like').click();
        cy.get('@theFirstBlog').contains('likes 1');
      });

      it('user created a blog can delete it', function () {
        cy.contains('first title first author').parent().as('theFirstBlog');
        cy.get('@theFirstBlog').find('button').click();
        cy.get('@theFirstBlog').contains('remove').click();
        cy.get('html').should('not.contain', 'first title first author');
      });

      it("user can not delete other user's blog", function () {
        cy.contains('logout').click();
        cy.login({ username: 'test2', password: 'test2' });
        cy.contains('first title first author').parent().as('theFirstBlog');
        cy.get('@theFirstBlog').find('button').click();
        cy.get('@theFirstBlog').contains('likes 0');
        cy.get('@theFirstBlog').should('not.contain', 'remove');
      });
    });

    describe('blogs are ordered by more likes', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'first author',
          title: 'first title',
          url: 'some url',
          likes: 10,
        });
        cy.createBlog({
          author: 'second author',
          title: 'second title',
          url: 'second url',
          likes: 12,
        });
        cy.createBlog({ author: 'third author', title: 'third title', url: 'third url', likes: 9 });
      });

      it('blogs are ordered correctly', function () {
        cy.get('.blog').then((blog) => {
          expect(blog[0]).contain('second title');
          expect(blog[1]).contain('first title');
          expect(blog[2]).to.contain('third title');
        });
      });

      it('blogs are reordered if user likes', function () {
        cy.contains('third title third author').parent().as('theThirdBlog');
        cy.get('@theThirdBlog').find('button').click();
        cy.get('@theThirdBlog').contains('likes 9');
        cy.get('@theThirdBlog').contains('like').click();
        cy.get('@theThirdBlog').contains('like').click();
        cy.get('@theThirdBlog').contains('like').click();
        cy.get('@theThirdBlog').contains('like').click();
        cy.get('@theThirdBlog').contains('likes 13');

        cy.get('.blog').then((blog) => {
          expect(blog[0]).contain('third title');
          expect(blog[1]).contain('second title');
          expect(blog[2]).to.contain('first title');
        });
      });
    });
  });
});
