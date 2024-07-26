import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const login = async (email, password) => {
        const success = handleInputErrors(email,password) 
        if(!success) return

        setLoading(true)
        try{
            const res = await fetch('/api/auth/login',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({email,password})

            })
            const data = await res.json()
            if(data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("org-app-login", JSON.stringify(data))
            console.log(data,"dada1")
            localStorage.setItem("token", JSON.stringify(data.token))


            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading,login}


}

export default useLogin


function handleInputErrors(email,password){
    if(!email || !password){
        toast.error('please fill all fields')
        return false
    }
   

    return true
}
