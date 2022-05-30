import { useNavigate } from "react-router-dom";
import placeholder_image from "../images/placeholder_image.jpg";

export default function ItineraryCard(props) {
  const { posts } = props;
  console.log("posts", posts);

  const navigate = useNavigate();

  return (
    <>
      {posts ? (
        <div className="relative bg-gray-50 mt-10 pt-20 pb-10 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative max-w-4xl mx-auto">
            <div className="mt-1 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover"
                      src={post.image ? post.image : placeholder_image}
                      alt="destination"
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium ">
                        <span className="text-sky-600">
                          {post.destination} ({post.num_days} day itinerary)
                        </span>
                        <span className="text-gray-400">
                          {" "}
                          - posted by @{post.author.username}
                        </span>
                      </p>

                      <div className="block mt-2">
                        <p
                          onClick={() => navigate(`/library/${post.id}`)}
                          className="text-xl font-semibold text-gray-900 hover:text-sky-600 hover:underline"
                        >
                          {post.itinerary_title}
                        </p>
                        <p className="mt-3 text-base text-gray-600 truncate">
                          {post.itinerary_body}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <div>
                          <span className="sr-only">{post.authorId}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex text-sm text-gray-400">
                          <time dateTime={post.created_at}>
                            {post.created_at.split("T")[0]}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
