import { useNavigate } from "react-router-dom";
import placeholder_image from "../images/placeholder_image.jpg";

export default function MyItinerary(props) {
  const { posts } = props;
  //("posts", posts);

  const navigate = useNavigate();

  return (
    <>
      {posts ? (
        <div className="relative mt-10 pt-20 pb-10 px-4 sm:px-6 lg:pt-4 lg:pb-28 lg:px-8">
          <div className="relative max-w-4xl  mx-auto">
            <div className="flex flex-no-wrap overflow-x-auto scrolling-touch items-start mb-8 ">
              {posts?.map((post) => (
                <div
                  key={post.id}
                  className="flex-none w-1/3 mr-8 md:pb-4 border rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-40 w-full object-cover"
                      src={post.image[0] ? post.image[0] : placeholder_image}
                      alt="destination"
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium ">
                        <span className="text-black-600">
                          {post.destination} ({post.num_days} day itinerary)
                        </span>
                      </p>

                      <div className="block mt-2">
                        <p
                          onClick={() => navigate(`/library/${post.id}`)}
                          className="text-xl font-semibold text-sky-500 hover:text-sky-800 hover:underline"
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
