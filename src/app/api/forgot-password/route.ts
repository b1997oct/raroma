import Profile from "@/db/Tables/Profile"
import Token from "@/lib/Token"
import bcrypt from "bcrypt"

export const POST = async (req: Request) => {
    try {
        const { email } = await req.json()

        let data = await Profile.findOne({ email })
        if (!data) {
            return Response.json({ message: "user not found" }, { status: 404 })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        const user = data._id
        const token = await Token.create({ user: user.toString(), role: "user", otp })
        return Response.json({ token, otp })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}


export const PUT = async (req: Request) => {
    try {
        const { token, otp, new_password } = await req.json()
        const { user, otp: isOtp } = await Token.verify(token)
        if (otp != isOtp) {
            return Response.json({ message: "invalid otp" }, { status: 404 })
        }
        const password = await bcrypt.hash(new_password, 10)
        let data = await Profile.findByIdAndUpdate(user, { password })
        if (!data) {
            return Response.json({ message: "user not found" }, { status: 404 })
        }
        return Response.json({ message: "Password changed successfully" })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}