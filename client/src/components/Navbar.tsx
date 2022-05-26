import React from "react";
import { Outlet, Link } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-white text-blue">
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
              <div>Logout</div>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}
