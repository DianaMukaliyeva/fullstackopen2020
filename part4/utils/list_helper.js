const _ = require('lodash');

const dummy = blogs => {
    return 1;
};

const totalLikes = blogs => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return Object.keys(blogs).length === 0 ? 0 : blogs.map(blog => blog.likes).reduce(reducer);
};

const favoriteBlog = blogs => {
    const reducer = (max, blog) => (max.likes > blog.likes ? max : blog);
    return Object.keys(blogs).length === 0 ? null : blogs.reduce(reducer);
};

const mostBlogs = blogs => {
    if (blogs.length <= 0) return null;
    const authors = _.countBy(blogs, 'author');
    const authorWithMostBlogs = Object.keys(authors).reduce((a, b) => (authors[a] > authors[b] ? a : b));
    return {
        author: authorWithMostBlogs,
        blogs: authors[authorWithMostBlogs],
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
};
