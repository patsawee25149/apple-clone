"use client";
import React from 'react';

interface FloatingInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  autoComplete?: string;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  className = '',
  autoComplete
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Auto-format phone numbers
    if (type === 'tel') {
      inputValue = inputValue.replace(/\D/g, '');
      if (inputValue.length >= 3) {
        inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
    }
    
    onChange(inputValue);
  };

  return (
    <div className={`floating-input relative ${className}`}>
      <input 
        type={type}
        id={id}
        value={value}
        onChange={handleInputChange}
        className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg text-base bg-transparent outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 peer"
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
      />
      <label 
        htmlFor={id}
        className="absolute left-4 top-4 text-gray-500 text-base transition-all duration-300 pointer-events-none origin-left bg-white px-1 -ml-1 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
};
