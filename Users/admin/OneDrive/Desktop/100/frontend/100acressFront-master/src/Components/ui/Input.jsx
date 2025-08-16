import React from "react";
import { cn } from "../../lib/utils"; // Utility function to join classes

const Input = React.forwardRef((props, ref) => {
  const { className = "", type = "text", ...rest } = props;

  const baseClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

  return (
    <input
      ref={ref}
      type={type}
      className={cn(baseClass, className)}
      {...rest}
    />
  );
});

Input.displayName = "Input";

export { Input };
