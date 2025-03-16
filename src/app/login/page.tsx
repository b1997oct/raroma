import Layout from '@/components/Layout'
import React from 'react'
import Login from './Login'

export default function Page() {
  return (
    <Layout active='Login'>
      <div className='flex justify-center'>
        <Login />
      </div>
    </Layout>
  )
}
