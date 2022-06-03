import { Link } from "react-router-dom";

export default function ItinerarySubmissions({ itineraries }) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-medium text-gray-900">
          Recent Itinerary Submissions:
        </h2>
        <div className="mt-6 pb-10 border-t border-b border-gray-200 divide-y divide-gray-200 space-y-10">
          {itineraries?.map((itinerary) => (
            <div
              key={itinerary.id}
              className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
            >
              <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                  <Link to={`/library/${itinerary.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 hover:text-sky-500 hover:underline">
                      {itinerary.itinerary_title}
                    </h3>
                  </Link>

                  <div className="mt-3 space-y-6 text-sm text-gray-500 truncate">
                    {itinerary.itinerary_body}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
                <p className="font-medium text-gray-900">
                  {itinerary.author.username}
                </p>{" "}
                <time
                  dateTime={itinerary.created_at}
                  className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                >
                  {itinerary.created_at.split("T", [1])}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
