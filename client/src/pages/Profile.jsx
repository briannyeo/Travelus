import ItineraryCard from "../components/ItineraryCard";
import { useEffect, useState } from "react";

const Profile = () => {

  const [jobs, setJobs] = useState([]);
  const [load, setLoad] = useState(false);
  //fetch all journal entries
  
  useEffect(() => {
    const showJobs = (jobs) => {
      fetch(("/api/jobs/myjobs"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobs),
      })
        .then((response) => response.json())
        .then((data) => {
          setJobs(data);
          setLoad(true);
        })
        .catch((error) => console.log(error));
    };
    showJobs();
  }, [load]);

   

  return (
    <div className="hero min-h-screen bg-white">
      <div className="hero-content flex-col lg:flex-row">
        <div className="border-solid border-lightgray border-5 mr-5">
          <img
            src="https://api.lorem.space/image/movie?w=260&h=400"
            className="max-w-sm rounded-full shadow-2xl "
            alt="profile"
          />
        </div>

        <div className="ml-40 flex-col">
          <div className="tabs">
            <button className="tab tab-bordered">My trips</button>
            <button className="tab tab-bordered tab-active">
              My saved itineraries
            </button>
            <button className="tab tab-bordered">
              My submitted itineraries
            </button>
          </div>
          {/* <ItineraryCard /> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
