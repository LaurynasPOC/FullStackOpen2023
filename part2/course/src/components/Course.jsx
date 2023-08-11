import React from "react";
import H2 from "./H2";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <>
      <H2 text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
