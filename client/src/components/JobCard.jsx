import { useNavigate } from "react-router-dom";

export default function JobCard(props) {
  const { jobs } = props;
  //console.log("jobs", jobs);

  const navigate = useNavigate();

  return (
    <>
      {jobs ? (
        <div className="relative mt-2 pt-20 pb-10 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
          <div className="relative max-w-4xl mx-auto">
            <div className="mt-1 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {jobs.jobs?.map((job, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium ">
                        <span className="text-black-600">
                          {job.destination} ({job.num_days} days)
                        </span>
                        <span className="text-gray-400">
                          {" "}
                          - posted by @{job.author.username}
                        </span>
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        <div>Tip: ${job.pay} SGD </div>
                      </p>
                      <div className="block mt-2">
                        <p
                          onClick={() => navigate(`/request/${job.id}`)}
                          className="text-xl font-semibold text-sky-500 hover:text-sky-800 hover:underline"
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
