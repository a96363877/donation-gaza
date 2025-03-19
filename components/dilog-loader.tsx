"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react'

interface DialogLoaderProps {
  isOpen: boolean
  message?: string
}

export function DialogLoader({ isOpen, message = "جاري المعالجة..." }: DialogLoaderProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md flex flex-col items-center justify-center p-6" 
      >
        <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
        <p className="text-center text-lg font-medium">{message}</p>
      </DialogContent>
    </Dialog>
  )
}
