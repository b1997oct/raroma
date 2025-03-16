import Token from "@/lib/Token"

export const GET = async (req: Request) => {
    console.log(req.referrer);
    try {
        let token = new URL(req.url).searchParams.get("token")
        const { user } = await Token.verify(token)
        await Token.login({ user })
        return Response.redirect(new URL("/school", req.url))
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}
