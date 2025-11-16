import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import Navbar from "../components/navbar.jsx";

function getRandomNumber() {
  return Math.floor(Math.random() * 17);
}

function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const currentUserId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts/feed')
        console.log(response.data.data);
        
        const postsWithLikeState = response.data.data.posts.map(post => ({
          ...post,
          isLiked: post.likes.some(u => u._id === currentUserId),   
          localLikesCount: post.likes.length
        }))
        
        setPosts(postsWithLikeState)
      } catch (error) {
        console.error(error)
        alert('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleLike = async (postId, index) => {
    try {
      await api.post(`/posts/like-post/${postId}`)  
      
      setPosts(prevPosts => 
        prevPosts.map((post, i) => 
          i === index 
            ? { 
                ...post, 
                isLiked: !post.isLiked,
                localLikesCount: post.isLiked ? post.localLikesCount - 1 : post.localLikesCount + 1
              }
            : post
        )
      )
    } catch (error) {
      console.error(error)
      alert("Couldn't like the post")
    }
  }

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`)
  }

  const loadingQuotes = [
    "meanwhile, why're you so sweet...",
    "Hold on…",
    "Motivation not found...",
    "Loading… because teleportation isn't ready yet...",
    "Snoozing rn...",
    "Reticulating splines… whatever that means...",
    "Hey there !!",
    "servers sleeping...",
    "Get your coffee while We bring the good stuff...",
    "Slow and steady… like Monday mornings...",
    "Aa raha hu....",
    "Wakey wakey...",
    "we blame internet for this...",
    "Pretending to load...",
    "Yo yo yo...",
    "will load till dawn...",
    "Patience test..."
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen px-4">
        <p className="text-3xl font-semibold text-gray-800 text-center">
          {loadingQuotes[getRandomNumber()]}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <Navbar/>
    <div className="max-w-4xl mx-auto p-4 bg-gray-900">
      {posts.map((post, index) => (
        <div 
          key={post._id} 
          className="bg-gray-800 rounded-lg mb-4 overflow-hidden"
        >
          <div className="p-3 flex items-center gap-2">
            <img 
              src={post.author.profilePic} 
              alt="profile" 
              className="w-10 h-10 rounded-full"
            />
            <h3 className="font-semibold text-white">{post.author.username}</h3>
          </div>

          <img 
            src={post.content} 
            alt="post" 
            className="w-full cursor-pointer hover:opacity-90"
            onClick={() => handlePostClick(post._id)}
          />

          <div className="p-3 text-white">
            <div className="flex gap-4 mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleLike(post._id, index)
                }}
                className="py-1.5 px-3 hover:text-green-600 hover:scale-105 flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  ></path>
                </svg>
                <span>{post.localLikesCount}</span>
              </button>

              <span className="py-1.5">💬 {post.comments.length}</span>
            </div>

            <p className="text-sm">
              <span className="font-semibold">{post.author.username}</span> {post.caption}
            </p>
            
            <p className="text-xs text-gray-500 mt-1">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Feed