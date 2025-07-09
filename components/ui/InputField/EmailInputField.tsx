'use client';

import { ChangeEvent } from 'react';
type InputFieldProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
   width?:number
   height?:number
   error?:string
}
const EmailInputField = ({
  name,
  value,
  onChange,
  placeholder,
  width = 400,
  height = 45,
  error,
}: InputFieldProps) => {
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className={`w-full max-w-[${width}px]`}>
      <input
        type="email"
        name={name}
        value={value}
        onChange={handleEmailChange}
        placeholder={placeholder}
        className={`w-full h-[${height}px] border rounded-lg text-sm font-normal pl-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default EmailInputField;