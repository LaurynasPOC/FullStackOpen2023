import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setMessage } from "../reducers/notificationReducer";
import { updatedAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);

  const anecdotes = useSelector((state) =>
    state.anecdotes.filter(
      (item) =>
        typeof item.content === "string" &&
        item.content.toLowerCase().includes(filter)
    )
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(updatedAnecdote(anecdote));
    dispatch(setMessage(anecdote.content));
  };
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
