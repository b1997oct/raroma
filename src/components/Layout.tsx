import Link from 'next/link'
import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import NavItem, { NavItemProps } from 'rsuite/esm/Nav/NavItem';
import { Button, Nav } from 'rsuite';
import get_base_url from '@/lib/get_base_url';
import Token from '@/lib/Token';
import { headers } from 'next/headers';
import Profile from '@/db/Tables/Profile';
import { Logout } from './TokenSignIn';

type Props = {
    active: "Home" | "Login" | "Signup" | "Admin" | "School";
    children: ReactNode;
    user?: string;
}
export default async function Layout({ active, children }: Props) {

    const headersList = await headers()
    const origin = "http://" + headersList.get("host")
    let isRarome = origin == get_base_url()


    let user, subdomain
    try {
        const t = await Token.user()
        user = t.user
        if (isRarome) {
            let data = await Profile.findById(user)
            subdomain = data.subdomain
        }
    } catch (error) { }


    return (
        <div>
            <div className="p-4 z-10 shadow flex gap-4 sticky top-0 bg-white">
                <div className='flex gap-2 flex-1 items-center'>
                    <h3 className="text-2xl font-semibold">
                        <Link href={get_base_url()}>Rorame</Link>
                    </h3>
                    {subdomain &&
                        <>
                            |
                            <Link href={get_base_url(subdomain)}>Dashboard</Link>
                        </>}
                </div>

                <Nav className="hidden md:flex gap-4">
                    <MyLink href={"/"} active={active == "Home"}>Home</MyLink>
                    <MyLink href={'/signup'} active={active == "Signup"}>School Signup</MyLink>
                    <MyLink href={'/admin'} >Admin Login</MyLink>

                </Nav>
                <Sidebar>
                    <Nav className="grid gap-4 place-content-center">
                        <MyLink href={"/"} active={active == "Home"}>Home</MyLink>
                        <MyLink href={'/signup'} active={active == "Signup"}>School Signup</MyLink>
                        <MyLink href={get_base_url() + '/admin'} >Admin Login</MyLink>
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