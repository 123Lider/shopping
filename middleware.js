import { NextResponse } from 'next/server';

export function middleware(request) {
    try {
        const ua = request.headers.get('user-agent') || '';
        
        // Strict Mobile Browser Matching
        const isMobile = /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(ua);

        // যদি Desktop/Laptop ইউজার হয়
        if (!isMobile) {
            // Vercel Edge Runtime-এর জন্য সঠিক Response Object
            return new Response('404 Not Found', { 
                status: 404,
                headers: { 'Content-Type': 'text/plain' }
            });
        }

        // Mobile ইউজার হলে রিকোয়েস্ট অ্যালাউ করবে
        return NextResponse.next();
    } catch (error) {
        // কোনো কারণে Error হলে যেন সাইট ব্রেক না করে
        return NextResponse.next();
    }
}

export const config = {
    // Next.js-এর নিজস্ব সিস্টেম ফাইল (css, js, images) যেন ব্লক না হয়
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
