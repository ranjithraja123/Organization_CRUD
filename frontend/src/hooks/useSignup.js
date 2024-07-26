import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useSignup = () => {
  

    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const signup = async({name,email,password,organization,role}) => {
        const success = handleInputErrors({name,email,password,organization,role})
        if(!success) return
        setLoading(true)


        try{
            const res = await fetch("/api/auth/register",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({name,email,password,organization,role})
            }

            )

            const data = await res.json()
            console.log(data,'dada')
            if(data.error){
                throw new Error(data.error)
            }

            //set in local storage
            // localStorage.setItem("org-app", JSON.stringify(data))
            //context
            // setAuthUser(data)


        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

        
    }
    return {loading, signup}


}

export default useSignup





function handleInputErrors({name,email,password,organization,role}){
    if(!name || !email || !password || !organization || !role){
        toast.error('please fill all fields')
        return false
    }
    // if(password !== confirmPassword){
    //     toast.error('passwords do not match')
    //     return false
    // }
    // if(password.length < 6) {
    //     toast.error('password must be atleast 6 characters')
    //     return false
    // }

    return true
}
