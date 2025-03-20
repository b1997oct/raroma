"use client"

import Input from '@/components/Input'
import { useRef, useState } from 'react'
import { Button } from 'rsuite'
import useForm, { UseFormSchema } from '@/hooks/useForm'
import axios from 'axios'
import Link from 'next/link'
import make_subdomain from '@/lib/make_subdomain'
import get_base_url from '@/lib/get_base_url'

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

    const onSubmit = async () => {
        try {
            if (isError()) {
                setTouched(true)
                return
            }
            setLoading(true)
            const { data: res } = await axios.post('/api/login', data)
            location.replace("/")
        } catch (error) {
            setMessage(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='grid gap-4 w-full max-w-sm p-4 rounded shadow-sm mt-10'>
            <h3>Login</h3>
            {schema.map(d => <Input key={d.name} {...inputProps(d)} />)}
            {/* <div className='df jce'><button className='link'>Forgot Password</button></div> */}
            {message && <div className='text-error'>{message}</div>}
            <Button onClick={onSubmit} loading={loading} appearance='primary'>LOGIN</Button>
            <div>Don't have an Account? <Link href={get_base_url() + '/signup'} className='link'>Sign Up</Link></div>
            <div className='text-center my-2'>OR</div>
            <div className='flex justify-center gap-2'>Go to <Link className='link' href={get_base_url()}>Rorame</Link></div>
        </div>
    )
}
