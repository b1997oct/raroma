
import Profile from "@/db/Tables/Profile";
import School from "@/db/Tables/School";
import generate_subdomain from "@/lib/generate_subdomain";
import Token from "@/lib/Token";


export const POST = async (req: Request) => {
    try {
        await Token.admin()
        const { id } = await req.json()
        let data = await School.findById(id)
        let { subdomain } = await Profile.findById(data.user)

        if (data) {
            data = JSON.stringify(data)
            data = JSON.parse(data)
        } else {
            data = {}
        }
        return Response.json({ ...data, subdomain })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}


type Props = any
export const PUT = async (req: Request) => {
    try {

        await Token.admin()

        let { subdomain, id, user, ...body } = await req.json() as Props

        if (subdomain) {
            subdomain = generate_subdomain(subdomain)
            const is_taken = await Profile.findOne({ user: { $ne: user }, subdomain })
            if (is_taken) {
                throw Error("subdomain is taken")
            }
            await Profile.findByIdAndUpdate(user, { subdomain })
        }
        let data = await School.findByIdAndUpdate(id, body)

        return Response.json(data)
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}