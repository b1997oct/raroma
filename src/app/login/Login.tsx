"use client"

import Input from '@/components/Input'
import { useRef, useState } from 'react'
import { Button } from 'rsuite'
import useForm, { UseFormSchema } from '@/hooks/useForm'
import axios from 'axios'
import Link from 'next/link'
import make_subdomain from '@/lib/make_subdomain'

const schema: UseFormSchema = [
    {
        name: "email",
        label: "Email",
        placeholder: "example@mail.com",
        error: { required: true, minlength: 5, maxlength: 100 }
    },
    {
        name: "password",
        label: "Password",
        placeholder: "****",
        error: { required: true, minlength: 4, maxlength: 16 }
    }
]

export default function Login() {

    const { data, inputProps, isError, setTouched } = useForm({ schema })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [href, setHref] = useState("/")
    const hrefRef = useRef<HTMLAnchorElement>(null)


    const onSubmit = async () => {
        try {
            if (isError()) {
                setTouched(true)
                return
            }
            setLoading(true)
            const { data: res } = await axios.post('/api/login', data)
            let { subdomain, token } = res
            let url = make_subdomain(subdomain)
            url = url + "/token?token=" + token
            setHref(url)
            setTimeout(() => hrefRef.current.click(), 1000)
        } catch (error) {
            setMessage(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='grid gap-4 w-full max-w-sm p-4 rounded shadow-sm mt-10'>
            <h3>Login</h3>
            <a ref={hrefRef} href={href}></a>
            {schema.map(d => <Input key={d.name} {...inputProps(d)} />)}
            {/* <div className='df jce'><button className='link'>Forgot Password</button></div> */}
            {message && <div className='text-error'>{message}</div>}
            <Button onClick={onSubmit} loading={loading} appearance='primary'>LOGIN</Button>
            <div>Don't have an Account? <Link href='/signup' className='link'>Sign UP</Link></div>
        </div>
    )
}
