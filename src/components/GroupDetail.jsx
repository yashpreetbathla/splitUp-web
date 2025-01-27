import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../store/slices/groupSlice";
import Expenses from "./Expenses";
import { addExpenses } from "../store/slices/expensesSlice";

const GroupDetail = () => {
  const { groupId } = useParams();

  const groupData = useSelector((store) => store.group);
  const expensesData = useSelector((store) => store.expenses);
  const dispatch = useDispatch();

  const fetchGroupData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/group/" + groupId, {
        withCredentials: true,
      });

      dispatch(addGroup(res.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExpenseData = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/expense/group/summary/" + groupId,
        {
          withCredentials: true,
        }
      );
      console.log(res.data?.data);
      dispatch(addExpenses(res.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGroupData();
    fetchExpenseData();
  }, []);

  return (
    <div>
      <div>
        <DashboardNav titleNav={groupData?.name} buttonText="Create Expense" />
      </div>
      <div>
        <Expenses expensesData={expensesData} />
      </div>
    </div>
  );
};

export default GroupDetail;
