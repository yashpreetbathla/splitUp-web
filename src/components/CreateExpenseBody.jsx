import React from "react";

const CreateExpenseBody = ({
  groupData,
  setOpenPaidBy,
  payload,
  setPayload,
}) => {
  const isAmountAndNameValid = (payload) => {
    console.log(payload, Number(payload?.amount));
    if (
      !payload?.name ||
      !payload?.amount ||
      payload?.name?.length < 3 ||
      payload?.name?.length > 30 ||
      Number(payload?.amount) <= 0
    ) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <label className="input validator">
        <span className="input-label">Expense Name</span>
        <input
          type="input"
          value={payload?.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
          placeholder="Expense Name"
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          minlength="3"
          maxlength="30"
          title="Only letters, numbers or dash"
        />
      </label>
      <p className="validator-hint">
        Must be 3 to 30 characters
        <br />
        containing only letters, numbers or dash
      </p>
      <label className="input validator">
        <span className="input-label">Amount ( ₹ )</span>
        <input
          type="number"
          required
          value={payload?.amount}
          onChange={(e) => setPayload({ ...payload, amount: e.target.value })}
          placeholder="Expense Amount ₹"
          pattern="[0-9]*"
          minlength="3"
          maxlength="30"
          title="Only letters, numbers or dash"
        />
      </label>

      <div className="flex flex-row items-center mt-4">
        <details className="dropdown dropdown-hover">
          <summary
            className="btn m-1 "
            disabled={isAmountAndNameValid(payload) ? "" : "disabled"}
          >
            Paid by
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            {groupData?.participants?.map((participant) => (
              <li
                key={participant}
                className={`${
                  payload?.paidBy === participant ? "bg-base-300" : ""
                }`}
                onClick={() => {
                  setPayload({ ...payload, paidBy: participant });
                }}
              >
                <a> {participant}</a>
              </li>
            ))}
          </ul>
        </details>

        <p>and split</p>

        <button
          className="btn"
          disabled={isAmountAndNameValid(payload) ? "" : "disabled"}
          onClick={() => setOpenPaidBy(true)}
        >
          Owed by
        </button>
      </div>
    </div>
  );
};

export default CreateExpenseBody;
