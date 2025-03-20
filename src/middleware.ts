import { NextRequest, NextResponse } from "next/server";
import get_base_url from "./lib/get_base_url";
import Token from "./lib/Token";
import { base_host } from "./lib/base_url";
import data from "../profiles.json"


export default async function middleware({ nextUrl, headers, url, ...req }: NextRequest) {


    console.log('nextUrl: ', nextUrl.host);

    const host = headers.get("host")
    const subdomain = host.replace(`.${base_host}`, "")
    const account = data[subdomain]
    console.log('account: ', account);

    try {

        if (account) {
            return NextResponse.rewrite(new URL(`/${account}${nextUrl.pathname}`, url));
        }

        if (nextUrl.pathname.startsWith("/admin/") && !nextUrl.pathname.endsWith('login')) {
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
    matcher: '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
}
