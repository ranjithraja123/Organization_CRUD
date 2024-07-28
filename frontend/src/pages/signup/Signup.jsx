import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSignup from '../../hooks/useSignup.js';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext.jsx';

const Signup = () => {
    // const {signup} = useAuth()
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [organizations, setOrganizations] = useState([]);
    // const [selectedOrganization, setSelectedOrganization] = useState('');
    // const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const { loading, signup } = useSignup()
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        organization: '',
        role: 'user',
        privileges:[]
    })

    const availablePrivilages = ['read', 'update', 'delete']

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs, 'qazwsx');

        await signup(inputs)
        localStorage.setItem("org-app", JSON.stringify(inputs))
        navigate('/')


    }


    const handlePrivilChange = (privil) => {
        setInputs((prev) => {
            const privileges = prev.privileges.includes(privil) ?  prev.privileges.filter(p => p !== privil) : [...prev.privileges, privil];
            return { ...prev, privileges }
        })
    }



    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                // const res = await fetch("/api/organizations/",{
                //     method: "GET",
                //     headers: {"Content-Type":"application/json"},
                //     // body: JSON.stringify({fullName,username,password,confirmPassword,gender})
                // }

                // )

                const response = await axios.get('/api/organizations');

                const data = await response.data
                console.log(data, 'dummy')
                setOrganizations(data)
            } catch (error) {
                console.error('Failed to fetch organizations:', error);
            }
        };
        fetchOrganizations();
    }, []);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await signup({name, email, password, organization: selectedOrganization, role});
    //     // Navigate('/data')
    // }



    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'
                style={{
                    boxShadow: 'inset -10px 0 10px -10px purple, inset 10px 0 10px -10px pink'
                }}>
                <h1 className='text-3xl font-semibold text-center'>Organization Sign Up</h1>


                <form
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input type='text' placeholder='Enter FullName' value={inputs.name} className='w-full input input-bordered h-10' onChange={(e) => setInputs({ ...inputs, name: e.target.value })} required />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Email</span>
                        </label>
                        <input type='email' placeholder='Enter Email' value={inputs.email} className='w-full input input-bordered h-10' onChange={(e) => setInputs({ ...inputs, email: e.target.value })} required />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type='password' placeholder='Enter Password' value={inputs.password} className='w-full input input-bordered h-10' onChange={(e) => setInputs({ ...inputs, password: e.target.value })} required />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Organization</span>
                        </label>
                        <select
                            className='w-full input input-bordered'
                            value={inputs.organization}
                            onChange={(e) => setInputs({ ...inputs, organization: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Organization</option>
                            {organizations.map(org => (
                                <option key={org._id} value={org._id}>{org.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Role</span>
                        </label>
                        <select
                            className='w-full input input-bordered'
                            value={inputs.role}
                            onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        
                        <label className='label p-2'>
                            <span className='text-base label-text'>Privileges</span>
                        </label>
                        <div className='flex flex-col'>
                            {availablePrivilages.map((privil) => (
                                <label key={privil} className='flex items-center space-x-2'>
                                    <input type='checkbox' checked={inputs.privileges.includes(privil)}
                                    onChange={()=>handlePrivilChange(privil)} />
                                    <span>
                                        {privil}
                                    </span>
                                </label>
                            ))}


                        </div>
                       
                    </div>
                    <Link to='/' className='text-sm hover:underline hover:text-green-600 mt-2 inline-block' >
                        Already have an account?
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2 bg-pink-900 hover:bg-pink-700'>
                            SignUp
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup
