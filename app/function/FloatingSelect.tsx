'use client';
import React from 'react';

interface FloatingSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
}

export const FloatingSelect: React.FC<FloatingSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  className = '',
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`floating-select relative ${className}`}>
      <select
        id={id}
        value={value}
        onChange={handleSelectChange}
        className="w-full px-15 pt-6 pb-2 border border-gray-300 rounded-lg text-base bg-white outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 peer appearance-none cursor-pointer"
        required={required}
      >
        <option value="" disabled hidden></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none origin-left bg-white px-1 -ml-1 ${
          value
            ? 'top-2 text-xs text-blue-500'
            : 'top-4 text-base text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500'
        }`}
      >
        {label}
      </label>
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};
