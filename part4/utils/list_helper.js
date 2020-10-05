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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};
