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
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col">
        <div className="flex-row flex">
          <div className="max-w-3xl mx-auto bg-gray-100">
             <div className="text-3xl font-bold">Your trips</div> 
            </div>
          <div className="max-w-3xl mx-auto bg-gray-100">
          <div className="text-3xl font-bold">Your itineraries</div>
            </div>
        </div>
        <div className="container mx-auto sm:px-6 lg:px-8">
        <div className="text-3xl font-bold text-center">Explore</div>
        </div>
      </div>
      ) : (
        <Login1 />
      )}
    </>
  );
};

export default Home;
