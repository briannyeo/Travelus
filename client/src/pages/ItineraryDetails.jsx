import { useParams, Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

export default function ItineraryDetails() {
  const [itinerary, setItineraryDetail] = useState();
  const [load, setLoad] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState("");

  console.log("itinerary: ", itinerary);
  console.log("comment: ", comment);

  const { id } = useParams();

  //FOR FETCHING ITINERARY DETAIL AND COMMENTS
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
    alert("comment submitted to the community");
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

  const comments = [
    {
      id: 1,
      name: "Leslie Alexander",
      date: "4d ago",
      imageId: "1494790108377-be9c29b29330",
      body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
    },
    {
      id: 2,
      name: "Michael Foster",
      date: "4d ago",
      imageId: "1519244703995-f4e0f30006d5",
      body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
    },
    {
      id: 3,
      name: "Dries Vincent",
      date: "4d ago",
      imageId: "1506794778202-cad84cf45f1d",
      body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
    },
  ];
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
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900"></dd>
                </div>
              </dl>
            </div>
            {/* Comments */}
            <section aria-labelledby="notes-title">
              <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="notes-title"
                      className="text-lg font-small text-gray-900"
                    >
                      Comments:
                    </h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <ul className="space-y-8">
                      {comments.map((comment) => (
                        <li key={comment.id}>
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                alt=""
                              />
                            </div>
                            <div>
                              <div className="text-sm">
                                {/* <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    {comment.name}
                                  </a> */}
                              </div>
                              <div className="mt-1 text-sm text-gray-700">
                                <p>{comment.body}</p>
                              </div>
                              <div className="mt-2 text-sm space-x-2">
                                <span className="text-gray-500 font-medium">
                                  {comment.date}
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        // src={user.imageUrl}
                        alt="user"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <form onSubmit={handleCommentSubmit}>
                        <div>
                          <textarea
                            id="comment"
                            name="comment"
                            rows={3}
                            className="shadow-sm block w-full focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Add a comment"
                            onChange={(event) => setComment(event.target.value)}
                          />
                        </div>
                        <div className="mt-3 flex ">
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          >
                            Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      ) : (
        <>Loading</>
      )}
    </>
  );
}
