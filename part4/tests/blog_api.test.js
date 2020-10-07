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

test('a blog added without likes had default value of likes 0', async () => {
    const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'https://example.com/',
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
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

    await api.post('/api/blogs').send(newBlog).expect(400);
});

test('an existing blog can be deleted', async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDeletion = await helper.blogsInDb();
    const blogNotExist = await blogsAfterDeletion.find(blog => blog.id === blogToDelete.id);
    expect(blogNotExist).not.toBeDefined();
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

afterAll(() => {
    mongoose.connection.close();
});
