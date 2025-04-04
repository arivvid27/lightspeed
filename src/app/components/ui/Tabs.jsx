import React, { useState } from 'react';

export function Tabs({ 
  tabs = [], 
  activeTab = 0, 
  onChange = () => {}, 
  variant = 'default',
  className = '', 
  ...props 
}) {
  const [activeIndex, setActiveIndex] = useState(activeTab);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    onChange(index);
  };

  const variants = {
    default: {
      container: 'border-b border-border',
      tab: 'px-4 py-2 text-sm font-medium',
      active: 'text-primary border-b-2 border-primary',
      inactive: 'text-muted-foreground hover:text-foreground hover:bg-muted',
    },
    pills: {
      container: 'space-x-1',
      tab: 'px-3 py-1.5 text-sm font-medium rounded-md',
      active: 'bg-primary text-white',
      inactive: 'text-foreground hover:bg-muted',
    },
    boxed: {
      container: 'border-b border-border',
      tab: 'px-4 py-2 text-sm font-medium border-t border-l border-r rounded-t-md -mb-px',
      active: 'bg-card border-border',
      inactive: 'bg-muted text-muted-foreground hover:text-foreground border-transparent',
    },
  };

  const styles = variants[variant] || variants.default;

  return (
    <div className={className} {...props}>
      <div className={`flex ${styles.container}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${
              index === activeIndex ? styles.active : styles.inactive
            }`}
            onClick={() => handleTabClick(index)}
            aria-selected={index === activeIndex}
            role="tab"
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
}

export function Tab({ label, icon = null, content }) {
  return { label, icon, content };
}