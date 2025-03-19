import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Progress from "@/components/ui/progress"

export default function ProjectsPage() {
  // Sample projects data
  const projects = [
    {
      id: "gaza-relief",
      title: "نصرة غزة",
      description: "مشروع إغاثي يهدف إلى تقديم المساعدات الإنسانية لإخواننا في قطاع غزة",
      image: "/placeholder.svg?height=200&width=400",
      target: 300000,
      current: 293266,
      donors: 10389,
      percentComplete: 77,
    },
    {
      id: "water-wells",
      title: "حفر آبار المياه",
      description: "مشروع لحفر آبار المياه في المناطق التي تعاني من نقص المياه",
      image: "/placeholder.svg?height=200&width=400",
      target: 150000,
      current: 87500,
      donors: 4250,
      percentComplete: 58,
    },
    {
      id: "orphans",
      title: "كفالة الأيتام",
      description: "مشروع لكفالة الأيتام وتوفير احتياجاتهم الأساسية والتعليمية",
      image: "/placeholder.svg?height=200&width=400",
      target: 200000,
      current: 142000,
      donors: 6800,
      percentComplete: 71,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">
 
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 py-8">
        {/* Featured Video */}
        <section className="mb-12">
          <div className="relative aspect-video w-full mb-6 bg-gray-200 rounded">
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
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
            شاحنات حفاظ المحملة بمساعدات أهل الخير تدخل إلى قطاع غزة لدعم صمود أهلها
          </h2>
          <p className="text-muted-foreground mb-4 text-center">شاهد كيف تصل تبرعاتكم إلى المحتاجين في غزة</p>
        </section>

        {/* Projects Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">مشاريعنا الخيرية</h1>
          <p className="text-muted-foreground">ساهم في دعم مشاريعنا الخيرية وكن جزءاً من الخير</p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التكلفة: {project.target.toLocaleString()} د.ك</span>
                    <span className="font-bold text-orange-500">{project.percentComplete}%</span>
                  </div>
                  {/* Fixed Progress component usage */}
                  <Progress value={`${project.percentComplete}%`} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-muted-foreground">تم جمع</p>
                    <p className="font-bold">{project.current.toLocaleString()} د.ك</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-muted-foreground">عدد المتبرعين</p>
                    <p className="font-bold">{project.donors.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                  <Link href={`/projects`}>تبرع الآن</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

    </div>
  )
}

