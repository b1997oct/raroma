import Profile from "@/db/Tables/Profile"
import Token from "@/lib/Token";
import bcrypt from "bcrypt";

type Props = {
    email: string, password: string, name: string, phone: string;
}
export const POST = async (req: Request) => {
    try {
        let { email, password, ...others } = await req.json() as Props

        let data = await Profile.findOne({ email })
        if (data) {
            return Response.json({ message: "profile already exits" }, { status: 400 })
        }
        if (password.length < 4) {
            return Response.json({ message: "password must be at least 4" }, { status: 400 })
        }
        password = await bcrypt.hash(password, 10)
        let subdomain = await gen_unique_subdomain()
        data = await new Profile({ email, password, subdomain, ...others }).save()
        const token = await Token.login({ user: data._id.toString() })
        return Response.json({ token, subdomain })
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

async function gen_unique_subdomain() {
    let count = await Profile.countDocuments();
    let subdomain = `school${count}`;

    while (await Profile.exists({ subdomain })) {
        count++;
        subdomain = `school${count}`;
    }

    return subdomain;
}