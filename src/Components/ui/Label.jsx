import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils"; // Utility to combine class names

const Label = React.forwardRef((props, ref) => {
  const { className = "", ...rest } = props;

  const baseClass =
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(baseClass, className)}
      {...rest}
    />
  );
});

Label.displayName = "Label";

export { Label };
