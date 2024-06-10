import React, { useState } from 'react';

interface TabProps {
  labels: string[];
  children: React.ReactNode[];
}

const FeeTab: React.FC<TabProps> = ({ labels, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className='flex flex-col w-[520px]'>
      <div className="tab-labels flex gap-1 border-b">
        {labels.map((label, index) => (
          <button
            key={index}
            className={`tab-label ${activeTab === index ? 'active' : ''} p-[10px] cursor-pointer border-none bg-none outline-none text-[16px] font-bold h-[100px]`}
            style={{ width: `${100 / labels.length}%`}}
            onClick={() => handleClick(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-content p-3">{children[activeTab]}</div>
      <style jsx>{`
        .tab-label.active {
          border-bottom: 2px solid black;
        }
      `}</style>
    </div>
  );
};

export default FeeTab;