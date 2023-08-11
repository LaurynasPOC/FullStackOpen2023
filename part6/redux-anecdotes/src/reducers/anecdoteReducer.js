import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      if (content === "") {
        return state;
      }
      state.push(content);
    },
    addVote(state, action) {
      const id = action.payload;

      const anecdoteToVote = state.find((n) => n.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
    appendAnecdote(state, action) {
      console.log(state);
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, addVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    console.log(anecdotes);
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updatedAnecdote = (anecdote) => {
  return async (dispatch, getState) => {
    dispatch(addVote(anecdote.id));
    const updatedAnecdote = getState().anecdotes.find(
      (a) => a.id === anecdote.id
    );
    if (!updatedAnecdote) {
      console.error("Failed to find the updated anecdote in the state.");
      return;
    }
    await anecdotesService.update(anecdote.id, updatedAnecdote);
  };
};

export default anecdoteSlice.reducer;
