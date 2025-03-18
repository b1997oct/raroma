import Token from '@/lib/Token'
import React from 'react'
import { Button } from 'rsuite'
import { Logout } from './LoginForm'

export default async function AdminLayout({ children }) {

    let isLogin
    try {
        isLogin = await Token.admin()
    } catch (error) { }


    return (
        <div>
            <div className='p-4 shadow flex'>
                <h3 className='flex-1'>Admin</h3>
                {isLogin && <Logout />}
            </div>
            {children}
        </div>
    )
}
