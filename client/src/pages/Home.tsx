import { useEffect, useState } from "react";

const Home = () => {
  const createAccount = (userInfo) => {
    fetch("/api/register/seedaccount", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("paginated post", data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={createAccount}>Click</button>
    </div>
  );
};

export default Home;
