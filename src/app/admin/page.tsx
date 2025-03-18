import Token from '@/lib/Token'
import Link from 'next/link'
import React from 'react'
import { Button } from 'rsuite'
import LoginForm from './LoginForm'

export default async function Page() {

  let isLogin 
  try {
    isLogin = await Token.admin()
  } catch (error) {}

  return (
    <div className=''>
      {isLogin ?
      <div className='flex justify-center'>
        <div className='w-full max-w-xl shadow p-4 mt-20'>
          <div className='flex justify-between border-b pb-4'>
            <h2>User Profile Table</h2>
            <Link href={'/admin/users'}>
              <Button appearance='primary'>View</Button>
            </Link>
          </div>
          <div className='flex justify-between mt-4'>
            <h2>Schools Table</h2>
            <Link href={'/admin/schools'}>
              <Button appearance='primary'>View</Button>
            </Link>
          </div>
        </div>
      </div>
      : <div>
        <LoginForm />
        </div>}
    </div>
  )
}
