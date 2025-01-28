import React, { useEffect } from "react";
import DashboardNav from "./DashboardNav";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../store/slices/groupSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ListGroups from "./ListGroups";

const Feed = () => {
  const groupData = useSelector((store) => store.group);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/groups", {
        withCredentials: true,
      });
      if (res.data?.data) {
        dispatch(addGroup(res.data?.data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!groupData) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <DashboardNav titleNav="Groups" buttonText="Create Group" />
      <ListGroups groupsData={groupData} />
    </div>
  );
};

export default Feed;
