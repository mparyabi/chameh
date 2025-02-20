"use client"
import Navbar from "@/components/modules/Navbar/Navbar";
import "./globals.css";
import Footer from "@/components/modules/Footer/Footer";
import { CartProvider } from '@/context/CartContext';
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // دریافت مسیر فعلی

  // بررسی مسیرهایی که لایوت اصلی نباید اجرا شود
  if (pathname.startsWith("/p-admin")) {
    return <>
    <html lang="fa">
      <body>
        <main>{children}</main>
      </body>
    </html>
    </>; // بدون لایوت اصلی
  }
  return (
    <html lang="fa">
      <body>
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </CartProvider>
      </body>
    </html>
 
  );
}
