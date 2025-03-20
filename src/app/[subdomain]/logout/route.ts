import get_base_url from "@/lib/get_base_url"
import Token from "@/lib/Token"

export const GET = async (req: Request) => {
    try {
        await Token.logout()
        return Response.json({ ok: true });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}
