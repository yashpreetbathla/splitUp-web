import React, { useEffect, useState } from "react";
import { TABS_DATA } from "./GroupDetail";

export const errorCheck = (tab, data, payload) => {
  if (tab === TABS_DATA.split_by_amount) {
    return Object.values(data || {}).reduce(
      (acc, curr) => acc + Number(curr),
      0
    ) === Number(payload?.amount) ? null : (
      <p className="text-red-500 text-sm">Must be {payload?.amount} overall</p>
    );
  }

  if (tab === TABS_DATA.split_by_percentage) {
    return Object.values(data || {}).reduce(
      (acc, curr) => acc + Number(curr),
      0
    ) === 100 ? null : (
      <p className="text-red-500 text-sm">Must be 100 overall</p>
    );
  }

  if (tab === TABS_DATA.split_by_share) {
    return Object.values(data || {}).some((value) => value > 0) ? null : (
      <p className="text-red-500 text-sm">Must be 1 share minimum out of all</p>
    );
  }

  return true;
};

const ShareContent = ({ tab, groupData, payload, activeTab, setPayload }) => {
  const data = payload?.data;
  const setData = (data) => {
    setPayload((prev) => ({ ...prev, data: data }));
  };

  useEffect(() => {
    setData({});
  }, [activeTab]);

  if (tab === TABS_DATA.split_by_amount) {
    return (
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Split Details</legend>
        {groupData?.participants?.map((participant) => (
          <div key={participant} className="form-control">
            <label className="label">
              <span className="label-text">{participant}</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              required
              placeholder="Amount"
              pattern="[0-9]*"
              title="Only numbers"
              value={data?.[participant]}
              onChange={(e) =>
                setData({ ...data, [participant]: e.target.value })
              }
            />
          </div>
        ))}
        {errorCheck(activeTab, data, payload)}
      </fieldset>
    );
  }

  if (tab === TABS_DATA.split_by_percentage) {
    return (
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Split Details</legend>
        {groupData?.participants?.map((participant) => (
          <div key={participant} className="form-control">
            <label className="label">
              <span className="label-text">{participant}</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              required
              placeholder="Percentage"
              pattern="[0-9]*"
              title="Only numbers"
              value={data?.[participant]}
              onChange={(e) =>
                setData({ ...data, [participant]: e.target.value })
              }
            />
          </div>
        ))}
        {errorCheck(activeTab, data, payload)}
      </fieldset>
    );
  }

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Split Details</legend>
      {groupData?.participants?.map((participant) => (
        <div key={participant} className="form-control">
          <label className="label">
            <span className="label-text">{participant}</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            required
            placeholder="Share"
            pattern="[0-9]*"
            title="Only numbers"
            value={data?.[participant]}
            onChange={(e) =>
              setData({ ...data, [participant]: e.target.value })
            }
          />
        </div>
      ))}
      {errorCheck(activeTab, data, payload)}
    </fieldset>
  );
};

export default ShareContent;
