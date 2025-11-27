import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ title: '', image: null, })

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/getPost/${id}`)
            .then(({ data }) => setFormData({ title: data.title, image: data.image || null }))
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title)
        data.append('image', formData.image)
        await axios.put(`http://localhost:3000/update/${id}`, data, { withCredentials: true })
        setFormData({ title: '', image: null, })
        navigate('/profile')
    }
    return (
        <div className='min-h-screen flex justify-center items-start bg-gray-900 text-gray-100 p-6'>
            <div className='w-full max-w-lg p-8 mt-10 bg-white/10 rounded-lg shadow-lg border border-slate-600'>
                <button onClick={() => navigate("/profile")} className="flex items-center gap-2 text-teal-100 hover:text-zinc-600 transition mb-6">
                    <span className="text-lg font-medium">Back</span>
                </button>
                <h1 className='text-3xl text-center text-gray-200 font-semibold mb-6'>Update Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        className='px-4 py-3 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-700 capitalize focus:outline-none border border-slate-400 rounded-lg w-full'
                        onChange={handleChange}
                        value={formData.title}
                        type="text"
                        name="title"
                        placeholder='Enter your title'
                        required
                    />
                    <div className='flex justify-start ms-1'>
                        {formData.image && (
                            <img className='w-32 h-32 rounded-lg' src={`http://localhost:3000/uploads/${formData.image}`} alt="Uploaded" />
                        )}
                    </div>
                    <input
                        className='px-3 py-2 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 capitalize focus:outline-none border border-slate-400 rounded-lg bg-slate-700 w-full file:mr-3 file:px-4 file:py-2 file:text-sm file:rounded-full file:border-1 file:border-white file:bg-cyan-700 file:text-white hover:file:bg-cyan-600'
                        onChange={handleChange}
                        type="file"
                        name="image"
                        required
                    />
                    <button
                        className='p-3 text-xl text-gray-200 font-semibold hover:bg-slate-800 capitalize border-2 border-slate-400 rounded-lg bg-slate-900 w-full'
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )

}

export default Update