import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((n) => n.id === Number(id));
  return (
    <div>
      <h3>
        {anecdote.content} by {anecdote.author}
      </h3>
      <p>has {anecdote.votes} votes</p>
      <p>for more info {anecdote.info}</p>
    </div>
  );
};

Anecdote.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Anecdote;
