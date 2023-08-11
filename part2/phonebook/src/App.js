import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [response, setResponse] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [className, setClassName] = useState("");

  useEffect(() => {
    personServices
      .getAll()
      .then((resp) => setPersons(resp))
      .catch((error) => {
        console.log("error while fetching persons", error.response.data.error);
        setResponse(error.response.data.error);
        setClassName("error");
      });
  }, []);
  if (!persons) {
    return null;
  }
  const filter = persons.filter(({ name }) =>
    name ? name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : false
  );

  const handleAddPerson = (e) => {
    e.preventDefault();

    const isAdded = persons.some(({ name }) => name === newName);

    if (isAdded) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        const person = persons.find((item) => item.name === newName);

        const updatedPerson = { ...person, name: newName, number: newNumber };
        personServices
          .update(person.id, updatedPerson)
          .then((resp) => {
            setPersons(
              persons.map((item) => (item.id !== person.id ? item : resp))
            );
            setNewName("");
            setNewNumber("");
            setClassName("success");
            setResponse(`${newName} number is changed`);
            setTimeout(() => setResponse(null), 2000);
          })
          .catch((error) => {
            console.log("error while updating", error.response.data.error);
            setResponse(error.response.data.error);
            setClassName("error");
          });
      }
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    personServices
      .create(newPerson)
      .then((resp) => {
        setPersons(persons.concat(resp));
        setNewName("");
        setNewNumber("");
        setResponse(`${newName} is added to`);
        setTimeout(() => setResponse(null), 2000);
        setClassName("success");
      })
      .catch((error) => {
        console.log(error);
        setResponse(error.response.data.error);
        setClassName("error");
        console.log(
          "error while adding person to phone book",
          error.response.data.error
        );
      });
  };

  const handleDeletePerson = (id, name) => {
    const newPersons = persons.filter((item) => item.id !== id);
    if (window.confirm(`Delete ${name}?`)) {
      personServices
        .deletePerson(id)
        .then(() => setPersons(newPersons))
        .catch((error) => {
          console.log(
            "🚀 ~ file: App.js:92 ~ handleDeletePerson ~ error:",
            error
          );
          setResponse(
            `Information of ${name} has already been deleted from the server`
          );
          setTimeout(() => setResponse(null), 2000);
          setClassName("error");
          console.log("error while deleting person", error.response.data.error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className={className} message={response} />
      <Filter search={search} setSearch={setSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
