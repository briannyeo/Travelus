import { Link } from "react-router-dom";

const ItineraryRequest = () => {
  return (
    <>
      <h1>ItineraryRequest</h1>
      <Link to={`/createjob`}>
        <button className="btn bg-white">Create job</button>
      </Link>

      {/* Fetch all intineraryrequests */}
    </>
  );
};

export default ItineraryRequest;
