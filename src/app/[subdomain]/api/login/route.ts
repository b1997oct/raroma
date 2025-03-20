import Profile from "@/db/Tables/Profile"
import Token from "@/lib/Token"
import bcrypt from "bcrypt";


export const POST = async (req: Request, { params }) => {
    console.log('req: ', req);
    try {
        const { email, password } = await req.json()

        const { subdomain } = await params
        let data = await Profile.findOne({ _id: subdomain, email })
        console.log('data: ', data);
        if (!data) {
            return Response.json({ message: "user not found" }, { status: 404 })
        }
        let is_match = await bcrypt.compare(password, data.password)
        if (!is_match) {
            return Response.json({ message: "enter a valid password" }, { status: 400 })
        }
        const user = data._id.toString()
        const token = await Token.create({ user, role: "user" })
        await Token.login({ user })
        return Response.json({ token, subdomain: data?.subdomain })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}