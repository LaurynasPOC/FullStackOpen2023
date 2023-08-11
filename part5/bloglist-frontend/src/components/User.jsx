import React from "react";

const User = ({ user, setUser }) => {
  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };
  return (
    <>
      {user?.name} is logged in <button onClick={handleLogOut}>Log Out</button>
    </>
  );
};

export default User;
