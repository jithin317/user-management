import axios from "axios";
import { useEffect, useState } from "react";
import {
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "../helpers/toast-container";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/getUsers"
        );
        setUsers(response.data.users);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [isUpdated]);

  async function handleDelete(userdetailsID, usersID) {
    InfoToast({ message: "please wait..." });
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/deleteUsers",
        {
          userdetailsID,
          usersID,
        }
      );
      console.log(response.data.message);
      setIsUpdated(!isUpdated);
      SuccessToast({ message: response.data.message });
    } catch (err) {
      ErrorToast({ message: "Some Error Occured" });
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        {users.length !== 0 && (
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-200 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Username</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Gender</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 bg-gray-50 divide-y">
              {users.map((item) => (
                <tr key={item._id}>
                  <td className="flex  items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      src={
                        item.imageURL ||
                        "https://i.ibb.co/bKFQzMz/depositphotos-137014128-stock-illustration-user-profile-icon.webp"
                      }
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {item.userId.username}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {item.userId.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.ContactNo || "NA"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Gender || "NA"}
                  </td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <button
                      onClick={() => {
                        handleDelete(item._id, item.userId._id);
                      }}
                      className="py-2 leading-none px-3 font-medium text-rose-600 hover:text-sose-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
