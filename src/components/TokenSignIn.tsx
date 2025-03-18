"use client"

import get_base_url from "@/lib/get_base_url"
import axios from "axios"
import { useEffect } from "react"
import { Button, Loader } from "rsuite"

export default function TokenSignIn({ token }) {


    useEffect(() => {
        const signin = async () => {
            try {
                await axios.get('/token?token=' + token)
                window.location.replace('/school')
            } catch (error) {
                window.location.replace("/")
            }
        }
        signin()
    }, [])


    return (
        <div><Loader color='red' /> SignIn...</div>
    )
}


export const Logout = () => {

    const onLogout = () => {
        axios.get("/logout")
            .then(res => {
                location.href = get_base_url() + "/logout?base=yes"
            })
            .catch(error => {
                alert(error.response?.data?.message || error.message)
            })
    }
    return <Button onClick={onLogout} appearance='primary' color='red'>Logout</Button>
}