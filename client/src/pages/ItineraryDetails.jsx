import { useParams, Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Comments from "../components/Comments";

export default function ItineraryDetails() {
  const [itinerary, setItineraryDetail] = useState();
  const [load, setLoad] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState();

  //console.log("itinerary: ", itinerary);
  // console.log("comment: ", comment);
  // console.log("allComments:", allComments);

  const { id } = useParams();

  const addToComment = (e) => {
    setComment(e);
  };

  //FOR FETCHING ITINERARY DETAIL
  useEffect(() => {
    fetch(`/api/itinerary/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItineraryDetail(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  //FOR POSTING COMMENTS
  const handleCommentSubmit = (event) => {
    console.log("handleCommentSubmit is clicked");
    event.preventDefault();
    createComment(comment);
    setComment("");
    alert("comment submitteD!");
    setLoad(true);
  };

  const createComment = (comment) => {
    fetch(`/api/itinerary/${id}`, {
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
    fetch(`/api/itinerary/comments/${id}`, {
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

  //   const comments = [
  //     {
  //       id: 1,
  //       name: "Leslie Alexander",
  //       date: "4d ago",
  //       imageId: "1494790108377-be9c29b29330",
  //       body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  //     },
  //     {
  //       id: 2,
  //       name: "Michael Foster",
  //       date: "4d ago",
  //       imageId: "1519244703995-f4e0f30006d5",
  //       body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  //     },
  //     {
  //       id: 3,
  //       name: "Dries Vincent",
  //       date: "4d ago",
  //       imageId: "1506794778202-cad84cf45f1d",
  //       body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  //     },
  //   ];
  return (
    <>
      {itinerary ? (
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white shadow sm:rounded-lg m-5">
            <div className="px-4 py-5 sm:px-6">
              <h2
                id="applicant-information-title"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                {itinerary.itinerary.itinerary_title}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Posted by{" "}
                <Link to={`/user/${itinerary.itinerary.authorId}`}>
                  <span className="text-sky-500 hover:text-sky-800">
                    {itinerary.itinerary.author.username}
                  </span>
                </Link>
              </p>
            </div>
            <div className=" px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2">
                <div className="mt-1 text-small text-gray-900 mb-5">
                  {itinerary.itinerary.itinerary_body}
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 border-t pt-3 border-gray-200">
                    Attachments:
                    <div className="flex">
                      {itinerary?.itinerary.image.map((imageSrc) => (
                        <img
                          className=" mr-3 inline-block h-14 w-14 "
                          src={imageSrc}
                          alt="itinerarypics"
                        />
                      ))}
                    </div>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900"></dd>
                </div>
              </dl>
            </div>
            {/* Comments */}
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
