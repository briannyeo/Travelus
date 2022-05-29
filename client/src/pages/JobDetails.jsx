import { useParams, Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Comments from "../components/Comments";

export default function JobDetails() {
  const [jobDetail, setJobDetail] = useState();
  const [load, setLoad] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState();

  //console.log("jobDetail: ", jobDetail);
  console.log("comment: ", comment);
  console.log("allComments: ", allComments);
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
              <h2
                id="applicant-information-title"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                {jobDetail.job.job_title}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Posted by{" "}
                <Link to={`/user/${jobDetail.job.authorId}`}>
                  <span className="text-sky-500 hover:text-sky-800">
                    {" "}
                    {jobDetail.job.author.username}
                  </span>
                </Link>
              </p>
            </div>
            <div className=" px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2">
                <div className="mt-1 text-small text-gray-900 mb-5">
                  {jobDetail.job.job_body}
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 border-t pt-3 border-gray-200">
                    Attachments:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900"></dd>
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
