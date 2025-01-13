import React, { useEffect, useState } from "react";
import axios from "axios";

function UserApprove() {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/approveData`
        );
        setApprovedUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching approved users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedUsers();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold text-center mb-4">Approved Users</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {approvedUsers.length > 0 ? (
            approvedUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white p-4  border border-gray-300 rounded-sm"
              >
                <h3 className="md:text-lg text-sm font-semibold">
                  {user.FirstName} {user.LastName}
                </h3>
                <p className="text-gray-600 text-sm">{user.Email}</p>
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600">
                  Approved
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No approved users found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserApprove;
