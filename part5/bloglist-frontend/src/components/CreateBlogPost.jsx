import React, { useState } from "react";

import "./styles.css";

const CreateBlogPost = ({ addBlogPost }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);

  const handleCreateBlogPost = (e) => {
    e.preventDefault();
    addBlogPost({
      title: title,
      author: author,
      url: url,
      user: window.localStorage.getItem("loggedInUser"),
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h3>create new</h3>
      <div className={response && "success"}>{response}</div>
      <form onSubmit={handleCreateBlogPost}>
        title:{" "}
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        author:{" "}
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        url:{" "}
        <input
          name="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default CreateBlogPost;
