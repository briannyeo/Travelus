import React from "react";
import { useForm } from "react-hook-form";

const Createjob = () => {
    const { register, handleSubmit } = useForm();
    //const onSubmit = data => console.log(data);
    const onSubmit = (jobinfo) => {
        console.log(jobinfo);
        fetch("/api/job/createjob", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobinfo),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              alert("Your job has been posted");
            } else {
              alert("Job posting failed, please try again!");
            }
          })
          .catch((error) => console.log(error));
      };
    
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <label className="label">
              <span className="label-text">Destination</span>
            </label>
        <input {...register("destination")} />
        <label className="label">
              <span className="label-text">Number of Days</span>
            </label>
        <input {...register("num_days")} />
        <label className="label">
              <span className="label-text">Title</span>
            </label>
        <input {...register("job_title")} />
        <label className="label">
              <span className="label-text">Body</span>
            </label>
        <input {...register("body")} />
        <label className="label">
              <span className="label-text">Payment (if any)</span>
            </label>
        <input {...register("pay")} />

        <button
              className="bg-blue text-white hover:bg-darkblue hover:border-transparent mt-10 btn btn-sm border-transparent"
              type="submit"
            >
              Register
            </button>
      </form>
    );
}

export default Createjob