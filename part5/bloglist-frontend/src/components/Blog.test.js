/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "Test url",
    likes: 5,
    id: "12345",
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  const titleElement = component.getByText("Test title");
  expect(titleElement).toBeDefined();

  const authorElement = component.getByText("Test author");
  expect(authorElement).toBeDefined();

  const urlElement = component.getByText("Test url");
  expect(urlElement).toBeDefined();

  const likesElement = component.getByText("5");
  expect(likesElement).toBeDefined();
});
