import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'الرئيسية',
  description: 'جمع التبرعات', viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body className={inter.className}>
      <header className="bg-white  p-4 flex justify-between items-center" dir='rtl'>
        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
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
              src="/logo-wide.png"
              alt="Logo"
              width={70}
              height={70}
              className="rounded-full"
            />
            <span className="mr-2 hidden md:inline">الجمعية الخيرية الإسلامية</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-black">
          <Link href="#" className="text-sm hover:underline ">
             دعم غزة
          </Link>
          <span>|</span>
          <Link href="#" className="text-sm hover:underline">
            En
          </Link>
        </div>
      </header>
      {children}

      {/* Footer */}
      <footer className="bg-[#0a3b4d] text-white p-6" dir='rtl'>
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
                       src="/next.svg"

              alt="Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          <p className="text-center text-sm">جميع الحقوق محفوظة للجمعية الخيرية الإسلامية © 2025</p>
        </div>
      </footer>
      </body>
    </html>
  );
}
