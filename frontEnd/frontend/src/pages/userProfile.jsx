import React, { useEffect, useState } from "react";

function UserProfile () {
    const [profilePic , setProfilePic] = useState(null)
    const [posts , setPosts] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await api.get('/users/get-profile:')
            } catch (error) {
                console.error(error)
                alert('your posts couldnot be loaded')
            }
        }
    })
     return (
        <img src="" alt="profilePic" />
        
     )
}

export default UserProfile