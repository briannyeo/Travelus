import React, { useState } from "react";

const Register = () => {
  return (
    <div>
      <label
        htmlFor="my-modal-4"
        className="cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-blue hover:opacity-75"
      >
        Register
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
          <form className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
            <button
              className="bg-blue text-white hover:bg-darkblue hover:border-transparent mt-10 btn btn-sm border-transparent"
              type="submit"
            >
              Login
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
