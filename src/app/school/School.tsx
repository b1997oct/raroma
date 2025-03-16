"use client"

import Input from '@/components/Input'
import useForm, { UseFormSchema } from '@/hooks/useForm'
import base_url from '@/lib/base_url'
import make_subdomain from '@/lib/make_subdomain'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, Loader, Progress } from 'rsuite'


const schema: UseFormSchema = [
    {
        name: "school_name",
        label: "School Name",
        placeholder: "Canbridge University",
        error: { required: true, maxlength: 200 }
    },
    {
        name: "subdomain",
        label: "Sub Domain",
        placeholder: "Enter related subdomain",
        error: { required: true, maxlength: 200 }
    },
    {
        name: "description",
        label: "School Description",
        placeholder: "Enter school information",
        error: { required: true, minlength: 10, maxlength: 500 }
    },
    {
        name: "email",
        label: "Email (,) for multiple",
        placeholder: "example@mail.com",
        error: { required: true, minlength: 5, maxlength: 100 }
    },
    {
        name: "phone",
        label: "Phone No. (,) for multiple",
        placeholder: "Enter Phone No.",
        error: { required: true, minlength: 10, maxlength: 100 }
    },
    {
        name: "address",
        label: "School Address",
        placeholder: "Bangalore, Yelahanka - 560003",
        error: { required: true, minlength: 10, maxlength: 100 }
    }
]


const addresSchema: UseFormSchema = [
    {
        name: "pincode",
        label: "Pincode",
        placeholder: "560001",
        error: { required: true, type: "number", minlength: 6, maxlength: 6 }
    },
    {
        name: "city",
        label: "City",
        placeholder: "Bangalore",
        error: { required: true, maxlength: 500 }
    },
    {
        name: "state",
        label: "State",
        placeholder: "Karnataka",
        error: { required: true, maxlength: 100 }
    },
    {
        name: "country",
        label: "Country",
        placeholder: "India",
        readOnly: true,
        error: { required: true, maxlength: 100 }
    }
]


export default function School() {
    const [payload, setPayload] = useState(null)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    const getData = async () => {
        try {
            const { data } = await axios.get('/api/school')
            setPayload(data)
        } catch (error) {
            setMessage(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getData()
    }, [])

    const onLogout = () => location.replace(base_url)

    return <div className='flex flex-col items-center justify-center my-10'>
        {loading && <div className='w-full max-w-sm text-center'> <Loader color='red' /> "Loading..."</div>}
        {message && <div>
            <p className='text-error'>{message}</p>
            <div className='flex gap-4'>
                <Button appearance='ghost' onClick={() => location.reload()}>Reload</Button>
                <Button color='red' appearance='primary' onClick={onLogout}>Logout?</Button>
            </div>
        </div>}
        {!loading && <From payload={payload} />}
    </div>
}

function From({ payload }) {

    const { data, values, inputProps, isError, setTouched } = useForm({ schema, payload })

    const [message, setMessage] = useState("")

    const onSubmit = async () => {
        try {
            if (isError()) {
                setTouched(true)
                return
            }

            await axios.put('/api/school', data)
            location.replace('/')
        } catch (error) {
            setMessage(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className='grid gap-4 w-full max-w-xl py-8 px-4 mt-4 rounded shadow-sm m-4'>
            <h3>School Basic Details</h3>
            {schema.map(d => <Input key={d.name} {...inputProps(d)} />)}
            <br />
            {/* <br />
            <h3>School Address Details</h3>
            {addresSchema.map(d => <Input key={d.name} {...addressProps(d)} />)} */}
            <br />
            {message && <div className='text-error'>{message}</div>}
            <Button onClick={onSubmit} appearance='primary'>Submit</Button>
        </div>
    )
}
