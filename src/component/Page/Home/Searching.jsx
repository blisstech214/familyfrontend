import React, { useState, useEffect } from "react";
import axios from "axios";
const json = require("../../../state.json");

function Searching() {
  const [familyGroups, setFamilyGroups] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFamilyGroup, setSelectedFamilyGroup] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useState({
    username: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    fetchFamilyGroups();
  }, []);

  const fetchFamilyGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/userData`
      );
      setFamilyGroups(response.data.data || []);
      setFilteredData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching family groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFamilyMembers = async (familyId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/familyMemGet/${familyId}`
      );
      setFamilyMembers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching family members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = () => {
    const { username, state, city } = searchParams;

    const filtered = familyGroups.filter((family) => {
      const matchesUsername = username
        ? family.UserName?.toLowerCase().includes(username.toLowerCase())
        : true;
      const matchesState = state
        ? family.State?.toLowerCase() === state.toLowerCase()
        : true;
      const matchesCity = city
        ? family.City?.toLowerCase() === city.toLowerCase()
        : true;

      return matchesUsername && matchesState && matchesCity;
    });

    setFilteredData(filtered);
  };

  const handleFamilyGroupClick = (family) => {
    setSelectedFamilyGroup(family);
    fetchFamilyMembers(family._id);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-4 md:p-6">
      {/* Search Form */}
      <div className="bg-white rounded-lg p-4 md:p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Search by Name, State, and City
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4">
          <input
            type="text"
            name="username"
            value={searchParams.username}
            onChange={handleInputChange}
            className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Name"
          />
          <select
            name="state"
            value={searchParams.state}
            onChange={handleInputChange}
            className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            {Object.keys(json).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            name="city"
            value={searchParams.city}
            onChange={handleInputChange}
            className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!searchParams.state}
          >
            <option value="">Select City</option>
            {json[searchParams.state]?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
        >
          Search
        </button>
      </div>

      {/* Family Groups and Members */}
      <div className="flex flex-wrap w-full max-w-6xl">
        {/* Selected Family Card and Members */}
        {selectedFamilyGroup && (
          <div className="flex flex-col md:flex-row w-full mb-6">
            {/* Selected Family Card */}
            <div className="w-full md:w-1/3 flex items-center justify-center mb-4 md:mb-0">
              <div className="p-4 bg-blue-50 rounded-lg shadow-md border-2 border-blue-600 flex items-center gap-4">
                <img
                  src={
                    selectedFamilyGroup.image ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Selected Family"
                  className="object-cover rounded-full w-24 h-24"
                />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    {selectedFamilyGroup.UserName || "N/A"}
                  </h3>
                  <p className="text-gray-600">{selectedFamilyGroup.City}</p>
                </div>
              </div>
            </div>

            {/* Family Members Table */}
            <div className="w-full md:flex-grow bg-white rounded-lg shadow-md p-4 md:p-6 overflow-x-auto">
              <h3 className="text-xl font-bold mb-4 text-blue-800">
                Family Members of {selectedFamilyGroup.UserName}
              </h3>
              <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-2 border">Name</th>
                    <th className="px-2 py-2 border">DOB</th>
                    <th className="px-2 py-2 border">Gender</th>
                    <th className="px-2 py-2 border">Marital Status</th>
                    <th className="px-2 py-2 border">Education</th>
                    <th className="px-2 py-2 border">Employment Status</th>
                    <th className="px-2 py-2 border">Contact Phone</th>
                    <th className="px-2 py-2 border">Occupation</th>
                  </tr>
                </thead>
                <tbody>
                  {familyMembers.length > 0 ? (
                    familyMembers.map((member) => (
                      <tr key={member._id}>
                        <td className="px-2 py-2 border">{member.name}</td>
                        <td className="px-2 py-2 border">{member.dob}</td>
                        <td className="px-2 py-2 border">{member.gender}</td>
                        <td className="px-2 py-2 border">
                          {member.maritalStatus}
                        </td>
                        <td className="px-2 py-2 border">{member.education}</td>
                        <td className="px-2 py-2 border">
                          {member.employmentStatus}
                        </td>
                        <td className="px-2 py-2 border">
                          {member.contactPhone}
                        </td>
                        <td className="px-2 py-2 border">
                          {member.occupation}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No family members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other Family Cards */}
        <div className="flex flex-wrap gap-4 justify-center items-center w-full">
          {filteredData
            .filter((family) => family._id !== selectedFamilyGroup?._id)
            .map((family) => (
              <div
                key={family._id}
                className="p-4 bg-blue-50 rounded-lg shadow-md cursor-pointer flex items-center gap-4 transition-transform duration-300 w-full sm:w-1/2 md:w-1/4"
                onClick={() => handleFamilyGroupClick(family)}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {family.UserName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    {family.UserName || "N/A"}
                  </h3>
                  <p className="text-gray-600">{family.City}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Searching;
