import Token from "@/lib/Token"

export const GET = async (req: Request) => {
    try {
        await Token.logout()
        return Response.redirect(new URL("/", req.url))
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}
