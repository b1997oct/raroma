import Token from "@/lib/Token"

export const GET = async (req: Request) => {

    try {
        console.log("URL", req.url);
        let token = new URL(req.url).searchParams.get("token");
        const { user } = await Token.verify(token);
        await Token.login({ user });

        return Response.json({ ok: true });;
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
};
