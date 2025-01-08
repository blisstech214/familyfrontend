import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import FamilyMemberForm from "./FamilyMemberForm";
import { Dialog } from "primereact/dialog";
import FamMemUpdate from "./FamMemUpdate";

const FamilyUI = (props) => {
  const [customers, setCustomers] = useState([]);
  const [showFamilyMemberForm, setShowFamilyMemberForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFamilyMembers = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/familyMemGet/${props.familyId}`
      )
      .then((res) => {
        setCustomers(res.data.data || []);
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
  }, [props]);

  const handleDelete = (customerId) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/familyMemDelete/${customerId}`
      )
      .then(() => {
        setCustomers((prev) =>
          prev.filter((customer) => customer._id !== customerId)
        );
      })
      .catch((error) => {
        console.error("Error deleting family member:", error);
      });
  };

  const handleEdit = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowEditForm(true);
  };

  return (
    <div className="space-y-5 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h4 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center sm:text-left">
          Family Members
        </h4>
        <button
          className="btn btn-primary flex items-center gap-2 px-4 py-2 rounded-md"
          onClick={() => setShowFamilyMemberForm(true)}
        >
          <FaPlusCircle className="text-lg font-bold" />
          <span className="text-sm sm:text-base">Add Family Member</span>
        </button>
      </div>

      {/* Dialog for Add Family Members Form */}
      <Dialog
        header="Add Family Member"
        visible={showFamilyMemberForm}
        onHide={() => setShowFamilyMemberForm(false)}
        style={{ width: "90vw", maxWidth: "600px" }}
      >
        <FamilyMemberForm familyId={props.familyId} />
        <button
          className="btn btn-secondary mt-3 w-full sm:w-auto"
          onClick={() => setShowFamilyMemberForm(false)}
        >
          Close
        </button>
      </Dialog>

      {/* Dialog for Edit Family Member Form */}
      <Dialog
        header="Edit Family Member"
        visible={showEditForm}
        onHide={() => setShowEditForm(false)}
        style={{ width: "90vw", maxWidth: "600px" }}
      >
        {selectedCustomerId && (
          <FamMemUpdate
            customerId={selectedCustomerId}
            onClose={() => setShowEditForm(false)}
            onUpdate={fetchFamilyMembers} // Refresh the list after update
          />
        )}
      </Dialog>

      <div className="card">
        {loading ? (
          <div className="text-center py-5">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop and Tablet View - Table Layout */}
            <div className="hidden sm:block">
              <table className="table-auto w-full border-collapse border border-gray-300 text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">Image</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">Name</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">DOB</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">Gender</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">
                      Marital Status
                    </th>
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">
                      Education
                    </th>
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">
                      Employment Status
                    </th>
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">
                      Contact Phone
                    </th>
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">
                      Occupation
                    </th>
                    <th className="px-2 py-2 sm:px-4 sm:py-2 border">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length > 0 ? (
                    customers.map((customer) => (
                      <tr key={customer._id}>
                        <td className="px-2 py-2 sm:px-4 sm:py-2 border">
                          <div className="flex justify-center items-center">
                            <img
                              src={
                                customer.image
                                  ? `${process.env.REACT_APP_API_BASE_URL}${customer.image}`
                                  : "https://via.placeholder.com/150"
                              }
                              alt={customer.name || "Family Member"}
                              className="object-cover rounded-full w-16 h-16"
                            />
                          </div>
                        </td>

                        <td className="px-2 py-2 sm:px-4 sm:py-2 border">
                          {customer.name}
                        </td>
                        <td className="px-2 py-2 sm:px-4 sm:py-2 border">
                          {customer.dob}
                        </td>
                        <td className="px-2 py-2 sm:px-4 sm:py-2 border">
                          {customer.gender}
                        </td>
                        <td className="px-2 py-2 sm:px-4 sm:py-2 border">
                          {customer.maritalStatus}
                        </td>
                        <td className="px-2 py-2 sm:px-4 sm:py-2 border">
                          {customer.education}
                        </td>
                        <td className="px-2 py-2 sm:px-4 sm:py-2 border">
                          {customer.employmentStatus}
                        </td>
                        <td className="px-2 py-2 sm:px-4 sm:py-2 border">
                          {customer.contactPhone}
                        </td>
                        <td className="px-2 py-2 sm:px-4 sm:py-2 border">
                          {customer.occupation}
                        </td>
                        <td className="px-2 py-2 sm:px-4 sm:py-2 border text-center">
                          <button
                            className="text-blue-500"
                            onClick={() => handleEdit(customer._id)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500 ml-3"
                            onClick={() => handleDelete(customer._id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center py-5">
                        No family members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Card Layout */}
            <div className="sm:hidden">
              {customers.length > 0 ? (
                customers.map((customer) => (
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
                        alt={customer.name || "Family Member"}
                        className="object-cover rounded-full w-16 h-16 mr-4"
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
                        <strong>Marital Status:</strong>{" "}
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
                      <button
                        className="text-blue-500"
                        onClick={() => handleEdit(customer._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(customer._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No family members found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyUI;
