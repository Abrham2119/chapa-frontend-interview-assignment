"use client";

import { Eye, EyeOff, Image, Upload, X } from "lucide-react";
import { forwardRef, useState } from "react";
import { InputFieldProps } from "./InputField.types";


const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      label,
      type = "text",
      value,
      onChange,
      icon,
      placeholder,
      name,
      min,
      width = 400,
      height = 45,
      error,
      ...rest
    } = props;
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const renderInput = () => {
      switch (type) {     

        default:
          return (
            <input
              ref={ref}
              type={inputType}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              style={{ height }}
              {...rest}
              className={`w-full   border-[1px] rounded-[8px] pl-10 text-sm outline-none placeholder-[#A8A8A8] ${isPassword ? "pr-10" : "pr-3"
                } ${error
                  ? "border-red-500 focus:ring-red-400"
                  : "border-[#DADADA] focus:ring-primary"
                }`}
            />
          );
      }
    };

    return (
      <div className={`flex flex-col gap-1 w-full`} style={{ maxWidth: width }}>
        {label && (
          <label className="text-[14px] font-medium text-[#6C6C6C] dark:text-white">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && type !== "file" && (
            <div className="z-10 absolute inset-y-0 left-0 flex items-center pl-3 text-[#A8A8A8]">
              {icon}
            </div>
          )}

          {renderInput()}

          {isPassword && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-[20px] h-[20px] text-[#A8A8A8]" />
              ) : (
                <Eye className="w-[20px] h-[20px] text-[#A8A8A8]" />
              )}
            </button>
          )}
        </div>

        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
    );

  }
);

InputField.displayName = "InputField";

export default InputField;
