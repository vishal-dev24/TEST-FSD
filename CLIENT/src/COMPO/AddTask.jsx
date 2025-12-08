import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddTask = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ title: '', image: null, })

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title)
        data.append('image', formData.image)
        await axios.post('https://test-fsd-1.onrender.com/create', data, { withCredentials: true })
        setFormData({ title: '', image: null, })
        navigate('/profile')
    }

    return (
        <div className='min-h-screen flex justify-center items-start bg-gray-900 text-gray-100 '>
            <div className='w-full max-w-sm px-8 py-5 mt-20 bg-white/5 rounded-xl shadow-md border border-slate-600 '>
                <button onClick={() => navigate("/profile")} className="flex items-center gap-2 text-teal-100 hover:text-zinc-600 transition mb-6">
                    <span className="text-lg font-medium border-2  px-2.5 rounded-lg ">Back</span>
                </button>
                <h1 className='text-3xl font-semibold mb-3 text-gray-100 text-center'>Add Task !</h1>
                <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
                    <input className='px-4 py-3 m-2 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-700 capitalize focus:outline-none border border-slate-400 rounded-lg bg-slate-200 w-full' onChange={handleChange} value={formData.title} type="text" name="title" placeholder='enter your title' required />
                    <input className='px-3 py-2 m-2 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 capitalize focus:outline-none border border-slate-400 rounded-lg bg-slate-700 w-full
                     file:mr-3 file:px-4 file:py-2 file:text-wsm file:rounded-full file:border-1 file:border-white file:bg-slate-900 file:text-white hover:file:bg-cyan-600' onChange={handleChange} type="file" name="image" required />
                    <button className='p-2.5 m-2 text-xl text-gray-200 font-semibold hover:bg-slate-200 capitalize border-2 border-slate-400 rounded-lg bg-slate-900 w-full' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddTask