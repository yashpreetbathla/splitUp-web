import React from "react";

const CreateExpenseBody = ({
  groupData,
  setOpenPaidBy,
  payload,
  setPayload,
}) => {
  const isAmountAndNameValid = (payload) => {
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
      <label className="input validator" style={{ width: "100%" }}>
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
      <label className="input validator" style={{ width: "100%" }}>
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

      <div className="flex flex-row items-center mt-4 w-full gap-1 justify-evenly">
        <div>
          <select
            className="select select-bordered"
            value={payload?.paidBy}
            onChange={(e) => setPayload({ ...payload, paidBy: e.target.value })}
            disabled={!isAmountAndNameValid(payload)}
          >
            <option disabled selected>
              Paid by
            </option>
            {groupData?.participants?.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p> and split</p>
        </div>

        <div>
          <button
            className="btn btn-primary"
            disabled={isAmountAndNameValid(payload) ? "" : "disabled"}
            onClick={() => setOpenPaidBy(true)}
          >
            Owed by
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenseBody;
