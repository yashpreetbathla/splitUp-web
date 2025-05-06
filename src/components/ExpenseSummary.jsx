import React from "react";

const ExpenseSummary = ({ expenseData }) => {
  return (
    <div>
      <div>
        {expenseData?.owedBy?.map((expense) => {
          return (
            <div key={expense?._id} className="flex flex-row gap-1">
              <div className="text-blue-400"> {expense?.email}</div>
              owes
              <div className="text-red-500">{expense?.amount}₹</div>
            </div>
          );
        })}
      </div>
      <div>
        {expenseData?.paidBy?.map((expense) => {
          return (
            <div key={expense?._id} className="flex flex-row gap-1">
              <div className="text-blue-400">{expense?.email}</div>
              paid
              <div className="text-green-500">{expense?.amount}₹</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseSummary;
