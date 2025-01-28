import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div role="tablist" className="tabs tabs-lifted">
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name="tabs"
            role="tab"
            className="tab"
            aria-label={tab.label}
            checked={activeTab === tab.label}
            onChange={() => setActiveTab(tab.label)}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            {tab.content}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Tabs;
