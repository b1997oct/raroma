"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from 'rsuite'

export default function ViewButton({ isEdit, subdomain }) {
    return (
        <div className="flex justify-end gap-4">
            {isEdit && <Link href={'/school'}><Button color='red' appearance="primary" >Edit</Button></Link>}
            <Link href={`http://${subdomain}.localhost:3000`}>
                <Button appearance="primary">View</Button>
            </Link>
        </div>
    )
}
