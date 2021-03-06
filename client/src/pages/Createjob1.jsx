import { useForm } from "react-hook-form";
import countries from "../data/countries.json";
import { useNavigate } from "react-router-dom";

export default function Createjob1() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (jobinfo) => {
    console.log(jobinfo);
    fetch("/api/job/createjob", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobinfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Your job has been posted");
          navigate(`/request`);
        } else {
          alert("Job posting failed, please try again!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Submit an itinerary request!
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Destination
                </label>
                <div className="mt-1">
                  <select
                    id="destination"
                    {...register("destination")}
                    required
                    className="mb-3 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  >
                    {countries.map((country) => {
                      return <option>{country.name}</option>;
                    })}
                  </select>
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of days
                </label>
                <div className="mt-1">
                  <input
                    id="num_days"
                    {...register("num_days")}
                    required
                    className=" mb-3 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="mt-1">
                  <input
                    id="job_title"
                    {...register("job_title")}
                    required
                    className=" mb-3 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Body
                </label>
                <div className="mt-1">
                  <textarea
                    rows={5}
                    id="job_body"
                    {...register("job_body")}
                    required
                    className=" mb-3 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Tip amount (if any)
                </label>
                <div className="mt-1">
                  <input
                    id="pay"
                    {...register("pay")}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Submit request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
