import React from "react";
import ExpenseSummary from "./ExpenseSummary";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Expenses = ({ expensesData, fetchExpenseData }) => {
  const handleDeleteExpense = async (e, expenseId) => {
    try {
      const res = await axios.delete(BASE_URL + "/expense/" + expenseId, {
        withCredentials: true,
      });
      fetchExpenseData();
    } catch (err) {
      console.error("error", err);
    }
  };
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {expensesData?.expenses?.map((expenseData) => {
        return (
          <>
            <div
              tabIndex={expenseData?._id}
              className="collapse collapse-arrow bg-base-100 border-base-300 border"
            >
              <div className="collapse-title font-semibold flex justify-between items-center">
                <div className="truncate  font-medium">{expenseData?.name}</div>

                <div className="flex gap-3 items-center">
                  <div className="text-green-600 font-medium">
                    ₹{expenseData?.amount}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 pointer-events-none"></div>
                    <button
                      className="p-1 cursor-pointer rounded-full hover:bg-red-50 transition-colors duration-200"
                      onClick={(e) => {
                        handleDeleteExpense(e, expenseData?._id);
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-red-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="collapse-content text-sm">
                <ExpenseSummary expenseData={expenseData} />
              </div>
            </div>
          </>
        );
      })}
    </ul>
  );
};

export default Expenses;
