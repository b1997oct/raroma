import Login from './Login'
import React from 'react'
import SchoolLayout from '../SchoolLayout'

export default function Page() {
  return (
    <SchoolLayout active={"Login"}>
    <div className='h-[70vh] grid place-items-center'>
        <Login />
    </div>
    </SchoolLayout>
  )
}
