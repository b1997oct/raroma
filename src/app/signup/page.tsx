import Layout from '@/components/Layout'
import React from 'react'
import SignUp from './Signup'
import Token from '@/lib/Token'

export default async function Page() {

  return (
    <Layout active='Signup'>
      <div className='flex justify-center'>
        <SignUp />
      </div>
    </Layout>
  )
}
