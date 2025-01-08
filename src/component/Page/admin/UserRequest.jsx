import React, { useEffect, useState } from "react";
import axios from "axios";

function UserRequest() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/pending`
        );
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Error fetching data. Please try again later."
        );
        setLoading(false);
      }
    };
    fetchPendingUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/approve/${id}`
      );
      alert(res.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error approving the user. Please try again."
      );
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/reject/${id}`
      );
      alert(res.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error rejecting the user. Please try again."
      );
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!users.length) {
    return <div className="text-center text-lg">No pending user requests.</div>;
  }

  return (
    <div className="mx-auto mt-5 p-2 sm:p-4 md:p-6 lg:max-w-5xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">
              {user.FirstName} {user.LastName}
            </h3>
            <p className="text-gray-600">{user.Email}</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => handleApprove(user._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(user._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRequest;
