import React from "react";

const DashboardNav = () => {
  return (
    <div className="navbar bg-base-300 flex flex-row justify-between items-center px-8">
      <div>Groups</div>
      <div>
        <button className="btn btn-soft btn-secondary sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default DashboardNav;
