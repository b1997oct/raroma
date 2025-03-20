import TokenSignIn from '@/components/TokenSignIn'
import School from '@/db/Tables/School'
import Token from '@/lib/Token'
import Link from 'next/link'
import React from 'react'
import { Button } from 'rsuite'
import Login from './login/Login'
import SchoolLayout from './SchoolLayout'

export default async function Page({ params, searchParams }) {

  const { subdomain } = await params
  const { token } = await searchParams

  if (token) {
    return <TokenSignIn token={token} />
  }

  let isLogin
  try {
    isLogin = await Token.user()
  } catch (error) {

  }


  if (!isLogin) {
    return <SchoolLayout active={"Login"}>
      <div className='flex items-center justify-center w-full'>
        <Login />
      </div>
    </SchoolLayout>
  }


  const data = await School.findOne({ user: subdomain })


  return (
    <SchoolLayout active="Dashboard">

      {data ?
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
            <br />
            <Link href={"/school"}><Button>Edit</Button></Link>
          </div>
        </div>
        : <div className="flex justify-center mt-20"><Link href={'/school'}><Button>Add Your School</Button></Link></div>}

    </SchoolLayout>
  )
}
