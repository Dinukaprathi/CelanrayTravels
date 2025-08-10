import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children, ...props }) => {
  // Remove default bg-white if a custom bg- class is present
  const hasCustomBg = /bg-\w+/.test(className);
  const bgClass = hasCustomBg ? "" : "bg-white";
  return (
    <div className={`rounded-xl ${bgClass} shadow p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}; 