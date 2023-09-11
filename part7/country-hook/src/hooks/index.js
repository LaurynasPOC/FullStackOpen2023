import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((resp) => {
        const founded = resp.data.find((item) =>
          item.name.common.toLowerCase().includes(name.toLowerCase())
        );
        setCountry(founded);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, [name]);

  return country;
};
