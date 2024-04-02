import React, { useRef, useState } from 'react';

import './style.css';

const Tabs = ({ tabs, activeTab, setActiveTab, registerRef }) => {
  const fontCardRefs = useRef([]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleRefCreation = (ref, index) => {
    fontCardRefs.current[index] = ref;
    registerRef(ref);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsButtonPressed(true);
  };

  const handleButtonBlur = () => {
    setIsButtonPressed(false);
  };

  return (
    <div className="content-tabs">
      <div className="tabs"> Please select one font
        {tabs && tabs?.map((tab, index) => (
          <button
            aria-label={`Menu button: ${tab.label}`}
            className={`tab ${tab === activeTab ? 'selected' : ''}`}
            key={tab.id}
            onClick={() => !isButtonPressed && handleTabClick(tab)}
            onBlur={handleButtonBlur}
            ref={(ref) => handleRefCreation(ref, index + 1)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;