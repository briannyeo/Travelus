import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import countries from "../data/countries.json";
import { useNavigate } from "react-router-dom";
//import Axios from "axios";
import UploadWidget from "../components/UploadWidget";

export default function CreateItinerary() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);

  const addImagesURL = (url) => {
    setImageUrls(url);
    console.log("imageUrls: ", imageUrls);
  };

  const onSubmit = async (itineraryinfo) => {
    console.log("itineraryinfo", itineraryinfo);
    // const addImageToItineraries = () => {
    //   itineraryinfo.image = imageUrls;
    // };
    // addImageToItineraries();

    itineraryinfo.image = imageUrls;
    await fetch("/api/itinerary/createitinerary", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryinfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Your itinerary has been posted");
          navigate(`/library`);
        } else {
          alert("Job posting failed, please try again!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Share An Itinerary With Everyone!
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="mt-1">
                  <input
                    id="itinerary_title"
                    {...register("itinerary_title")}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Body
                </label>
                <div className="mt-1">
                  <textarea
                    id="itinerary_body"
                    {...register("itinerary_body")}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex text-sm text-gray-600">
                <UploadWidget addImagesURL={addImagesURL} />
                <div className="flex">
                  {imageUrls?.map((imageSrc) => (
                    <img
                      className=" mr-3 inline-block h-14 w-14 "
                      src={imageSrc}
                      alt="itinerarypics"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG</p>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Share Itinerary
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
