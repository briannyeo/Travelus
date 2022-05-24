import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CountrySelector from "./countrylist";
import { z } from "zod";

// type Data = {
//   username: string;
//   password: string;
//   location_based: string;
// };

// const User = z.object({
//   id: z.number(),
//   username: z.string(),
//   password: z.string(),
//   location_based: z.string(),
// });

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (userinfo: any) => {
    console.log(userinfo);
    fetch("/api/user/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          //setLogin(true); //check that the cookie.user exists? should be on index page
          alert("Registration successful. Welcome to travelus!");
          //navigate("/")
        } else {
          alert("Registration failed. Please try again ");
        }
      })
      .catch((error) => console.log(error));
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div>
      <label
        htmlFor="register-modal"
        className="cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-blue hover:opacity-75"
      >
        Register
      </label>
      <input type="checkbox" id="register-modal" className="modal-toggle" />
      <label htmlFor="register-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="register-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            x
          </label>
          <h3 className="text-xl font-bold text-left border-b-2 pb-3">
            travelus
          </h3>
          <form
            className="form-control w-full max-w-xs "
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("username")}
            />
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("password")}
            />
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            {/* <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("location_based")}
            /> */}
            <select
              {...register("location_based")}
              className="select w-full max-w-xs"
            >
              <option disabled selected>
                Country
              </option>
              <option>Singapore</option>
              <option>Malaysia</option>
              <option>Thailand</option>
              <option>China</option>
              <option>USA</option>
            </select>
            {/* need to make all countries */}
            {/* <CountrySelector /> */}
            {errors.exampleRequired && <span>This field is required</span>}
            <button
              className="bg-blue text-white hover:bg-darkblue hover:border-transparent mt-10 btn btn-sm border-transparent"
              type="submit"
            >
              Register
            </button>
          </form>
          <span>
            Already have an account?{" "}
            <label
              htmlFor="my-modal-4"
              className="hover:text-darkblue text-blue"
            >
              Login now
            </label>
          </span>
        </label>
      </label>
    </div>
  );
};

export default Register;
