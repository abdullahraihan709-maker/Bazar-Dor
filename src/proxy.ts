import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
// ডায়নামিক প্রোডাক্ট রাউটসহ কভার করার জন্য :path* ব্যবহার করা হয়েছে
    matcher: ["/product/:path*", "/profile"], // Specify the routes the middleware applies to
};