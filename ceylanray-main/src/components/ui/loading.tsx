"use client";

import { motion } from 'framer-motion';
import { Loader2, Circle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton' | 'progress' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
  showText?: boolean;
  progress?: number; // For progress variant
}

const Loading = ({ 
  variant = 'spinner', 
  size = 'md', 
  text = 'Loading...', 
  className,
  showText = true,
  progress = 0
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const renderSpinner = () => (
    <motion.div
      className={cn(
        "border-2 border-gray-200 border-t-blue-500 rounded-full",
        sizeClasses[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const renderDots = () => (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn("bg-blue-500 rounded-full", sizeClasses[size])}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={cn(
        "bg-blue-500 rounded-full",
        sizeClasses[size],
        className
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const renderSkeleton = () => (
    <div className={cn("space-y-3", className)}>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2 mt-4">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className={cn("w-full", className)}>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showText && (
        <p className={cn("text-center mt-2 text-gray-600", textSizes[size])}>
          {text} {progress}%
        </p>
      )}
    </div>
  );

  const renderSuccess = () => (
    <motion.div
      className={cn("flex items-center justify-center", className)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <CheckCircle2 className={cn("text-green-500", sizeClasses[size])} />
      {showText && (
        <span className={cn("ml-2 text-green-600", textSizes[size])}>
          {text}
        </span>
      )}
    </motion.div>
  );

  const renderLoading = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      case 'progress':
        return renderProgress();
      case 'success':
        return renderSuccess();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {renderLoading()}
      {showText && variant !== 'progress' && variant !== 'success' && (
        <motion.p
          className={cn("mt-2 text-gray-600", textSizes[size])}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Page Loading Component
export const PageLoading = ({ text = "Loading page..." }: { text?: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <Loading variant="spinner" size="xl" text={text} />
    </div>
  </div>
);

// Card Loading Component
export const CardLoading = ({ text = "Loading..." }: { text?: string }) => (
  <div className="p-6 border border-gray-200 rounded-lg bg-white">
    <Loading variant="skeleton" text={text} showText={false} />
  </div>
);

// Button Loading Component
export const ButtonLoading = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex items-center gap-2">
    <Loading variant="spinner" size="sm" text="" showText={false} />
    <span>{text}</span>
  </div>
);

// Image Loading Component
export const ImageLoading = () => (
  <div className="animate-pulse bg-gray-200 w-full h-full rounded-lg" />
);

// Video Loading Component
export const VideoLoading = () => (
  <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <Loading variant="pulse" size="lg" text="Loading video..." />
    </div>
  </div>
);

export default Loading; 