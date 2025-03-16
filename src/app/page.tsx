import CreateProfile from "@/components/CreateProfile";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import ViewButton from "@/components/ViewButton";
import Profile from "@/db/Tables/Profile";
import School from "@/db/Tables/School";
import first_subdomain from "@/lib/first_subdomain";
import Token from "@/lib/Token";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "rsuite";

const getSub = async () => {
  const headersList = await headers()
  const host = headersList.get("host")
  const [subdomain] = host.split(".")
  const isSub = await Profile.findOne({ subdomain })
  return isSub
}
export async function generateMetadata(): Promise<Metadata> {

  let title = "Rorame - Register School", desp = "Register today"
  const isSub = await getSub()

  if (isSub) {
    let { school_name, description } = await School.findOne({ user: isSub._id })
    title = "Rorame - " + school_name
    desp = description
  }

  return {
    title,
    description: desp,
    openGraph: {
      title,
      description: desp
    }
  }
}

export default async function Home(props) {


  let data,
    isSub = await getSub()

  if (isSub) {
    data = await School.findOne({ user: isSub._id })
  } else {
    data = await School.aggregate([
      {
        $lookup: {
          from: "profiles",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      }
    ])
  }

  let user
  try {
    const t = await Token.user()
    user = t.user
  } catch (error) { }


  return (
    <Layout active="Home" user={user}>
      {!isSub && <p className="text-center mt-4">Wellcome to Rorame</p>}
      <h1 className="text-4xl md:text-6xl font-bold text-center mt-20 bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">Build Your School Profile at Rorame</h1>

      {isSub ?
        <div className="flex justify-center mt-10">
          <div className="border w-full max-w-xl p-4 rounded-sm">
            <h2 className="text-4xl text-red-500">{data.school_name}</h2>
            <div className="mt-2">{data.email} | {data.phone}</div>
            <br />
            <h4 className="font-semibold">Description</h4>
            <div>{data.description}</div>
            <br />
            <h4 className="font-semibold">Address</h4>
            <div>{data.address}</div>

            {isSub._id == user && <Link href={"/school"}><Button>Edit</Button></Link>}
          </div>
        </div>
        :
        <>
          <CreateProfile />
          <br />
          <br />
          <h3 className="text-center">Registerd School</h3>
          <br />
          <div className="flex justify-center m-4 mb-20">
            <div className="w-full max-w-xl">
              {data.map((d, i) => <div key={d._id} className="border w-full p-4 rounded-sm mb-8">
                <h3>{i + 1}. {d.school_name}</h3>
                <div className="mt-2">{d.email} | {d.phone}</div>
                {/* <div>{d.address}</div> */}

                <ViewButton isEdit={user == d.user._id} subdomain={d.user.subdomain} />

              </div>)}
            </div>
          </div>
        </>}
    </Layout>
  );
}
