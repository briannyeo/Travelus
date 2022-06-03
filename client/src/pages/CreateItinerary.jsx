import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import countries from "../data/countries.json";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../components/UploadWidget";
import ImageModal from "../components/ImageModal";

export default function CreateItinerary() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);

  // const [modal, setmodal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  const openModal = () => {};

  const addImagesURL = (url) => {
    setImageUrls(url);
    console.log("imageUrls: ", imageUrls);
  };

  const onSubmit = async (itineraryinfo) => {
    // event.preventDefault();
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
            Share an itinerary with everyone!
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
                <label className="block text-sm font-medium text-gray-700">
                  Body
                </label>
                <div className="mt-1">
                  <textarea
                    rows={5}
                    id="itinerary_body"
                    {...register("itinerary_body")}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex text-sm text-gray-600">
                <UploadWidget addImagesURL={addImagesURL} />
                <div className="flex">
                  {imageUrls?.map((imageSrc) => (
                    <div>
                      <img
                        className=" mr-3 inline-block h-14 w-14 "
                        src={imageSrc}
                        alt="itinerarypics"
                        // onClick={openModal}
                      />
                      <ImageModal />
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG</p>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
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
