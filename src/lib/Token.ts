import { jwtVerify, SignJWT } from "jose";
import { createSecretKey } from "crypto";
import { cookies } from "next/headers";

const secret = createSecretKey(Buffer.from("secret-key", "utf-8"));

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

    static async get() {
        const cookie = await cookies()
        return cookie.get("token").value
    }

    static async user() {
        const cookie = await cookies()
        const token = await cookie.get("token")?.value
        const { user, role } = await this.verify(token)
        return { user, role }
    }

    static async logout() {
        const cookie = await cookies()
        cookie.delete("token")
    }

}




export default Token


