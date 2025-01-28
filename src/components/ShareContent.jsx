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
      <div>
        {groupData?.participants?.map((participant) => (
          <div key={participant} className="flex flex-row gap-2">
            <label className="input validator">
              <span className="input-label">{participant}</span>
              <input
                type="number"
                required
                placeholder="Amount"
                pattern="[0-9]*"
                title="Only numbers"
                value={data?.[participant]}
                onChange={(e) =>
                  setData({ ...data, [participant]: e.target.value })
                }
              />
            </label>
          </div>
        ))}
        {errorCheck(activeTab, data, payload)}
      </div>
    );
  }

  if (tab === TABS_DATA.split_by_percentage) {
    return (
      <div>
        {groupData?.participants?.map((participant) => (
          <div key={participant} className="flex flex-row gap-2">
            <div>
              <label className="input validator">
                <span className="input-label">{participant}</span>
                <input
                  type="number"
                  required
                  placeholder="Percentage"
                  pattern="[0-9]*"
                  title="Only numbers"
                  value={data?.[participant]}
                  onChange={(e) =>
                    setData({ ...data, [participant]: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
        ))}
        {errorCheck(activeTab, data, payload)}
      </div>
    );
  }

  return (
    <div>
      {groupData?.participants?.map((participant) => (
        <div key={participant} className="flex flex-row gap-2">
          <label className="input validator">
            <span className="input-label">{participant}</span>
            <input
              type="number"
              required
              placeholder="Share"
              pattern="[0-9]*"
              title="Only numbers"
              value={data?.[participant]}
              onChange={(e) =>
                setData({ ...data, [participant]: e.target.value })
              }
            />
          </label>
        </div>
      ))}
      {errorCheck(activeTab, data, payload)}
    </div>
  );
};

export default ShareContent;
