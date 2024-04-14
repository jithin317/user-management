import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ErrorToast,
  InfoToast,
  WarningToast,
} from "../../components/helpers/toast-container";
import { AuthContext } from "../../contexts/auth-context";

export default function Profile() {
  const navigate = useNavigate();
  const [isUpdated, setisUpdated] = useState(false);
  const [user, setUser] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const storedUserData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [isClicked, setIsClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { update, setUpdate } = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem("jwt_token")) ?? null;

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;
    if (imageFile.size > 5 * 1024 * 1024) {
      ErrorToast({ message: "Image size exceeds limit (5MB)" });
      return;
    }
    setSelectedImage(imageFile);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    InfoToast({ message: "Uploading..." });

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=76d05526fb0e8294a709d018f5d52ac8",
        formData
      );
      const data = response.data.data;
      const res = await axios.post(
        "http://localhost:5000/profile",
        { imageURL: data.display_url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("userData");
      setisUpdated(!isUpdated);
      setIsClicked(!isClicked);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  async function handleRemove() {
    if (!user?.imageURL) {
      return WarningToast({ message: "No profile picture to be removed" });
    }
    alert("Are you sure to remove your profile ?");
    try {
      const res = await axios.post(
        "http://localhost:5000/profile",
        { imageURL: "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("userData");
      setisUpdated(!isUpdated);
      InfoToast({ message: "Removed Successfully" });
    } catch (err) {
      console.log(err);
      ErrorToast({ message: err.message });
    }
  }

  useEffect(() => {
    (async () => {
      if (storedUserData) {
        setUser(storedUserData);
        setIsloading(false);
      } else {
        try {
          const response = await axios.get("http://localhost:5000/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          setUser(response.data.userDetails);
          localStorage.setItem(
            "userData",
            JSON.stringify(response.data.userDetails)
          );
          setIsloading(false);
        } catch (err) {
          console.log(err);
        }
      }
    })();
    setUpdate(!update);
    return () => setIsloading(true);
  }, [isUpdated]);

  function capitalize_Words(str) {
    if (!str) return;
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function toBirthday(bDay) {
    const date = new Date(bDay);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    // console.log(formattedDate);
    return formattedDate;
  }

  return (
    <div className="py-10 flex justify-center bg-gray-200">
      <div className="w-full flex items-center text-white">
        <div className="mx-auto p-5">
          {isloading ? (
            <h1 className="text-black font-xl">Please wait...</h1>
          ) : (
            <div className="md:flex no-wrap">
              {/* <!-- Left Side --> */}
              <div className="w-full min-w-3/12 rounded-xl md:w-5/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div className="bg-gray-50 h-full rounded-xl p-3 border-t-4 shadow-lg border-cyan-500">
                  <div className="w-[12rem] h-[12rem] mx-auto rounded-full md:rounded-none md:w-full">
                    <img
                      className="h-full w-full object-cover pointer-events-none rounded-full md:rounded-none"
                      src={
                        user.imageURL ||
                        "https://i.ibb.co/bKFQzMz/depositphotos-137014128-stock-illustration-user-profile-icon.webp"
                      }
                      alt="User-img"
                    />
                  </div>
                  <div className="mt-2 flex justify-evenly text-sm">
                    <button
                      onClick={handleRemove}
                      className="bg-cyan-400 font-medium  text-gray-800 px-3 py-2 cursor-pointer rounded-lg"
                    >
                      Remove Photo
                    </button>
                    <button
                      onClick={() => setIsClicked(!isClicked)}
                      className="bg-cyan-400 font-medium text-gray-800 px-3 py-2 cursor-pointer rounded-lg"
                    >
                      Add Photo{" "}
                    </button>
                  </div>
                  <div className="text-center w-full m-2">
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                      {`${user.FirstName || "Not"} ${
                        user.LastName || "Specified"
                      }`}
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    {`${
                      user.About ||
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente totam labore deserunt"
                    }`}
                  </p>
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        <span className="bg-green py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">
                        {capitalize_Words(toBirthday(user.createdAt || "NA"))}
                      </span>
                    </li>
                  </ul>
                </div>
                {/* <!-- End of profile card --> */}
              </div>
              {/* <!-- Right Side --> */}
              <div className="w-full md:w-11/12 my-2 md:my-0 md:mx-2">
                {/* <!-- Profile tab --> */}
                {/* <!-- About Section --> */}
                <div className="bg-white rounded-xl border-t-4 border-cyan-500 h-full p-3 md:p-5 shadow-lg">
                  <div className="flex items-center  space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-primary">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide  text-gray-900 ">About</span>
                  </div>
                  <div className="text-gray-700 mt-4">
                    <div className="grid gap-1.5 md:grid-cols-1 text-md">
                      <div className="grid grid-cols-2 text-balance">
                        <div className="px-4 py-2 font-semibold">FirstName</div>
                        <div className="px-4 py-2 break-words">
                          {capitalize_Words(user.FirstName || "Not Specified")}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 text-balance">
                        <div className="px-4 py-2 font-semibold">LastName</div>
                        <div className="px-4 py-2 break-words">
                          {capitalize_Words(user.LastName || "NA")}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 text-balance">
                        <div className="px-4 py-2 font-semibold">Gender</div>
                        <div className="px-4 py-2 break-words">
                          {capitalize_Words(user.Gender || "NA")}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 text-balance">
                        <div className="px-4 py-2 font-semibold">
                          Contact No
                        </div>
                        <div className="px-4 py-2 break-words">
                          {user.ContactNo
                            ? `${user.ContactNo.slice(
                                0,
                                3
                              )} ${user.ContactNo.slice(3)}`
                            : "NA"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 text-balance">
                        <div className="px-4 py-2 font-semibold">
                          Current Address
                        </div>
                        <div className="px-4 py-2 break-words">
                          {capitalize_Words(user.CurrentAddress) ||
                            "Not Specified"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 text-balance">
                        <div className="px-4 py-2 font-semibold">
                          Permanent Address
                        </div>
                        <div className="px-4 py-2 break-words">
                          {capitalize_Words(user.PermanentAddress) ||
                            "Not Specified"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 text-balance">
                        <div className="px-4 py-2 font-semibold">Email</div>
                        <div className="px-4 py-2 break-words">
                          <a
                            className="text-blue-800 "
                            href={`mailto:${user.Email || ""}`}
                          >
                            {capitalize_Words(user.Email || "Not Specified")}
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 text-balance">
                        <div className="px-4 py-2 font-semibold">Birthday</div>
                        <div className="px-4 py-2 break-words">
                          {capitalize_Words(toBirthday(user.Birthday) || "NA")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="block w-full text-indigo-600 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 mt-4"
                  >
                    Edit Information
                  </button>
                </div>

                <div className="my-4"></div>

                {/* <!-- Experience and education --> */}
                {/* <div className="bg-white p-3 md:p-5 shadow-lg rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center space-x-2 font-semibold leading-8 mb-3">
                        <span className="text-primary">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide text-gray-900">
                          Experience
                        </span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-gray-600 ">
                            Owner at his Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-gray-600 ">
                            Owner at his Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-primary">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide text-gray-900">
                          Education
                        </span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-gray-600 ">
                            Masters Degree in Oxford
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-gray-600 ">
                            Bachelors Degreen in LPU
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      {isClicked && (
        <div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsClicked(false);
            }}
            className="fixed inset-0 w-full h-full bg-black opacity-80"
          ></div>
          <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
            <div className="bg-white rounded-md shadow-lg px-4 py-6">
              <h1 className="text-lg font-medium text-gray-800 text-center mt-3">
                Upload Photo!
              </h1>
              <div className="border mx-auto w-full flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  className="mx-auto cursor-pointer w-full mt-2 px-3 py-2 text-black  bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={handleImageChange}
                />
              </div>
              <div className="items-center gap-2 mt-3 text-sm sm:flex">
                <button
                  onClick={handleUpload}
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Update Photo
                </button>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                  aria-label="Close"
                  onClick={() => setIsClicked(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
