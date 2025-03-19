"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function CheckoutPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isGccOpen, setIsGccOpen] = useState(false)

  const donationAmount = 50
  const projectName = "تبرعة غزة"

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-[#0a3b4d] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="mr-2 hidden md:inline">الجمعية الخيرية الإسلامية</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="#" className="text-sm hover:underline">
            تسجيل دخول
          </Link>
          <span>|</span>
          <Link href="#" className="text-sm hover:underline">
            En
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full p-4">
        {/* Phone Number Section */}
        <div className="bg-gray-100 p-6 rounded-md mb-8">
          <p className="mb-4 font-medium">باختيار فاعل خير، لن نستطيع أن نرسل لك رسائل نصية أو أي تقارير حول المشروع</p>
          <p className="text-gray-500 mb-2">رقم الهاتف (اختياري)</p>
          <Input
            type="tel"
            placeholder="من فضلك أدخل رقم الهاتف"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-white"
          />
        </div>

        {/* Donation Summary */}
        <div className="mb-8">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div className="font-bold">الاسم/المشروع</div>
            <div className="font-bold">المبلغ</div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="bg-gray-200 px-3 py-1 rounded-md">{projectName}</div>
            <div className="flex items-center">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>{donationAmount} د.ك</span>
            </div>
          </div>

          <div className="text-center text-xl font-bold text-orange-500 mb-6">مبلغ التبرع: {donationAmount} د.ك</div>

          {/* Payment Methods */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            <div className="border rounded-md p-2 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=30&width=50"
                alt="Apple Pay"
                width={50}
                height={30}
                className="object-contain"
              />
            </div>
            <div className="border rounded-md p-2 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=30&width=50"
                alt="Google Pay"
                width={50}
                height={30}
                className="object-contain"
              />
            </div>
            <div className="border rounded-md p-2 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=30&width=50"
                alt="K-NET"
                width={50}
                height={30}
                className="object-contain"
              />
            </div>
            <div className="border rounded-md p-2 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=30&width=50"
                alt="VISA"
                width={50}
                height={30}
                className="object-contain"
              />
            </div>
          </div>

          {/* GCC Countries Option */}
          <Collapsible open={isGccOpen} onOpenChange={setIsGccOpen} className="border-t border-b py-3 mb-6">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <span>التبرع من إحدى دول مجلس التعاون</span>
              <ChevronDown className={`transition-transform duration-200 ${isGccOpen ? "transform rotate-180" : ""}`} />
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

          {/* Donate Button */}
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg">تبرع الآن</Button>
        </div>
      </main>
    </div>
  )
}

