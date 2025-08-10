import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#463f5e] disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-[#463f5e] text-white hover:bg-[#463f5ecc] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 