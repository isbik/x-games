import * as React from "react";

import { cn } from "@/lib/utils";

const CardGame = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "sm:rounded-lg border bg-white text-black shadow-sm p-4 flex flex-col",
      className
    )}
    {...props}
    ref={ref}
  />
));
CardGame.displayName = "Card";

export { CardGame };
