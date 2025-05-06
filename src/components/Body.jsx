import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/slices/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });

      if (res.data?.data && !userData) {
        dispatch(addUser(res.data?.data));
      }
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
