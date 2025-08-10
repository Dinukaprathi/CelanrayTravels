import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-[#463f5e] focus:ring-2 focus:ring-[#463f5e] focus:outline-none transition ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input"; 