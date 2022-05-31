import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState();
  const { register, handleSubmit } = useForm();
  const [imageSelected, setImageSelected] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [disable, setDisable] = useState(false);
  console.log(imageSelected);
  console.log(imageUrl);

  useEffect(() => {
    const showProfile = (profileDetails) => {
      fetch("/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => console.log(error));
    };
    showProfile();
  }, []);

  //UPDATE USER PROFILE
  const onSubmit = (userInfo) => {
    console.log(userInfo);
    userInfo.image = imageUrl;
    fetch("/api/user/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Your profile has been updated");
          //navigate(`/request`);
        } else {
          alert("Profile update failed, please try again!");
        }
      })
      .catch((error) => console.log(error));
  };

  //TO UPLOAD USER IMAGE TO CLOUDINARY
  const uploadImage = () => {
    // console.log("imageSelected: ", imageSelected);
    // console.log("uploadImage clicked");
    setDisable(true);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "oocipezd");
    // console.log(formData);

    Axios.post(
      "https://api.cloudinary.com/v1_1/duudexfbu/image/upload",
      formData
    ).then((response) => {
      console.log("response: ", response);
      console.log("response data: ", response.data);
      setImageUrl(response.data.url);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-gray-200 m-10"
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  @{profile?.username}
                </span>
                <input
                  type="text"
                  name={profile?.username}
                  {...register("username")}
                  id="username"
                  autoComplete="username"
                  defaultValue={profile?.user.username}
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  readOnly
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name={profile?.user.description}
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={profile?.user.description}
                  {...register("description")}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself! We suggest to include your
                hobbies, interests and where you're from!
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div className="mt-1 flex items-center">
                {/* <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span> */}
                {imageUrl ? (
                  <img
                    className="inline-block h-14 w-14 rounded-full"
                    src={`${imageUrl}`}
                    alt="user"
                  />
                ) : (
                  <span className="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}

                <div className="border-gray-300 border-dashed rounded-md">
                  {/* <input
                    className=""
                    type="file"
                    onChange={(event) => {
                      setImageSelected(event.target.files[0]);
                    }}
                  ></input>
                  <button
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={uploadImage}
                  >
                    Upload image
                  </button> */}
                  <div class="flex justify-center">
                    <div className="mb-3 w-96">
                      <label
                        for="formFileSm"
                        class="form-label inline-block mb-2 text-gray-700"
                      >
                        Select image for profile photo
                      </label>
                      <input
                        className="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="formFileSm"
                        type="file"
                        onChange={(event) => {
                          setImageSelected(event.target.files[0]);
                        }}
                      ></input>
                      <button
                        className="text-sm border border-solid border-gray-300"
                        onClick={uploadImage}
                        disabled={disable}
                      >
                        Upload image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
