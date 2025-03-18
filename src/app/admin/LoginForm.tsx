"use client"

import axios from "axios"
import { useState } from "react"
import { Button } from "rsuite"

const email = "admin@test.com", password= "admin"
export default function LoginForm() {

    const [message, setMessage] = useState("")

    const onSubmin = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        setMessage("")
        axios.post("/admin/login", formData)
        .then(res=>{
            location.reload()
        })
        .catch(error=>{
            setMessage(error.response?.data?.message || error.message)
        })
    }


  return (
    <div>
        <p className="text-red-500 text-center mt-30">{message}</p>
        <form onSubmit={onSubmin} className='mt-4 flex justify-center flex-wrap' >
          <input required defaultValue={email} name='email' placeholder='Email' />
          <input required defaultValue={password} name='password' placeholder='Password' />
          <button className='primary' type='submit'>Login</button>
        </form>
    </div>
  )
}


export const Logout = ()=>{

    const onLogout = ()=>{
        axios.delete("/admin/login")
        .then(res=>{
            location.reload()
        })
        .catch(error=>{
            alert(error.response?.data?.message || error.message)
        })
    }
    return <Button onClick={onLogout} appearance='primary' color='red'>Logout</Button>
}