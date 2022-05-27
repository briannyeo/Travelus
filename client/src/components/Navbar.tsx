import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { loginAtom } from "../App";
import { useAtom } from "jotai";

const Navbar = () => {
  const [login, setLogin] = useAtom(loginAtom);

  const navigate = useNavigate();

  //To handle logout button
  const handleLogout = (event: any) => {
    event.preventDefault();
    fetch("/api/user/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("You have successfully logged out!");
          //window.location.reload();
          setLogin(false);
          navigate("/");
          //code to delete the cookie here
        } else {
          alert("Logout failed, please try again");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="navbar bg-white text-blue border-b-4 border-solid border-lightgray">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={`/request`}>
                  <button>Itinerary Request</button>
                </Link>
              </li>
              <li>
                <Link to={`/library`}>
                  <button>Itinerary Library</button>
                </Link>
              </li>
              <li tabIndex={0}>
                <Link to={`profile`}>
                  <div className="justify-between">My Profile</div>
                </Link>
                <ul className="p-2">
                  <li>
                    <button>My Profile</button>
                  </li>
                  <li>
                    <button>Logout</button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link to={`/`}>
            <div className="btn btn-ghost normal-case text-xl">travelus</div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to={`/request`}>
                <button>Itinerary Request</button>
              </Link>
            </li>
            <li>
              <Link to={`/library`}>
                <button>Itinerary Library</button>
              </Link>
            </li>
            <li>
              <Login />
            </li>
            <li>
              <Register />
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`profile`}>
                <div className="justify-between">My Profile</div>
              </Link>
            </li>
            <li>
              <div onClick={handleLogout} className="justify-between">
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
