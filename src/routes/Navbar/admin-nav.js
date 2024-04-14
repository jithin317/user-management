import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b">
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
          <div className="flex gap-3">
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="block py-3 px-4 font-medium text-center text-white bg-rose-600 hover:bg-rose-700 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
