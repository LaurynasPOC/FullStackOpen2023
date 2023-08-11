const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = [
  {
    title: "On the Cruelty of Really Teaching Computing Science",
    author: "Edsger W. Dijkstra",
    url: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD10xx/EWD1036.html",
    likes: 10,
  },
  {
    title: "The Humble Programmer",
    author: "Edsgerisdadsa W. Dijkstra",
    url: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html",
    likes: 15,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  usersInDb,
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
