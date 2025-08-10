"use client";

import React from 'react';
import { Button, ButtonProps } from './button';
import { ButtonLoading } from './loading';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading = false, loadingText = "Loading...", children, className, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(loading && "cursor-not-allowed", className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <ButtonLoading text={loadingText} />
        ) : (
          children
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton }; 