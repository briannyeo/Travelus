import React, { useState } from "react";
import { Link } from "react-router-dom"
import { useAtom } from "jotai";
import { loginAtom } from "../App";
import travelus from "../images/travelus.png"
import background_img from "../images/background_img.jpg"


export default function Login1() {
const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useAtom(loginAtom);

  const checkUser = () => {
    fetch("/api/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setLogin(true); //check that the cookie.user exists? should be on index page
          alert("Login successful. Welcome to travelus!");
          //navigate("/")
        } else {
          alert("Login failed. Please try again or register as a new user");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginInfo = { username, password };
    console.log(loginInfo);
    console.log("submit button clicked");
    checkUser(loginInfo); //LINK to backend
  };
    return (
      <>

        <div className="h-screen flex">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-12 w-auto"
                  src={travelus}
                  alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
               
              </div>
  
              <div className="mt-8">
                <div className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <div className="mt-1">
                        <input
                          id="username"
                          name="username"
                          type="username"
                          autoComplete="username"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={(event)=>setUsername(event.target.value)}
                        />
                      </div>
                    </div>
  
                    <div className="space-y-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={(event)=>setPassword(event.target.value)}
                        />
                      </div>
                    </div>
  
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <Link to={'/register'}>
                        <div className="font-medium text-indigo-600 hover:text-indigo-500">
                          New user? Register here!
                        </div>
                        </Link>
                      </div>
                    </div>
  
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative w-0 flex-1">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={background_img}
              alt="background"
            />
          </div>
        </div>
      </>
    )
  }
  