import Profile from "@/db/Tables/Profile"
import School from "@/db/Tables/School"
import Token from "@/lib/Token"
import { cookies } from "next/headers"

export const POST = async (req: Request) => {
    try {
        const { email, password } = await req.json()

        let data = await Profile.findOne({ email })
        if (!data) {
            return Response.json({ message: "user not found" }, { status: 404 })
        }
        if (data.password != password) {
            return Response.json({ message: "enter a valid password" }, { status: 400 })
        }
        const user = data._id
        const token = await Token.create({ user, role: "user" })
        await Token.login({ user })
        return Response.json({ token, subdomain: data?.subdomain })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}