import React from "react";
import UserRequest from "./UserRequest";
import UserApprove from "./UserApprove";
import UserReject from "./UserReject";

function AdminResponse() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Admin Request
      </h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white shadow-md p-6 rounded-md">
          <UserRequest />
        </div>
        <div className="bg-white shadow-md p-6 rounded-md">
          <UserApprove />
        </div>
        <div className="bg-white shadow-md p-6 rounded-md">
          <UserReject />
        </div>
      </div>
    </div>
  );
}

export default AdminResponse;
