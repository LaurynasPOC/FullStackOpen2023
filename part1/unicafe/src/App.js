import { useState } from "react";
import { Button } from "./components/Button";
import { H3 } from "./components/H3";
import Statistics from "./components/statistics/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood((prevGood) => prevGood + 1);
  const handleNeutral = () => setNeutral((prevNeutral) => prevNeutral + 1);
  const handleBad = () => setBad((prevBad) => prevBad + 1);
  return (
    <>
      <H3 text="give feedback" />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
