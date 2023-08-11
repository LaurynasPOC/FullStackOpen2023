import React from "react";
import { H3 } from "../H3";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let average = all !== 0 ? (good - bad) / all : 0;
  let positive = all !== 0 ? (good / all) * 100 : 0;

  return (
    <>
      <H3 text="statistics" />
      {all === 0 ? (
        "No feedback given"
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average.toFixed(1)} />
            <StatisticLine text="positive" value={positive.toFixed(1)} />
          </tbody>
        </table>
      )}
    </>
  );
};

export default Statistics;
