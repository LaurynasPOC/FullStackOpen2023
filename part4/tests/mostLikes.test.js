const { mostLikes } = require("../utils/list_helper");

describe("mostLikes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "On the Cruelty of Really Teaching Computing Science",
      author: "Edsger W. Dijkstra",
      url: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD10xx/EWD1036.html",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17fa",
      title: "The Humble Programmer",
      author: "Edsger W. Dijkstra",
      url: "https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html",
      likes: 15,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17fb",
      title: "Blog Post 1",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com",
      likes: 8,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17fc",
      title: "Blog Post 2",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17fd",
      title: "Blog Post 3",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list is empty, return null", () => {
    const result = mostLikes([]);
    expect(result).toBe(null);
  });

  test("when list has only one blog, return the author of that blog with the blog's likes", () => {
    const result = mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("when list has multiple blogs, return the author with the most total likes", () => {
    const result = mostLikes(listWithMultipleBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      likes: 25,
    });
  });
});
