import { useParams, Link, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Comments from "../components/Comments";

export default function JobDetails() {
  const [jobDetail, setJobDetail] = useState();
  const [load, setLoad] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState();

  //console.log("jobDetail: ", jobDetail);
  // console.log("comment: ", comment);
  // console.log("allComments: ", allComments);
  const navigate = useNavigate();
  const { id } = useParams();

  const addToComment = (e) => {
    setComment(e);
  };

  //FOR FETCHING JOB DETAIL
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

  //FOR POSTING COMMENTS
  const handleCommentSubmit = (event) => {
    console.log("handleCommentSubmit is clicked");
    event.preventDefault();
    createComment(comment);
    setComment("");
    alert("comment submitted!");
    setLoad(true);
  };

  const createComment = (comment) => {
    fetch(`/api/job/createcomment/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  //FOR FETCHING COMMENTS AFTER POSTING
  useEffect(() => {
    fetch(`/api/job/comments/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllComments(data.allComments);
      })
      .then(setLoad(false))
      .catch((error) => console.log(error));
  }, [id, load]);

  return (
    <>
      {jobDetail ? (
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white shadow sm:rounded-lg m-5">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between">
                <h2
                  id="applicant-information-title"
                  className="text-lg leading-6 font-medium text-gray-900 space-between"
                >
                  {jobDetail.job.job_title}
                </h2>

                <button
                  type="button"
                  onClick={() => {
                    navigate(`createitinerary/`);
                  }}
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Create itinerary for {jobDetail.job.author.username}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fill-rule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Posted by{" "}
                <Link to={`/user/${jobDetail.job.authorId}`}>
                  <span className="text-sky-500 hover:text-sky-800">
                    {" "}
                    {jobDetail.job.author.username}
                  </span>
                </Link>
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Tip: ${jobDetail.job.pay} SGD
              </p>
            </div>
            <div className=" px-4 py-5 sm:px-6">
              <dl>
                <div className="mt-1 text-small text-gray-900 mb-5">
                  {jobDetail.job.job_body}
                </div>
              </dl>
            </div>

            <Comments
              allComments={allComments}
              handleCommentSubmit={handleCommentSubmit}
              addToComment={addToComment}
            />
          </div>
        </section>
      ) : (
        <>Loading</>
      )}
    </>
  );
}
