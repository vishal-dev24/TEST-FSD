import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    const fetchUser = async () => {
        try {
            const res = await axios.get('https://test-fsd-1.onrender.com/profile', { withCredentials: true })
            setUser(res.data)
            setPosts(res.data.posts)
        } catch {
            setUser(null)
            navigate('/login')
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handleDelete = async (postId) => {
        await axios.delete(`https://test-fsd-1.onrender.com/delete/${postId}`, { withCredentials: true });
        setPosts(posts.filter(post => post._id !== postId))
    };

    const handleLogout = async () => {
        await axios.get('https://test-fsd-1.onrender.com/logout', { withCredentials: true })
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-900 p-6">
            <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-cyan-700">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {user && (
                        <>
                            <div className="w-full md:w-1/3 flex justify-center">
                                <img src={user.image} className="w-32 h-32 object-cover border-4 border-cyan-700 rounded-full shadow-lg" />
                            </div>
                            <div className="w-full md:w-2/3 flex flex-col gap-3 text-center md:text-left">
                                <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                                <h2 className="text-lg text-gray-300">{user.email}</h2>
                                <div className="flex gap-4 mt-4 justify-center md:justify-start">
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium" onClick={() => navigate("/addtask")}> Add Task </button>
                                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium" onClick={handleLogout}> Logout   </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="w-full max-w-6xl mt-10 bg-white/5 border border-slate-700 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-5">All Posts</h2>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {posts.map((post) => (
                        <div key={post._id}
                            className="break-inside-avoid bg-white/10 rounded-xl border border-cyan-900 overflow-hidden shadow-md relative group">
                            <img
                                src={post.image}
                                className="w-full object-cover rounded-b-none"
                            />
                            <div className="p-3">
                                <h3 className="text-lg text-gray-100 font-semibold capitalize">{post.title}</h3>
                            </div>
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm" onClick={() => handleDelete(post._id)}> Delete </button>
                                <button className="bg-teal-700 hover:bg-teal-800 text-white px-3 py-1 rounded-md text-sm" onClick={() => navigate(`/update/${post._id}`)}>  Update   </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Profile