import { Fragment, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ItinerarySubmissions from "../components/ItinerarySubmissions";

export default function JobResponses() {
  const [jobDetail, setJobDetail] = useState();
  console.log(jobDetail.job);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/job/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJobDetail(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <div>
        <div className="bg-white shadow sm:rounded-lg m-5">
          <div className="px-4 py-5 sm:px-6">
            <h2
              id="applicant-information-title"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              {jobDetail?.job.job_title}
            </h2>
          </div>
          <div className=" px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2">
              <div className="mt-1 text-small text-gray-900 mb-5">
                {jobDetail?.job.job_body}
              </div>
            </dl>
          </div>
          {/* Comments */}
          <ItinerarySubmissions itineraries={jobDetail?.job.itinerary} />
        </div>
      </div>
    </>
  );
}
