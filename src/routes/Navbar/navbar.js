import { useState, useRef, useEffect, useContext } from "react";
import ProfileDropDown from "../../components/dropdowns/profile-dropdown";
import { AuthContext } from "../../contexts/auth-context";
import { Link } from "react-router-dom";
import axios from "axios";

// Profile Dropdown
export default function Navbar() {
  const [menuState, setMenuState] = useState(false);
  const { isAuthenticated, logout, update } = useContext(AuthContext);
  const [isloading, setIsloading] = useState(true);
  const [imgURL, setimgURL] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwt_token")) ?? null;
    if (token) {
      (async () => {
        try {
          const response = await axios.get("http://localhost:5000/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setimgURL(response.data.userDetails.imageURL);
          setIsloading(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    return () => setIsloading(true);
  }, [update]);

  return (
    <nav className="bg-white border-b z-[999]">
      <div className="flex items-center space-x-8 py-1 px-4 max-w-screen-xl mx-auto">
        <div className="flex-none lg:flex-initial">
          <a href="#">
            <img
              src="https://i.ibb.co/YtP0rh7/9391714.png"
              width={60}
              height={50}
              alt="logo"
            />
          </a>
        </div>
        <div className="flex-1 items-center justify-end gap-x-10 space-y-3 md:flex md:space-y-0">
          {isAuthenticated ? (
            isloading ? (
              <></>
            ) : (
              <ProfileDropDown
                className="mt-4 hidden z-[50] lg:block"
                signOut={logout}
                imgURL={
                  imgURL ||
                  "https://i.ibb.co/bKFQzMz/depositphotos-137014128-stock-illustration-user-profile-icon.webp"
                }
              />
            )
          ) : (
            <div className="flex gap-8">
              <Link
                to="/login"
                className="block font-medium py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="block py-3 px-4 font-medium text-center text-white bg-dark hover:bg-dark_hover active:bg-dark active:shadow-none rounded-lg shadow md:inline"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
