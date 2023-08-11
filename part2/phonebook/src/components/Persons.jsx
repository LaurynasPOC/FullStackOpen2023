import React from "react";

const Persons = ({ filter, handleDeletePerson }) => {
  return (
    <div>
      {filter.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}
          <button onClick={() => handleDeletePerson(id, name)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
