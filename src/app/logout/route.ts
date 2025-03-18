import get_base_url from "@/lib/get_base_url"
import Token from "@/lib/Token"

export const GET = async ({ headers, url }: Request) => {
    try {

        const base = new URL(url).searchParams.get("base")
        const host = headers.get("host")
        console.log('host: ', host);
        await Token.logout()

        if (base) {
            return Response.redirect(get_base_url());
        } else {
            return Response.json({ ok: true });

        }
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}
