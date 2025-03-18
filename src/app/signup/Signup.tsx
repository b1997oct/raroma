"use client"

import Input from '@/components/Input'
import useForm, { UseFormSchema } from '@/hooks/useForm'
import get_base_url from '@/lib/get_base_url'
import axios from 'axios'
import { useState } from 'react'
import { Button } from 'rsuite'


const schema: UseFormSchema = [
    {
        name: "name",
        label: "Your Name",
        placeholder: "Full Name",
        error: { required: true, maxlength: 100 }
    },
    {
        name: "email",
        label: "Email",
        placeholder: "example@mail.com",
        error: { required: true, maxlength: 100 }
    },
    {
        name: "phone",
        label: "Phone",
        placeholder: "Enter Phone No.",
        error: { required: true, minlength: 5, maxlength: 100 }
    },
    {
        name: "password",
        label: "Password",
        placeholder: "****",
        error: { required: true, minlength: 4, maxlength: 16 }
    }
]


export default function SignUp() {

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
            const { data: res } = await axios.post('/api/signup', data)
            let { subdomain, token } = res
            window.location.href = get_base_url(subdomain) + "?token=" + token;
        } catch (error) {
            setMessage(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='grid gap-4 w-full max-w-sm p-4 mt-4 rounded shadow-sm'>
            <h3>Signup</h3>
            {schema.map(d => <Input key={d.name} {...inputProps(d)} />)}
            {message && <div className='text-error'>{message}</div>}
            <Button onClick={onSubmit} loading={loading} appearance='primary'>Signup</Button>
            <div>Already have an Account? <a href='/login' className='link'>Login</a></div>
        </div>
    )
}
