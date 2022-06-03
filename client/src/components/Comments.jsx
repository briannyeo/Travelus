export default function Comments(props) {
  const { allComments, handleCommentSubmit, addToComment } = props;

  return (
    <div>
      {allComments ? (
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
                  {allComments.map((comment) => (
                    <li key={comment.id}>
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          {/* <img
                            className="h-10 w-10 rounded-full"
                            src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                            alt=""
                          /> */}
                          <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                            {comment.author.image ? (
                              <img src={comment.author.image} alt="user" />
                            ) : (
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {comment.author.username}
                            </div>
                          </div>
                          <div className="mt-1 text-sm text-gray-700">
                            <p>{comment.body}</p>
                          </div>
                          <div className="mt-2 text-sm space-x-2">
                            <span className="text-gray-500 font-medium">
                              {comment.created_at.split("T", [1])}
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
                  {/* <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt="user"
                  /> */}
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <form onSubmit={(event) => handleCommentSubmit(event)}>
                    <div>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={3}
                        className="shadow-sm block w-full focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Add a comment"
                        onChange={(event) => addToComment(event.target.value)}
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
      ) : (
        <>No comments yet</>
      )}
    </div>
  );
}
