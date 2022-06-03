import { useEffect, useState } from "react";
import { loginAtom } from "../App";
import { useAtom } from "jotai";
import Login1 from "../components/Login1";
import MyJob from "../components/MyJob";
import MyItinerary from "../components/MyItinerary";

const Home = () => {
  const [login, setLogin] = useAtom(loginAtom);
  const [userJobs, setUserJobs] = useState();
  const [userItineraries, setUserItineraries] = useState();

  // console.log("userJobs:", userJobs);
  // console.log("userItineraries", userItineraries);

  //RETRIEVE JOBS THAT USER POSTED
  useEffect(() => {
    const showJobs = () => {
      fetch("/api/job/myjobs/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserJobs(data);
        })
        .catch((error) => console.log(error));
    };
    showJobs();
  }, [login]);

  //RETRIEVE ITINERARIES THAT USER POSTED
  useEffect(() => {
    const showItineraries = () => {
      fetch("/api/itinerary/myitineraries/all", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserItineraries(data);
        })
        .catch((error) => console.log(error));
    };
    showItineraries();
  }, [login]);

  //RETRIEVE ITINERARIES THAT USER SAVED

  return (
    <>
      {login ? (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col">
          <div className="text-3xl font-bold text-center mt-10">Your trips</div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <MyJob jobs={userJobs?.jobs} />
          </div>

          <div className="text-3xl font-bold text-center">Your itineraries</div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
            <MyItinerary posts={userItineraries?.itineraries} />
          </div>

          {/* <div className="container mx-auto sm:px-6 lg:px-8">
              <div className="text-3xl font-bold text-center">
                Saved Itineraries
              </div>
            </div> */}
        </div>
      ) : (
        <Login1 />
      )}
    </>
  );
};

export default Home;
