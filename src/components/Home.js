import React from "react";

const Home = ({ guest }) => {
  return (
    <>
      <h1>Welcome to Adventure Away</h1>
      {guest && <h3>You are logged in as: {guest.username}</h3>}
    </>
  );
};

export default Home;
