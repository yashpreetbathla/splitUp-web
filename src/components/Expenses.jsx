import React from "react";
import ExpenseSummary from "./ExpenseSummary";

const Expenses = ({ expensesData }) => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {expensesData?.expenses?.map((expenseData) => {
        return (
          <div key={expenseData?._id} className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              <div className="flex justify-between">
                <div>{expenseData?.name}</div>
                <div>{expenseData?.amount} ₹</div>
              </div>
            </div>
            <div className="collapse-content">
              <ExpenseSummary expenseData={expenseData} />
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default Expenses;
