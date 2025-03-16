import Profile from "@/db/Tables/Profile"
import Token from "@/lib/Token";

type Props = {
    email: string, password: string, name: string, phone: string;
}
export const POST = async (req: Request) => {
    try {
        const { email, password, ...others } = await req.json() as Props

        let data = await Profile.findOne({ email })
        if (data) {
            return Response.json({ mesaage: "profile already exits" }, { status: 400 })
        }
        if (password.length < 4) {
            return Response.json({ mesaage: "password must be at least 4" }, { status: 400 })
        }
        let count = await Profile.countDocuments()
        let subdomain = "school" + count.toString()
        data = await new Profile({ email, password, subdomain, ...others }).save()
        const token = await Token.login({ user: data._id })
        return Response.json({ token, subdomain })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}