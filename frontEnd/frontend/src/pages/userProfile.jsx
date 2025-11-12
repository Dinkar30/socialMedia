import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api.js";
function UserProfile () {
    const [profile , setProfile] = useState(null)
    const {username} = useParams()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        if(!username) return;
        const fetchProfile = async () => {
            try {
                console.log('Fetching profile for:', username)  
                const response = await api.get(`/users/get-profile/${username}`)
                console.log(response)
                setProfile(response.data.data)
              
            } catch (error) {
                console.error(error)
                alert('your profile couldnot be loaded ')
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()

    },[username])

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (!profile) {
        return <div className="p-4 text-center">Profile not found.</div>;
    }
     return (
        
       <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                
                <div className="bg-gray-800 p-6 md:p-10 rounded-xl shadow-2xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-10">
                    <img 
                        src={profile.user.profilePic || DEFAULT_AVATAR} 
                        alt={`${profile.user.username}'s missing`} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                    />
                    
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-white">
                            {profile.user.username}
                        </h1>
                        <p className="text-md text-gray-400 mt-1 mb-3">
                            {profile.user.email}
                        </p>
                        
                         <div className="flex justify-center md:justify-start space-x-6">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-blue-400">
                                    {profile.postsCount}
                                </span>
                                <span className="block text-sm text-gray-400">Posts</span>
                            </div>
                        </div>
                    </div>
                </div>

                 <h2 className="text-3xl font-bold mt-10 mb-6 border-b border-gray-700 pb-2">
                    Recent Posts
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profile.posts.length > 0 ? (
                        profile.posts.map(post => (
                            <div 
                                key={post._id} 
                                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                            >
                                 {post.content && (
                                    <img 
                                        src={post.content} 
                                        alt={post.caption || "User post content"} 
                                        className="w-full h-40 object-cover rounded-md mb-3"
                                        onError={(e) => { 
                                             e.target.onerror = null; 
                                            e.target.src="https://placehold.co/600x400/374151/f3f4f6?text=Post+Image"
                                        }}
                                    />
                                )}
                                
                                <p className="font-semibold text-lg text-white mb-1">
                                    {post.caption || "No Caption"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Posted on: {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 col-span-full text-center py-10">
                            {profile.user.username} hasn't posted anything yet.
                        </p>
                    )}
                </div>

            </div>
        </div>
        
     )
}

export default UserProfile