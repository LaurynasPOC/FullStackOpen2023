import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrieInfo from "./components/CountrieInfo";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((resp) => setCountries(resp.data))
      .catch((err) => console.log(err, "error while fetching countries data"));
  }, []);

  const filteredCountries = countries.filter((item) =>
    item.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  console.log(filteredCountries);
  const handleCountriesData = () => {
    if (filteredCountries.length === 1) {
      return <CountrieInfo filteredCountries={filteredCountries} />;
    }
    if (filteredCountries.length > 10) {
      return "Too many matches, specify another filter";
    }
    if (filteredCountries.length < 10) {
      return (
        <>
          {filteredCountries.map((item) => (
            <div key={item.name.common}>
              {item.name.common}
              <button onClick={() => setSearch(item.name.common)}>show</button>
            </div>
          ))}
        </>
      );
    }
  };
  return (
    <>
      find countries{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>{handleCountriesData()}</div>
    </>
  );
}

export default App;
