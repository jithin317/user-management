import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileDropDown({
  className = "",
  signOut,
  imgURL = "",
  name = "",
  email = "",
}) {
  const [state, setState] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleDropDown = (e) => {
      if (profileRef.current) {
        if (!profileRef.current.contains(e.target)) setState(false);
      }
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <div className={`relative p-2 md:p-0 ${className}`}>
      <div className="flex items-center z-[50] space-x-8">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-cyan-600"
          onClick={() => setState(!state)}
        >
          <img
            src={`${imgURL}`}
            className="w-full h-full rounded-full pointer-events-none"
            alt="User_img"
          />
        </button>
        <div className="lg:hidden">
          <span className="block text-black">{name}</span>
          <span className="text-sm text-gray-400">{email}</span>
        </div>
      </div>
      <ul
        className={`bg-[#040507] z-[999] top-12 right-2 mt-4 space-y-4 w-fit lg:bg-white lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        <li>
          <Link
            className="block z-[999] text-gray-200 lg:text-gray-600 lg:rounded-md lg:hover:bg-gray-200 lg:p-3"
            to={"/profile"}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            onClick={() => signOut()}
            className="block z-[50] text-gray-200 lg:text-gray-600 lg:rounded-md lg:hover:bg-gray-200 cursor-pointer lg:p-3"
          >
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
}
