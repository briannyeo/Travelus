//import { useEffect, useState } from "react";
import { z } from "zod";
import { loginAtom } from "../App";
import { useAtom } from "jotai";
import Login1 from "../components/Login1";

//import CountrySelector from "../components/countrylist";

//{"id":19,"username":"brian","password":"$2b$10$2xyhH.UtxV4sdIvc5Y2Td.tsc1P9TQ.lEyH6WCUCagcxz80hp1IMK","location_based":"Singapore","description":"Shopping etc etc","image":null,"favourited_itineraries":[]},{"id":20,"username":"admin","password":"$2b$10$4sy1Ampm09caD3vL9m2RZewgA0Lnt/KRqXLi.rrJvO5QSqS4kjMym","location_based":"Thailand","description":"admin description","image":null,"favourited_itineraries":[]}]

// const User = z.object({
//   id: z.number(),
//   username: z.string(),
//   password: z.string(),
//   location_based: z.string(),
//   description: z.string(),
// });

const Home = () => {
  const [login, setLogin] = useAtom(loginAtom);
  // const createAccount = (userInfo: any) => {
  //   fetch("/api/user/seedaccount", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     //body: JSON.stringify(userInfo),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //console.log("paginated post", data);
  //       const user = User.parse(data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <>
      {login ? (
        <div className="flex flex-col bg-blue container max-h-screen item-stretch justify-center items-center">
          <div className="bg-white basis-1/2 flex flex-row m-5 item-stretc">
            <div className="container border-solid border-gray border-3 m-5 ">
              <h1>Your trips</h1>
            </div>
            <div className="container border-solid border-gray border-3">
              <h1>Your itineraries</h1>
            </div>
          </div>
          <div className="bg-gray basis-1/2">div2</div>
        </div>
      ) : (
        <Login1 />
      )}
    </>
  );
};

export default Home;
