
import Profile from "@/db/Tables/Profile";
import School from "@/db/Tables/School";
import generate_subdomain from "@/lib/generate_subdomain";
import Token from "@/lib/Token";


export const GET = async (req: Request, { params }) => {
    try {
        const account = (await params).subdomain
        await Token.user()
        let data = await School.findOne({ user: account })
        let { subdomain } = await Profile.findById(account)

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
// export const POST = async (req: Request) => {
//     try {
//         const body = await req.json() as Props

//         let { user } = await Token.user()

//         let data = await School.findOne({ user })
//         if (data) {
//             throw Error("school alredy linked with profile")
//         }
//         const subdomain = generate_subdomain(body.school_name)
//         body.user = user
//         data = await new School(body).save()
//         return Response.json(data)
//     } catch (error) {
//         return Response.json({ message: error.message }, { status: 500 })
//     }
// }


export const PUT = async (req: Request, { params }) => {
    try {
        const user = (await params).subdomain
        await Token.user()
        let body = await req.json() as Props

        let data = await School.findOneAndUpdate({ user }, body)
        if (!data) {
            body.user = user
            data = await new School(body).save()
        }
        return Response.json(data)
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}