import { NextRequest, NextResponse } from "next/server";
import get_base_url from "./lib/get_base_url";
import Token from "./lib/Token";


export default async function middleware({ nextUrl, headers }: NextRequest) {
    
    console.log('nextUrl: ', nextUrl.host);

    const host = headers.get("host")
    try {
        if (nextUrl.pathname == "/school") {
            await Token.user()
            return NextResponse.next();
        } else if (nextUrl.pathname.startsWith("/admin/") && !nextUrl.pathname.endsWith('login')) {
            try {
                await Token.admin()
                return NextResponse.next();
            } catch (error) {
                return NextResponse.redirect(get_base_url() + "/admin");
            }
        }
        return NextResponse.next();
    } catch (error) {
        console.log(error.message);
        return NextResponse.redirect(get_base_url() + "/login");
    }

}

export const config = {
    matcher: [
        "/school", "/admin/:path*",
        // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}
