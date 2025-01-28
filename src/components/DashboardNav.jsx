import React from "react";

const DashboardNav = ({ titleNav, buttonText, onClickButton = () => {} }) => {
  return (
    <div className="navbar bg-base-200 flex flex-row justify-between items-center px-8">
      <div>{titleNav}</div>
      <div>
        <button
          className="btn btn-soft btn-secondary sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
          onClick={onClickButton}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default DashboardNav;
