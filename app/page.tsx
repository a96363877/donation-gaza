"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function DonationPage() {
  const [customAmount, setCustomAmount] = useState("")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const donationStats = {
    donors: 10389,
    current: 293266,
    target: 300000,
    percentComplete: 98,
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setSelectedAmount(null)
  }

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

      <main className="flex-1 max-w-3xl mx-auto w-full p-4">
        {/* Video Section */}
        <div className="relative aspect-video w-full mb-6 bg-gray-200 rounded">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-play"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Donation Title */}
        <h1 className="text-2xl font-bold mb-4">تبرعة غزة</h1>

        {/* Donation Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-gray-500">عدد المتبرعين</p>
            <p className="font-bold text-lg">{donationStats.donors}</p>
          </div>
          <div>
            <p className="text-gray-500">المجموع</p>
            <p className="font-bold text-lg">{donationStats.current.toLocaleString()} د.ك</p>
          </div>
          <div>
            <p className="text-gray-500">التكلفة</p>
            <p className="font-bold text-lg">{donationStats.target.toLocaleString()} د.ك</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={donationStats.percentComplete} className="h-4 bg-gray-200" />
          <div className="text-left mt-1">
            <span className="text-orange-500 font-bold">{donationStats.percentComplete}%</span>
          </div>
        </div>

        {/* Donation Amount Options */}
        <div className="mb-6">
          <p className="mb-2">اختر قيمة التبرع</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              variant={selectedAmount === 30 ? "default" : "outline"}
              onClick={() => handleAmountSelect(30)}
              className="bg-white border text-black hover:bg-gray-100 hover:text-black"
            >
              د.ك 30
            </Button>
            <Button
              variant={selectedAmount === 40 ? "default" : "outline"}
              onClick={() => handleAmountSelect(40)}
              className="bg-white border text-black hover:bg-gray-100 hover:text-black"
            >
              د.ك 40
            </Button>
            <Button
              variant={selectedAmount === 50 ? "default" : "outline"}
              onClick={() => handleAmountSelect(50)}
              className="bg-white border text-black hover:bg-gray-100 hover:text-black"
            >
              د.ك 50
            </Button>
            <Button
              variant={selectedAmount === 60 ? "default" : "outline"}
              onClick={() => handleAmountSelect(60)}
              className="bg-white border text-black hover:bg-gray-100 hover:text-black"
            >
              د.ك 60
            </Button>
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <p className="mb-2">- أو -</p>
            <div className="flex">
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-r-none">د.ك</Button>
              <Input
                type="number"
                placeholder="أدخل مبلغ آخر"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="rounded-l-none text-right"
              />
            </div>
          </div>

          {/* Donate Button */}
          <Button className="w-full bg-[#0a3b4d] hover:bg-[#0a3b4d]/90 text-white py-3 mb-4">تبرع الآن</Button>

          {/* Additional Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500">
              مشاركة المشروع
            </Button>
            <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500">
              إضافة للسلة
            </Button>
          </div>
        </div>

        {/* Project Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center border-b pb-2">وصف المشروع</h2>
          <p className="leading-relaxed">
            مشروع إغاثي يهدف إلى تقديم المساعدات الإنسانية لإخواننا في قطاع غزة، من أجل التخفيف من وطأة العدوان الصهيوني
            عليهم، وذلك من خلال توفير المواد الغذائية والطبية والملابس والمستلزمات المنزلية الأساسية.
          </p>
        </div>

        {/* Social Media */}
        <div className="flex justify-center gap-4 mb-6">
          <Link href="#" className="bg-[#0a3b4d] p-2 rounded-md text-white">
            <Instagram size={20} />
          </Link>
          <Link href="#" className="bg-[#0a3b4d] p-2 rounded-md text-white">
            <Youtube size={20} />
          </Link>
          <Link href="#" className="bg-[#0a3b4d] p-2 rounded-md text-white">
            <Twitter size={20} />
          </Link>
          <Link href="#" className="bg-[#0a3b4d] p-2 rounded-md text-white">
            <Facebook size={20} />
          </Link>
        </div>

        {/* Newsletter */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-2">نشرتنا الإلكترونية</h3>
          <div className="flex">
            <Input placeholder="أكتب بريدك الإلكتروني هنا" className="rounded-l-none" />
            <Button className="bg-orange-500 hover:bg-orange-600 rounded-r-none">اشترك</Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a3b4d] text-white p-6">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-bold mb-4">روابط سريعة</h3>
          <ul className="space-y-2 mb-6">
            <li>
              <Link href="#" className="hover:underline">
                المساجد
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                الآبار
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                كسب الحلال
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                الصدقة الجارية
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                مشاريع قرآنية
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                المشاريع الموسمية
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                وقف
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                كفالة أيتام
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                دعم غزة
              </Link>
            </li>
          </ul>

          <div className="flex justify-center mb-4">
            <Image
              src="/placeholder.svg?height=60&width=60"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>

          <p className="text-center text-sm">جميع الحقوق محفوظة للجمعية الخيرية الإسلامية © 2025</p>
        </div>
      </footer>
    </div>
  )
}

