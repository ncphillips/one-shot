import React from 'react';

type InputFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export const Field: React.FC<InputFieldProps> = ({ label, error, children }) => {
  return (
    <label>
      <span className="block font-bold text-gray-700">{label}</span>
      {children}
      {error && <span className="block text-red-500">{error}</span>}
    </label>
  );
};

