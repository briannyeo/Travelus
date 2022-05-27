import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid'
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline'

const ItineraryRequest = () => {

  const [jobs, setJobs] = useState({})

  useEffect(() => {
    const showJobs = () => {
      fetch("/api/job", {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        //no body?
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
      <div className="header text-center text-5xl font-bold mt-5">
    Itinerary Requests
    </div>
    <div className="header text-center text-2xl font-bold mt-5 ">
    Submit request
    <Link to={`/createjob`}>
      <button
        type="button"
        className="ml-3 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
      </button>
      </Link>
    </div>
      

      {/* Fetch all intineraryrequests */}
      </div>
  );
};

export default ItineraryRequest;
