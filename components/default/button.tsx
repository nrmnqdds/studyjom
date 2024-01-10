import { cn } from "@/lib/common/cn";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(
          "text-black border-black border-2 p-2.5 bg-purple-300 hover:bg-purple-400 shadow-default active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all active:bg-purple-500 rounded-md",
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
