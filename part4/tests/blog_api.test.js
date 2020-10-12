const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');

const api = supertest(app);

const User = require('../models/user');
const Blog = require('../models/blog');
let token = '';

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const user = {
        username: 'test user',
        name: 'name',
        password: 'pass',
    };

    const createdResult = await api.post('/api/users').send(user);
    const response = await api.post('/api/login').send({ username: user.username, password: user.password });
    token = response.body.token;

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        blogObject.user = createdResult.body.id;
        await blogObject.save();
    }
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier of blog is named id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
});

test('an existing blog can be updated', async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];
    blogToUpdate.likes = 55;

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);

    const blogsAfterUpdate = await helper.blogsInDb();
    const updatedBlog = await blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id);
    expect(updatedBlog.title).toEqual(blogToUpdate.title);
    expect(updatedBlog.author).toEqual(blogToUpdate.author);
    expect(updatedBlog.url).toEqual(blogToUpdate.url);
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes);
});

describe('authorization required', () => {
    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Test author',
            url: 'https://example.com/',
            likes: 17,
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const blogsAfterAddition = await helper.blogsInDb();
        expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1);

        const author = blogsAfterAddition.map(blog => blog.author);
        expect(author).toContain('Test author');
    });

    test('a blog added without likes had default value of likes 0', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Test author',
            url: 'https://example.com/',
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const blogsAfterAddition = await helper.blogsInDb();
        const addedBlog = await blogsAfterAddition.find(blog => blog.title === 'Test blog');

        expect(addedBlog.likes).toEqual(0);
    });

    test('adding a blog without title and url returns status 400', async () => {
        const newBlog = {
            author: 'Test author',
            likes: 0,
        };

        await api.post('/api/blogs').send(newBlog).set('authorization', `Bearer ${token}`).expect(400);
    });

    test('an existing blog can be deleted', async () => {
        const blogs = await helper.blogsInDb();
        const blogToDelete = blogs[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).set('authorization', `Bearer ${token}`).expect(204);
        const blogsAfterDeletion = await helper.blogsInDb();
        const blogNotExist = await blogsAfterDeletion.find(blog => blog.id === blogToDelete.id);
        expect(blogNotExist).not.toBeDefined();
    });

    test('creation blog as unathorized user returns 401', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Test author',
            url: 'https://example.com/',
            likes: 17,
        };

        const result = await api.post('/api/blogs').send(newBlog).expect(401);
        expect(result.body.error).toBeDefined();
    });

    test('creation blog with invalid token returns 401', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Test author',
            url: 'https://example.com/',
            likes: 17,
        };

        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('authorization', `Bearer ${token}1`)
            .expect(401);
        expect(result.body.error).toBeDefined();
    });
});

describe('user manipulation', () => {
    beforeEach(async () => {
        await User.deleteMany();

        const passwordHash = await bcrypt.hash('password', 10);
        const user = new User({ username: 'One user', name: 'One name', passwordHash });

        await user.save();
    });

    test('creation of the new user succeeds ', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'New user',
            name: 'New name',
            password: 'pass',
        };

        await api.post('/api/users').send(newUser).expect(200);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);
    });

    test('all users are returned', async () => {
        const response = await api.get('/api/users').expect(200);
        const usersInDb = await helper.usersInDb();

        expect(response.body).toEqual(usersInDb);
    });

    test('creation of the new user fails with no username ', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            name: 'New name',
            password: 'pass',
        };

        const result = await api.post('/api/users').send(newUser).expect(400);
        expect(result.body.error).toBeDefined();

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation of the new user fails with username less than 3 characters ', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'No',
            password: 'pass',
        };

        const result = await api.post('/api/users').send(newUser).expect(400);
        expect(result.body.error).toBeDefined();

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation of the new user fails with no password ', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'Test user',
        };

        const result = await api.post('/api/users').send(newUser).expect(400);
        expect(result.body.error).toBeDefined();

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creation of the new user fails with password less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'Test user',
            password: 'no',
        };

        const result = await api.post('/api/users').send(newUser).expect(400);
        expect(result.body.error).toBeDefined();

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
