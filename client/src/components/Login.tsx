import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// interface UserInfo {
//   username: string;
//   password: string;
// }

const Login = () => {
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  //const [errorMessages, setErrorMessages] = useState({});
  //const [user, setUser] = useState("");
  console.log(username, password);

  //const navigate = useNavigate();

  // const checkUser = (userInfo) => {
  //   fetch("/api/user/account", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userInfo),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === "success") {
  //         //setLogin(true); //check that the cookie.user exists? should be on index page
  //         alert("Login successful. Welcome to travelus!");
  //         //navigate("/")
  //       } else {
  //         alert("Login failed. Please try again or register as a new user");
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userInfo = { username, password };
    console.log("submit button clicked");
    console.log(userInfo);
    //checkUser(userInfo); //LINK to backend
  };

  return (
    <div>
      <label
        htmlFor="my-modal-4"
        className="cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-blue hover:opacity-75"
      >
        Login / Sign-Up
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="my-modal-4"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            x
          </label>
          <h3 className="text-xl font-bold text-left border-b-2 pb-3">
            travelus
          </h3>
          <form
            onSubmit={handleSubmit}
            className="form-control w-full max-w-xs flex justify-center"
          >
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.target.value)
              }
            />
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
            <button type="submit">Login</button>
          </form>
          <span>
            Don't have an account? <Link to={`/register`}>Sign up now</Link>
          </span>
        </label>
      </label>
    </div>
  );
};

export default Login;
