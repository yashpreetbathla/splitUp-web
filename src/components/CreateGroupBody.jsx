import React from "react";
import MultiInput from "./MultiInput";

const CreateGroupBody = ({
  participants,
  groupName,
  setParticipants,
  setGroupName,
}) => {
  const handleUsersChange = (newUsers) => {
    setParticipants(newUsers);
  };

  return (
    <div>
      <label className="input validator">
        <span className="input-label">Group Name</span>
        <input
          type="input"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
          placeholder="Username"
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

      <MultiInput
        onUsersChange={handleUsersChange}
        placeholder="Enter username and press Enter"
      />
    </div>
  );
};

export default CreateGroupBody;
