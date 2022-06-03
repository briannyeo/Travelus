import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MyItinerary from "../components/MyItinerary";
import MyJob from "../components/MyJob";

export default function ViewProfile() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState();
  //console.log("viewprofile", userDetails.user.jobs);

  //Retrieving User Info
  useEffect(() => {
    fetch(`/api/user/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return userDetails ? (
    <div className="flex w-max h-max">
      <h2>{userDetails?.user.username}</h2>
      <h2>{userDetails?.user.description}</h2>
      <span className="inline-block relative">
        <img
          className="h-16 w-16 rounded-full"
          src={userDetails?.user.image}
          alt="profileimg"
        />
        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-green-400" />
      </span>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <MyJob jobs={userDetails?.user.jobs} />
      </div>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
        <MyItinerary posts={userDetails?.user.proposal_itineraries} />
      </div>
    </div>
  ) : (
    <></>
  );
}
