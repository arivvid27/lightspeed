import React from 'react';

export function Toggle({ 
  checked = false, 
  onChange, 
  disabled = false,
  size = 'md',
  label = '',
  className = '',
  ...props 
}) {
  const sizes = {
    sm: {
      toggle: 'w-8 h-4',
      circle: 'h-3 w-3',
      translateX: 'translate-x-4',
    },
    md: {
      toggle: 'w-11 h-6',
      circle: 'h-5 w-5',
      translateX: 'translate-x-5',
    },
    lg: {
      toggle: 'w-14 h-7',
      circle: 'h-6 w-6',
      translateX: 'translate-x-7',
    },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <label className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} {...props}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div
          className={`${currentSize.toggle} bg-muted rounded-full shadow-inner ${
            checked ? 'bg-primary' : ''
          }`}
        />
        <div
          className={`absolute left-0.5 top-0.5 bg-white rounded-full shadow transform transition-transform ${
            checked ? currentSize.translateX : 'translate-x-0'
          } ${currentSize.circle}`}
        />
      </div>
      {label && <span className="ml-3 text-sm font-medium">{label}</span>}
    </label>
  );
}