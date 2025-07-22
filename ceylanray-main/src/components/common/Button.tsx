import { ArrowRight } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "decorative";
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-white text-black px-6 py-3 flex items-center gap-2 rounded-full hover:bg-gray-100 transition-colors",
    secondary: "text-black px-6 py-3 rounded-full hover:bg-black/5 transition-colors",
    decorative: "bg-primary text-white pl-12 pr-6 py-3  rounded-full shadow-[2px_2px_8px_rgba(0,0,0,0.15)]  relative shadow-inner-custom overflow-hidden"
  };

  return (
    <button
      className={cn(variants[variant], className)}
      {...props}
    >
      {variant === "decorative" && (
        <div className="absolute left-2 top-1/2  -translate-y-1/2 w-8 h-8 rounded-full bg-white/[0.19] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
      )}
      <span className="p-small font-medium p relative z-10">{children}</span>
      {variant === "primary" && <ArrowRight size={20} />}
    </button>
  );
};
