import React from "react";

const ExpenseSummary = ({ expenseData }) => {
  return (
    <div>
      <div>
        {expenseData?.owedBy?.map((expense) => {
          return (
            <div key={expense?._id} className="flex flex-row gap-1">
              <div>{expense?.email}</div>
              owes
              <div>{expense?.amount}₹</div>
            </div>
          );
        })}
      </div>
      <div>
        {expenseData?.paidBy?.map((expense) => {
          return (
            <div key={expense?._id} className="flex flex-row gap-1">
              <div>{expense?.email}</div>
              paid
              <div>{expense?.amount}₹</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseSummary;
