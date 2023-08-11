const dummy = (blogs) => {
  return blogs && 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};
const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;

  const favBlog = blogs.reduce((max, blog) =>
    max.likes > blog.likes ? max : blog
  );
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  const [author, blogsCount] = Object.entries(authors).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );

  return {
    author,
    blogs: blogsCount,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const [author, likes] = Object.entries(authors).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );

  return {
    author,
    likes,
  };
};

module.exports = {
  mostBlogs,
  favoriteBlog,
  dummy,
  totalLikes,
  mostLikes,
};
