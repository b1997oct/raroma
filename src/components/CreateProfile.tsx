"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateProfile() {

    const [name, setName] = useState("")
    const r = useRouter()

    const onClick = () => {
        location.href = "/signup?subdomain=" + name
    }

    return (
        <div>
            <div className="flex justify-center mt-20 ">
                <div className="grid gap-4 w-full max-w-sm py-8 px-4 shadow">
                    <input onChange={(e) => setName(e.target.value)} className="border" placeholder="Enter Your School Name" />
                    <button onClick={onClick} className="primary mt-4">Create Profile</button>
                </div>
            </div>
        </div>
    )
}
