import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = '', ...props }) => {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800 ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge; 