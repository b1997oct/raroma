import Link from 'next/link'
import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import NavItem, { NavItemProps } from 'rsuite/esm/Nav/NavItem';
import { Button, Nav } from 'rsuite';
import base_url from '@/lib/base_url';

type Props = {
    active: "Home" | "Login" | "Signup" | "Admin" | "School";
    children: ReactNode;
    user?: string;
}
export default function Layout({ active, children, user }: Props) {

    const isLogin = Boolean(user)

    return (
        <div>
            <div className="p-4 shadow flex gap-4 sticky top-0 bg-white">
                <h3 className="text-2xl font-semibold flex-1"><Link href={base_url}>Rorame</Link></h3>
                <Nav className="hidden md:flex gap-4">
                    <MyLink href={base_url} active={active == "Home"}>Home</MyLink>
                    {isLogin ?
                        <>
                            <MyLink href={'/school'} active={active == "School"}>My School</MyLink>
                            <Link href={'/logout'}><Button color='red' appearance='primary'>Logout</Button></Link>
                        </>
                        :
                        <>
                            <MyLink href={'/login'} active={active == "Login"}>Login</MyLink>
                            <MyLink href={'/signup'} active={active == "Signup"}>Signup</MyLink>
                        </>}
                </Nav>
                <Sidebar>
                    <Nav className="grid gap-4 place-content-center">
                        <MyLink href={'/'} active={active == "Home"}>Home</MyLink>
                        {isLogin ?
                            <>
                                <MyLink href={'/school'} active={active == "School"}>My School</MyLink>
                                <Link href={'/logout'}><Button color='red' appearance='primary'>Logout</Button></Link>
                            </>
                            :
                            <>
                                <MyLink href={'/login'} active={active == "Login"}>Login</MyLink>
                                <MyLink href={'/signup'} active={active == "Signup"}>Signup</MyLink>
                            </>}
                    </Nav>
                </Sidebar>
            </div>
            {children}
        </div>
    )
}

const MyLink = (props: NavItemProps) => {
    return <NavItem as={Link} {...props} />
}