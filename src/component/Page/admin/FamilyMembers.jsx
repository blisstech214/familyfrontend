import React, { useState, useEffect } from "react";
import axios from "axios";

const FamilyMembers = ({ id }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFamilyMembers = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/familyMemGet/${id}`)
      .then((res) => {
        setMembers(res.data.data || []);
        console.log("Family members:", res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching family members:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFamilyMembers();
  }, [id]); // Refetch when `id` changes

  return (
    <div className="space-y-5">
      {/* Family Members Table (for larger screens) */}
      <div className="card">
        {loading ? (
          <div className="text-center py-5">Loading...</div>
        ) : (
          <>
            {/* Table for Desktop and Tablet */}
            <div className="hidden sm:block">
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border text-left">Image</th>
                      <th className="px-4 py-2 border text-left">Name</th>
                      <th className="px-4 py-2 border text-left">DOB</th>
                      <th className="px-4 py-2 border text-left">Gender</th>
                      <th className="px-4 py-2 border text-left">
                        Marital Status
                      </th>
                      <th className="px-4 py-2 border text-left">Education</th>
                      <th className="px-4 py-2 border text-left">
                        Employment Status
                      </th>
                      <th className="px-4 py-2 border text-left">
                        Contact Phone
                      </th>
                      <th className="px-4 py-2 border text-left">Occupation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.length > 0 ? (
                      members.map((customer) => (
                        <tr key={customer._id}>
                          <td className="px-4 py-2 border">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16">
                              <img
                                src={
                                  customer.image
                                    ? `${process.env.REACT_APP_API_BASE_URL}${customer.image}`
                                    : "https://via.placeholder.com/150"
                                }
                                className="object-cover rounded-full w-full h-full"
                                alt="Profile"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-2 border">{customer.name}</td>
                          <td className="px-4 py-2 border">{customer.dob}</td>
                          <td className="px-4 py-2 border">
                            {customer.gender}
                          </td>
                          <td className="px-4 py-2 border">
                            {customer.maritalStatus}
                          </td>
                          <td className="px-4 py-2 border">
                            {customer.education}
                          </td>
                          <td className="px-4 py-2 border">
                            {customer.employmentStatus}
                          </td>
                          <td className="px-4 py-2 border">
                            {customer.contactPhone}
                          </td>
                          <td className="px-4 py-2 border">
                            {customer.occupation}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center py-5">
                          No family members found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card Layout for Small Screens (Mobile, Tablet) */}
            <div className="sm:hidden">
              {members.length > 0 ? (
                members.map((customer) => (
                  <div
                    key={customer._id}
                    className="border rounded-lg p-4 mb-4 shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={
                          customer.image
                            ? `${process.env.REACT_APP_API_BASE_URL}${customer.image}`
                            : "https://via.placeholder.com/150"
                        }
                        className="object-cover rounded-full w-16 h-16 mr-4"
                        alt="Profile"
                      />
                      <div className="flex flex-col">
                        <h5 className="font-semibold">{customer.name}</h5>
                        <p className="text-sm text-gray-500">
                          {customer.occupation}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong>DOB:</strong> {customer.dob}
                      </div>
                      <div>
                        <strong>Gender:</strong> {customer.gender}
                      </div>
                      <div>
                        <strong>Marital Status:</strong>
                        {customer.maritalStatus}
                      </div>
                      <div>
                        <strong>Education:</strong> {customer.education}
                      </div>
                      <div>
                        <strong>Employment:</strong> {customer.employmentStatus}
                      </div>
                      <div>
                        <strong>Phone:</strong> {customer.contactPhone}
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <button className="text-blue-500">Edit</button>
                      <button className="text-red-500">Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No family members found.</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyMembers;
