import React from "react";
import Part from "./Part";

const Content = ({ parts }) => (
  <>
    {parts.map(({ name, exercises }, i) => (
      <Part key={i} name={name} exercises={exercises} />
    ))}
  </>
);

export default Content;
