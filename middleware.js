import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl;
    const ua = request.headers.get('user-agent') || '';
    
    // Strict Mobile Browser Regex Matching
    const isMobile = /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(ua);

    // ১. যদি Desktop/Laptop ইউজার হয়
    if (!isMobile) {
        // Server-side থেকে সরাসরি 404 Text Response পাঠানো হচ্ছে। 
        // HTML বা অন্য কোনো ফাইল ক্লায়েন্ট পর্যন্ত যাবে না।
        return new NextResponse('404 Not Found', { 
            status: 404,
            headers: { 'Content-Type': 'text/plain' }
        });
    }

    // ২. যদি Mobile ইউজার হয় এবং রুট (/) ডোমেইনে হিট করে
    if (url.pathname === '/') {
        // রিকোয়েস্টটিকে public/index.html এর দিকে Rewrite করে দেওয়া হলো
        return NextResponse.rewrite(new URL('/index.html', request.url));
    }

    // অন্যান্য রিকোয়েস্ট (যেমন: images, css, js যা public ফোল্ডারে আছে) অ্যালাউ করা হলো
    return NextResponse.next();
}

export const config = {
    // প্রজেক্টের সব রিকোয়েস্ট প্রথমে এই মিডলওয়্যার দিয়ে যাবে
    matcher: '/:path*',
};