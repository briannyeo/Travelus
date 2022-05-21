import { useEffect, useState } from "react";
import { z } from "zod";

//{"id":19,"username":"brian","password":"$2b$10$2xyhH.UtxV4sdIvc5Y2Td.tsc1P9TQ.lEyH6WCUCagcxz80hp1IMK","location_based":"Singapore","description":"Shopping etc etc","image":null,"favourited_itineraries":[]},{"id":20,"username":"admin","password":"$2b$10$4sy1Ampm09caD3vL9m2RZewgA0Lnt/KRqXLi.rrJvO5QSqS4kjMym","location_based":"Thailand","description":"admin description","image":null,"favourited_itineraries":[]}]

const User = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  location_based: z.string(),
  description: z.string(),
});

const Home = () => {
  const createAccount = (userInfo: any) => {
    fetch("/api/user/seedaccount", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("paginated post", data);
        const user = User.parse(data);
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
