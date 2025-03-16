import Layout from '@/components/Layout'
import React from 'react'
import SignUp from './Signup'

export default function Page() {
  return (
    <Layout active='Login'>
      <div className='flex justify-center'>
        <SignUp />
      </div>
    </Layout>
  )
}
