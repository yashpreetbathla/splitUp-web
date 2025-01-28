import React from "react";

const DashboardNav = ({
  titleNav,
  buttonText,
  onClickButton = () => {},
  infoData = () => {},
}) => {
  return (
    <div className="navbar bg-base-200 flex flex-row justify-between items-center px-8">
      <div className="flex flex-row items-center gap-2">
        <div>{titleNav}</div>
        <div>{infoData()}</div>
      </div>
      <button
        className="btn btn-soft btn-secondary sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
        onClick={onClickButton}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default DashboardNav;
