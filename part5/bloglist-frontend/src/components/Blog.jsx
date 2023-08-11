import React, { useState } from "react";
import "./styles.css";

const Blog = ({ blog, addLikeToBlogPost, handleDeleteBlogPost }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="blogStyles">
      <div>
        {blog.title}
        <button onClick={() => setVisible(!visible)}>
          {!visible ? "view" : "hide"}
        </button>
        {visible && (
          <>
            <div className="blogTitle">{blog.title}</div>
            <a href={blog.url} className="blogUrl">
              {blog.url}
            </a>
            <div className="blogLikes">
              {blog.likes}
              <button onClick={() => addLikeToBlogPost(blog.id)}>Like</button>
            </div>
            <div className="blogAuthor">{blog.author}</div>
            <button onClick={() => handleDeleteBlogPost(blog.id, blog.author)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
