import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import User from "./components/User";
import CreateBlogPost from "./components/CreateBlogPost";
import Togglable from "./components/Togglable";
import blogPostServices from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const sortByLikes = blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlogPost = (newBlogPost) => {
    blogFormRef.current.toggleVisibility();
    blogPostServices
      .create(newBlogPost)
      .then((resp) => {
        setBlogs(blogs.concat(resp));
      })
      .catch((err) => console.log(err));
  };

  const addLikeToBlogPost = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const addLike = {
      ...blog,
      likes: blog.likes === undefined ? 1 : blog.likes + 1,
    };
    blogService.update(blog.id, addLike).then((resp) => {
      setBlogs(blogs.map((item) => (item.id !== blog.id ? item : resp)));
    });
  };

  const handleDeleteBlogPost = (id, author) => {
    const newBlogs = blogs.filter((item) => item.id !== id);
    if (window.confirm(`Remove blog? You're NOT gonna need it by ${author}?`)) {
      blogService
        .deleteBlogPost(id)
        .then(() => setBlogs(newBlogs))
        .catch((error) => {
          console.log("error while deleting person", error.response.data.error);
        });
    }
  };

  return (
    <div>
      {user === null ? (
        <Togglable buttonLabel="LogIn">
          <Login setUser={setUser} />
        </Togglable>
      ) : (
        <>
          <User setUser={setUser} user={user} />
          <Togglable ref={blogFormRef} buttonLabel="Create New BlogPost">
            <CreateBlogPost
              addBlogPost={addBlogPost}
              setBlogs={setBlogs}
              blogs={blogs}
            />
          </Togglable>
          <h2>blogs</h2>
          {sortByLikes.map((blog) => (
            <Blog
              handleDeleteBlogPost={handleDeleteBlogPost}
              addLikeToBlogPost={addLikeToBlogPost}
              key={blog.id}
              blog={blog}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
