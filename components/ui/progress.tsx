"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, max = 100, ...props }, ref) => {
  // Ensure value is a number and has a default
  const safeValue = typeof value === "number" ? value : 0

  // Ensure max is a number greater than 0
  const safeMax = typeof max === "number" && max > 0 ? max : 100

  // Calculate percentage safely
  const percentage = safeMax <= 0 ? 0 : (safeValue / safeMax) * 100

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
      value={safeValue}
      max={safeMax}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-orange-500 transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

