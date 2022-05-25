import React, { useState } from "react";

interface LoginInfo {
  username: string;
  password: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const [errorMessages, setErrorMessages] = useState({});
  //const [user, setUser] = useState("");

  console.log(username, password);

  //const navigate = useNavigate();

  const checkUser = ({ username, password }: LoginInfo) => {
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
          //setLogin(true); //check that the cookie.user exists? should be on index page
          alert("Login successful. Welcome to travelus!");
          //navigate("/")
        } else {
          alert("Login failed. Please try again or register as a new user");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const loginInfo = { username, password };
    console.log(loginInfo);

    console.log("submit button clicked");

    checkUser(loginInfo); //LINK to backend
  };

  return (
    <div>
      <label
        htmlFor="login-modal"
        className="cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-blue hover:opacity-75"
      >
        Login / Sign-Up
      </label>
      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <label htmlFor="login-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="login-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            x
          </label>
          <h3 className="text-xl font-bold text-left border-b-2 pb-3">
            travelus
          </h3>
          <form
            onSubmit={handleSubmit}
            className="form-control w-full max-w-xs "
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
            <button
              className="bg-blue text-white hover:bg-darkblue hover:border-transparent mt-10 btn btn-sm border-transparent"
              type="submit"
            >
              Login
            </button>
          </form>
          <span>
            Don't have an account?{" "}
            <label
              htmlFor="register-modal"
              className="hover:text-darkblue text-blue"
            >
              Sign up now!
            </label>
          </span>
        </label>
      </label>
    </div>
  );
};

export default Login;
