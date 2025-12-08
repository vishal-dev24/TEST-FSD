import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '', image: null });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        await axios.post('https://test-fsd-1.onrender.com/register', data, { withCredentials: true });
        setFormData({ username: '', email: '', password: '', image: null });
        navigate('/login');
    }

    return (
        <div className='min-h-screen flex justify-center items-start bg-gray-900 text-gray-100 px-6'>
            <div className='w-full max-w-md p-4 mt-20 bg-white/10 rounded-lg shadow-md border border-slate-600'>
                <h1 className='text-2xl sm:text-3xl font-semibold mb-3 text-gray-100 text-center'> Register </h1>
                <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
                    <input className='px-3 py-2 m-2 text-base sm:text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-700 capitalize focus:outline-none border border-slate-400 rounded-lg w-full' onChange={handleChange} value={formData.username} type='text' name='username' placeholder='Enter your username' required />
                    <input className='px-3 py-2 m-2 text-base sm:text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-700 capitalize focus:outline-none border border-slate-400 rounded-lg w-full' onChange={handleChange} value={formData.email} type='email' name='email' placeholder='Enter your email' required />
                    <input className='px-3 py-2 m-2 text-base sm:text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-700 capitalize focus:outline-none border border-slate-400 rounded-lg w-full' onChange={handleChange} value={formData.password} type='password' name='password' placeholder='Enter your password' required />
                    <input className='px-3 py-2 m-2 text-sm font-medium text-gray-100 bg-slate-700 rounded-lg border border-slate-400 w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800' onChange={handleChange} type='file' name='image' accept="image/*" required />
                    <button className='p-2.5 m-2 text-lg sm:text-xl text-gray-200 font-semibold hover:bg-slate-800 capitalize border-2 border-slate-400 rounded-lg bg-slate-900 w-full' type='submit'>Submit</button>
                    <p onClick={() => navigate('/login')} className='text-center text-slate-100 cursor-pointer text-lg hover:text-violet-400 mt-3'>Already have an account? Login</p>
                </form>
            </div>
        </div>

    );
};
export default Register;