import Layout from '@/components/Layout'
import React from 'react'
import Login from './Login'
import Token from '@/lib/Token'

export default async function Page() {

  return (
    <Layout active='Login'>
      <div className='flex justify-center'>
        <Login />
      </div>
    </Layout>
  )
}
