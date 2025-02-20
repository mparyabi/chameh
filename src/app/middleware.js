// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.pathname;

  // چک کردن اگر مسیر مربوط به p-user یا p-admin باشد
  if (url.startsWith('/p-user') || url.startsWith('/p-admin')) {
    // جلوگیری از اعمال لایوت اصلی
    return NextResponse.rewrite(new URL('/hello', req.url)); // مسیر لایوت خاص
  }

  // در غیر این صورت لایوت اصلی اعمال می‌شود
  return NextResponse.next();
}
