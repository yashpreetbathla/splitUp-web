import React from "react";
import { Link } from "react-router-dom";

const ListGroups = ({ groupsData }) => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md space-y-2">
      {groupsData?.map((groupData) => {
        return (
          <Link to={"/group/" + groupData?._id}>
            <li className="list-row flex flex-row items-center bg-base-200 hover:bg-base-300 transition-all duration-300 relative overflow-hidden rounded-lg p-3 group">
              <div className="flex-shrink-0">
                <img
                  className="size-10 rounded-box transition-transform duration-300 group-hover:scale-110"
                  src={groupData?.photoUrl}
                  alt={groupData?.name}
                />
              </div>
              <div className="flex-1 min-w-0 ml-4">
                <div className="truncate font-medium transition-colors duration-300 group-hover:text-primary">
                  {groupData?.name}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                  {groupData?.description}
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default ListGroups;
