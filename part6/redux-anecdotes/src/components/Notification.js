import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification.message);
  const [timeOutId, setTimeOutId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      clearTimeout(timeOutId);
      setTimeOutId(setTimeout(() => dispatch(clearMessage()), 5000));
    }
  }, [notification, dispatch]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <>{notification !== null && <div style={style}>{notification}</div>}</>
  );
};

export default Notification;
