import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { base_host } from "./base_url";

const secret = new TextEncoder().encode("secret-key");

class Token {
    constructor() { }

    static async create(payload: object, { expireIn = "10m" } = {}) {
        return await new SignJWT(payload as any)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(expireIn)
            .sign(secret);
    }

    static async verify(token: string) {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    }

    static async login({ user, role = "user" }) {
        const token = await this.create({ user: user.toString(), role }, { expireIn: "1D" })
        const cookie = await cookies()
        cookie.set("token", token, { path: '/', maxAge: 60 * 60 * 24, httpOnly: true })
        return token
    }



    static async get(name = "token") {
        const cookie = await cookies()
        return cookie.get(name)?.value
    }

    static async user() {
        const cookie = await cookies()
        const token = await cookie.get("token")?.value
        const { user, role } = await this.verify(token)
        return { user, role }
    }

    static async admin_login({ user, role = "admin" }) {
        const token = await this.create({ user: user.toString(), role }, { expireIn: "1D" })
        const cookie = await cookies()
        await cookie.set("admin", token, { path: "/", maxAge: 60 * 60 * 24, httpOnly: true })
        return token
    }

    static async admin() {
        const token = await this.get("admin")
        const { user, role } = await this.verify(token)
        if (role != "admin") {
            throw Error("admin not login")
        }
        return { user, role }
    }

    static async logout() {
        const cookie = await cookies()
        cookie.delete("token")
    }


    static async admin_logout() {
        const cookie = await cookies()
        cookie.delete("admin")
    }

}




export default Token


