import React, { useState } from "react";

const MultiInput = ({
  onUsersChange,
  placeholder = "Add username and press Enter",
  pattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
  minLength = "5",
  maxLength = "254",
  title = "Only letters, numbers or dash",
}) => {
  const [users, setUsers] = useState([]);
  const [currentInput, setCurrentInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentInput.trim()) {
      e.preventDefault();
      const newUser = currentInput.trim();

      // Validate the input against the pattern
      const patternRegex = new RegExp(`^${pattern}$`);
      if (
        patternRegex.test(newUser) &&
        newUser.length >= minLength &&
        newUser.length <= maxLength &&
        !users.includes(newUser)
      ) {
        const newUsers = [...users, newUser];
        setUsers(newUsers);
        setCurrentInput("");
        onUsersChange?.(newUsers); // Notify parent component of changes
      } else {
        // You might want to show an error message here
        alert("Invalid username or already added");
      }
    }
  };

  const removeUser = (indexToRemove) => {
    const newUsers = users.filter((_, index) => index !== indexToRemove);
    setUsers(newUsers);
    onUsersChange?.(newUsers); // Notify parent component of changes
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="input validator">
        <span className="input-label">Email ID's</span>
        <input
          type="input"
          placeholder={placeholder}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          title={title}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-black"
          >
            <span>{user}</span>
            <button
              onClick={() => removeUser(index)}
              className="text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiInput;
