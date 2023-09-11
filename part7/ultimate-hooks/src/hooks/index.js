import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return { type, value, onChange };
};

export const useResource = (url) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const resp = await axios.get(url);
    setResources(resp.data);
  };

  const create = async (resource) => {
    const resp = await axios.post(url, resource);
    setResources([...resources, resp.data]);
  };

  useEffect(() => {
    getAll();
  }, [url]);

  return [resources, { getAll, create }];
};
