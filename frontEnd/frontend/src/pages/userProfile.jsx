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
        
        <div className="p-8">
        <img 
                src={profile.user.profilePic || 'default_avatar_url'} 
                alt={`${profile.user.username}'s profile picture`} 
                className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h1 className="text-3xl font-bold">{profile.user.username}</h1>
            <p className="text-gray-500 mb-6">{profile.user.email}</p>

            <h2 className="text-2xl mt-8">Posts ({profile.postsCount})</h2>

            <div className="space-y-4 mt-4">
                {profile.posts.map(post => (
                    <div key={post._id} className="border p-4 rounded-md">
                        <img src={post.content} alt="" />
                        <p className="font-semibold">{post.caption}</p>
                        <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
        
     )
}

export default UserProfile