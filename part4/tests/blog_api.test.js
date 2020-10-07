const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
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
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const blogsAfterAddition = await helper.blogsInDb();
    expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1);

    const author = blogsAfterAddition.map(blog => blog.author);
    expect(author).toContain('Test author');
});

afterAll(() => {
    mongoose.connection.close();
});
