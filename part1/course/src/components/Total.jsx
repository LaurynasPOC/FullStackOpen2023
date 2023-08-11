import React from "react";

const Total = ({ parts }) => {
  let sum = 0;
  parts.forEach(({ exercises }) => (sum += exercises));

  return <p>Number of exercises {sum}</p>;
};
export default Total;
