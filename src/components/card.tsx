import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} ref={ref} />
  ),
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} ref={ref} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<React.ElementRef<"p">, React.ComponentPropsWithoutRef<"p">>(
  ({ className, ...props }, ref) => (
    <p className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} ref={ref} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<React.ElementRef<"p">, React.ComponentPropsWithoutRef<"p">>(
  ({ className, ...props }, ref) => (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} ref={ref} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className={cn("p-4 pt-0", className)} {...props} ref={ref} />,
)
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent, CardDescription }

