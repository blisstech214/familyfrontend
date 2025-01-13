import React, { useEffect, useState } from "react";
import axios from "axios";

function UserReject() {
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRejectedUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/rejectData`
        );
        setRejectedUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching rejected users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedUsers();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold text-center mb-4">Rejected Users</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rejectedUsers.length > 0 ? (
            rejectedUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white p-4 border border-gray-300 rounded-sm"
              >
                <h3 className="md:text-lg text-sm font-semibold">
                  {user.FirstName} {user.LastName}
                </h3>
                <p className="text-gray-600 text-sm">{user.Email}</p>
                <button className="bg-red-600 text-white px-4 py-2 mt-4 rounded hover:bg-red-700">
                  Rejected
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No rejected users found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserReject;
