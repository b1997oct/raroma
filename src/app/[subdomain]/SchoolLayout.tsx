import Link from 'next/link'
import React, { ReactNode } from 'react'

import NavItem, { NavItemProps } from 'rsuite/esm/Nav/NavItem';
import { Button, Nav } from 'rsuite';
import Token from '@/lib/Token';
import { Logout } from '@/components/TokenSignIn';
import Sidebar from '@/components/Sidebar';
import { headers } from 'next/headers';



export default async function SchoolLayout({ children, active }) {

    let isLogin 
    try {
        const t = await Token.user()
        isLogin = Boolean(t)
        
    } catch (error) { }



    return (
        <div>
            <div className="p-4 z-10 shadow flex gap-4 sticky top-0 bg-white">
                <div className='flex gap-2 flex-1 items-center'>
                    <h3 className="text-2xl font-semibold">
                        <Link href={'/'}>School Admin</Link>
                    </h3>
                </div>

                <Nav className="hidden md:flex gap-4">
                    {isLogin ?
                        <>
                            <MyLink href={"/"} active={active == "Dashboard"}>Dashboard</MyLink>
                            <MyLink href={'/school'} active={active == "School"}>My School</MyLink>
                            <Logout />
                        </>
                        :
                        <>
                        </>}
                </Nav>
                <Sidebar>
                    <Nav className="grid gap-4 place-content-center">
                        {isLogin ?
                            <>
                                <MyLink href={"/"} active={active == "Dashboard"}>Dashboard</MyLink>
                                <MyLink href={'/school'} active={active == "School"}>My School</MyLink>
                                <Logout />
                            </>
                            :
                            <>
                            </>}
                    </Nav>
                </Sidebar>
            </div>
            {children}
        </div>
    )
}

const MyLink = ({ href, ...props }: NavItemProps) => {
    return <NavItem as={Link} href={href} {...props} />
}