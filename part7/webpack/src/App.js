/* eslint-disable no-undef */
import React, { useState } from "react";
import "./index.css";
import { useNotes } from "./hooks";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  );
};

export default App;
