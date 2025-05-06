import React, { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../store/slices/groupSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ListGroups from "./ListGroups";
import Modal from "./Modal";
import CreateGroupBody from "./CreateGroupBody";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const groupData = useSelector((store) => store.group);
  const userData = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);

  const [participants, setParticipants] = useState([]);
  const [groupName, setGroupName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchGroups = async () => {
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
      fetchGroups();
    }
  }, []);

  const handleCreateGroup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/group/create",
        {
          participants,
          name: groupName,
          admins: [userData?.email],
        },
        { withCredentials: true }
      );
      fetchGroups();
      navigate("/group/" + res.data?.data?._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <DashboardNav
        titleNav="Groups"
        buttonText="Create Group"
        onClickButton={() => setOpen(true)}
      />
      <ListGroups groupsData={groupData} />
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleCreateGroup}
          children={
            <CreateGroupBody
              participants={participants}
              groupName={groupName}
              setParticipants={setParticipants}
              setGroupName={setGroupName}
            />
          }
          isDisabled={participants?.length < 1}
        />
      )}
    </div>
  );
};

export default Feed;
