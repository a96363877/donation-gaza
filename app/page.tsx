import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  // Featured projects
  const featuredProjects = [
    {
      id: "gaza-relief",
      title: "نصرة غزة",
      description: "مشروع إغاثي يهدف إلى تقديم المساعدات الإنسانية لإخواننا في قطاع غزة",
      image: "/placeholder.svg?height=200&width=400",
      target: 300000,
      current: 293266,
      percentComplete: 77,
    },
    {
      id: "water-wells",
      title: "حفر آبار المياه",
      description: "مشروع لحفر آبار المياه في المناطق التي تعاني من نقص المياه",
      image: "/placeholder.svg?height=200&width=400",
      percentComplete: 58,
    },
    {
      id: "orphans",
      title: "كفالة الأيتام",
      description: "مشروع لكفالة الأيتام وتوفير احتياجاتهم الأساسية والتعليمية",
      image: "/placeholder.svg?height=200&width=400",
      percentComplete: 71,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
   
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gray-900">
          <div className="relative  pb-6">
            <img
              src="/t.jpg"
              alt="صورة غلاف"
              className="object-cover opacity-60 "
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">ساهم في دعم المحتاجين</h1>
              <p className="text-lg md:text-xl max-w-2xl mb-8">
                تبرعك اليوم يمكن أن يغير حياة الكثيرين. انضم إلينا في مساعدة المحتاجين وإحداث فرق في حياتهم.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/donate">تبرع الآن</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  <Link href="/projects">استعرض المشاريع</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Video */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">شاهد تأثير تبرعاتكم</h2>
            <div className="max-w-3xl mx-auto">
              <div className="relative aspect-video w-full mb-6 bg-gray-200 rounded-lg overflow-hidden">
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
              <p className="text-center text-gray-600">شاحنات المساعدات تدخل إلى قطاع غزة لدعم صمود أهلها</p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">مشاريعنا المميزة</h2>
            <p className="text-center text-gray-600 mb-12">تعرف على أهم المشاريع التي نعمل عليها حالياً</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-orange-500 h-2.5 rounded-full"
                        style={{ width: `${project.percentComplete}%` }}
                      ></div>
                    </div>
                    <p className="text-left text-sm text-orange-500 font-bold">{project.percentComplete}% مكتمل</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                      <Link href={`/donate`}>تبرع الآن</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">عرض جميع المشاريع</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-[#0a3b4d] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">تأثير تبرعاتكم</h2>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">+10,000</div>
                <p>عائلة مستفيدة</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">+50</div>
                <p>مشروع خيري</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">+20</div>
                <p>دولة حول العالم</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">انضم إلينا اليوم</h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-600">
              كل تبرع، مهما كان صغيراً، يمكن أن يحدث فرقاً كبيراً في حياة المحتاجين. ساهم معنا في نشر الخير.
            </p>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/donation-page">تبرع الآن</Link>
            </Button>
          </div>
        </section>
      </main>

  
    </div>
  )
}

