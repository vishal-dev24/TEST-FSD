import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '', })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'https://test-fsd.onrender.com/login',
                formData,
                { withCredentials: true }
            );

            if (res.status === 200) {
                setFormData({ email: '', password: '' });
                navigate('/profile');  // only on success
            } else {
                alert("Login failed");
            }
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    }


    return (
        <div className='min-h-screen flex justify-center items-start bg-gray-900 text-gray-100 '>
            <div className='w-full max-w-sm px-8 py-5 mt-20 bg-white/10 rounded-lg shadow-md border border-slate-600 '>
                <h1 className='text-3xl font-semibold mb-3 text-gray-100 text-center'>Login !</h1>
                <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
                    <input className='px-4 py-3 m-2 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-700 capitalize focus:outline-none border border-slate-400 rounded-lg bg-slate-200 w-full' onChange={handleChange} value={formData.email} type="email" name="email" placeholder='enter your email' required />
                    <input className='px-4 py-3 m-2 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-700 capitalize focus:outline-none border border-slate-400 rounded-lg bg-slate-200 w-full' onChange={handleChange} value={formData.password} type="password" name="password" placeholder='enter your password' required />
                    <button className='p-2.5 m-2 text-xl text-gray-200 font-semibold hover:bg-slate-800 capitalize border-2 border-slate-400 rounded-lg bg-slate-900 w-full' type='submit'>Submit</button>
                    <p onClick={() => navigate('/')} className='text-center text-slate-100 cursor-pointer text-lg hover:text-violet-400 mt-3'>if You Are not Register , then SignUp</p>
                </form>
            </div>
        </div>
    )
}

export default Login