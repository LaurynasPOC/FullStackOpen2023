import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import NotificationContext from "./components/NotificationContext";

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });
  const anecdotes = data;

  const updatedAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const currentAnecdotes = queryClient.getQueryData("anecdotes");
      if (currentAnecdotes) {
        const index = currentAnecdotes.findIndex(
          (item) => item.id === updatedAnecdote.id
        );
        if (index !== -1) {
          const updatedAnecdotes = [...currentAnecdotes];
          updatedAnecdotes[index] = updatedAnecdote;
          queryClient.setQueryData("anecdotes", updatedAnecdotes);
        }
      }
    },
  });

  const handleUpdatedAnecdote = (anecdote) => {
    notificationDispatch({ type: "VOTED", content: anecdote.content });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000);
    updatedAnecdoteMutation.mutate({
      ...anecdote,
      votes: (anecdote.votes += 1),
    });
  };

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (error) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleUpdatedAnecdote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </NotificationContext.Provider>
  );
};

export default App;
