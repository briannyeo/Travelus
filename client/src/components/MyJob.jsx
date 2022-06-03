import { Link, useNavigate } from "react-router-dom";

export default function MyJob(props) {
  const { jobs } = props;

  const navigate = useNavigate();

  return (
    <>
      {jobs ? (
        <div className="relative  mt-10 pt-20 pb-10 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative max-w-4xl mx-auto">
            <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8">
              {jobs.jobs?.map((job, index) => (
                <div
                  key={index}
                  className="flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 border rounded-lg"
                >
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium ">
                        <span className="text-sky-600">
                          {job.destination} ({job.num_days} days)
                        </span>
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        <div>Tip: ${job.pay} SGD </div>
                      </p>
                      <div className="block mt-2">
                        <p
                          onClick={() => navigate(`/request/${job.id}`)}
                          className="text-xl font-semibold text-gray-900 hover:text-sky-600 hover:underline"
                        >
                          {job.job_title}{" "}
                        </p>
                        <p className="mt-3 text-base text-gray-600 truncate">
                          {job.job_body}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {/* <a href={job.author.href} className="hover:underline">
                          {job.author.name}
                        </a> */}
                        </p>
                        <div className="flex text-sm text-gray-400">
                          <time dateTime={job.created_at}>
                            {job.created_at.split("T")[0]}
                          </time>
                        </div>
                        <Link to={`/jobresponses/${job.id}`}>
                          <div className="flex text-sm text-gray-400 hover:text-sky-600 hover:underline">
                            Submitted Itineraries: {job.itinerary.length}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>No requests found</div>
      )}
    </>
  );
}
