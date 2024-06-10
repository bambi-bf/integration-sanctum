import React, { useState } from 'react';

interface TabProps {
  labels: string[];
  children: React.ReactNode[];
}

const Tab: React.FC<TabProps> = ({ labels, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className='flex mt-5 border-b'>
      <div className="tab-content w-1/2 p-3">{children[activeTab]}</div>
      <div className="tab-labels w-1/2 flex gap-1">
        {labels.map((label, index) => (
          <button
            key={index}
            className={`tab-label ${activeTab === index ? 'active' : ''} p-[10px] cursor-pointer border-none bg-none outline-none text-[16px] font-bold rounded-md h-[100px]`}
            style={{ width: `${100 / labels.length}%`}}
            onClick={() => handleClick(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <style jsx>{`
        .tab-label.active {
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
};

export default Tab;