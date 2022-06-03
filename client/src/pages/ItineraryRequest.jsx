import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/react/outline";
import JobCard from "../components/JobCard";

const ItineraryRequest = () => {
  const [jobs, setJobs] = useState({});
  //console.log(jobs);

  useEffect(() => {
    const showJobs = (jobEntry) => {
      fetch("/api/job", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobEntry),
      })
        .then((response) => response.json())
        .then((data) => {
          setJobs(data);
        })
        .catch((error) => console.log(error));
    };
    showJobs();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="header text-center text-5xl font-bold mt-20">
        Itinerary Requests
      </div>
      <div className="header text-center text-2xl font-bold mt-5 ">
        Submit request
        <Link to={`/createjob`}>
          <button
            type="button"
            className="ml-3 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
          </button>
        </Link>
      </div>

      {jobs ? <JobCard jobs={jobs} /> : <></>}
    </div>
  );
};

export default ItineraryRequest;
