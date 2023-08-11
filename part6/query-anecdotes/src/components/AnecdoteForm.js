import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useQuery } from "react-query";
import { getAnecdotes } from "../requests";
const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
  });

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onMutate: (variables) => {
      if (variables.content.length < 5) {
        throw new Error("Content must be at least 5 characters long");
      }
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueriesData("anecdotes", [...anecdotes, newAnecdote]);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    if (newAnecdoteMutation.isError) {
      dispatch({ type: "ERROR", content: newAnecdoteMutation.error.message });
    } else {
      dispatch({ type: "NEW", content });
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
