//import { useEffect, useState } from "react";
import { loginAtom } from "../App";
import { useAtom } from "jotai";
import Login1 from "../components/Login1";



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
