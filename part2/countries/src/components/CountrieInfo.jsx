import React from "react";
import WeatherInfo from "./WeatherInfo";

const CountrieInfo = ({ filteredCountries }) => {
  return (
    <>
      {filteredCountries.map((item) => (
        <div key={item.name.common}>
          <h3>{item.name.common}</h3>
          <div>capital {item.capital[0]}</div>
          <div>area {item.area}</div>
          <p>
            <strong>languages:</strong>
          </p>
          <ul>
            {Object.values(item.languages).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <img width="160px" src={item.flags.svg} alt={item.flags.alt} />
          <WeatherInfo item={item} />
        </div>
      ))}
    </>
  );
};

export default CountrieInfo;
