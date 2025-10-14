import React from "react";
import HrSidebar from "./HrSidebar";

const Offboarding = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-8 md:p-10 lg:p-12 ml-0 md:ml-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Offboarding</h1>
          <p className="text-gray-600 mb-6">Handle exit workflows: access revocation, asset returns, FnF, and letters.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Exit Queue</h2>
              <p className="text-sm text-gray-600">Employees in offboarding with status and last working day.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Department Tasks</h2>
              <p className="text-sm text-gray-600">IT revocation, Admin asset collection, Accounts FnF processing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offboarding;
