import React from 'react'
import SchoolForm from './School'
import Layout from '@/components/Layout'
import Token from '@/lib/Token'

export default async function Page() {

  let user
  try {
    const t = await Token.user()
    user = t.user
  } catch (error) { }


  return (
    <Layout active='School' user={user}>
      <SchoolForm />
    </Layout>
  )
}
