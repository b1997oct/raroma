import get_base_url from "@/lib/get_base_url"
import Token from "@/lib/Token"

export const POST = async (req: Request) => {
    try {
        const formData = await req.formData() as any
        const email = formData.get("email")
        console.log('email: ', email);
        const password = formData.get("password")
        if (email != "admin@test.com") {
            return Response.json({ message: "enter a valid email" }, { status: 400 })
        } else if (password != "admin") {
            return Response.json({ message: "enter a valid password" }, { status: 400 })
        }
        await Token.admin_login({ user: "1234" })
        return Response.json({ success: true })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

export const DELETE = async (req: Request) => {
    try {
        await Token.admin_logout()
        return Response.redirect(get_base_url() + "/admin")
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}