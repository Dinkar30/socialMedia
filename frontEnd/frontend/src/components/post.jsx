import { useEffect, useState } from "react";
import api from "../utils/api.js";
import { useParams } from "react-router-dom";
import Navbar from "./navbar.jsx";


function getRandomNumber() {
  return Math.floor(Math.random() * 17); 
}

function Post() {
    const [post , setPost] = useState(null)
    const {postId} = useParams()
    const [loading, setLoading] = useState(true)
    const [isLiked , setIsliked] = useState(false)
    const[localLikesLength , setLocalLikesLength] = useState(0)
    const handleLikeClick = async () => {
        try {
             await api.post(`/posts/like-post/${postId}`)
             setIsliked(prev => !prev)
             setLocalLikesLength(prev => isLiked? prev-1 : prev+1)
        } catch (error) {
            console.error(error)
            alert(`couldn't like the post`)
        }
    }

const [comment, setComment] = useState('');
    const handleCommentClick = async () => {
        if(!comment.trim()) alert('type something to post comment')
        try {
            const response = await api.post(`/posts/add-comment/${postId}`, {
                text: comment,
            })
            setPost((prev) => ({
                ...prev,
                comments: [...prev.comments, response.data.data.comments.slice(-1)[0]]
            }))
            console.log(response);
            setComment('')
            
        } catch (error) {
            console.error(error + `couldn't load comments`) 
        }
    }
    useEffect(() => {
        if(!postId) return;
        const fetchPosts = async () => {
            try {
                // console.log(postId)
                const response = await api.get(`/posts/get-post/${postId}`)
                console.log(response);
                setPost(response.data.data)
                setLocalLikesLength(response.data.data.likes.length)
                const currentUserId = localStorage.getItem("userId")
                setIsliked(response.data.data.likes.some(u => u._id === currentUserId))
                 
            } catch (error) {
                console.error(error)
                alert('could not load post , try again later')
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    },[postId])

    const loadingQuotes = [
  "meanwhile , why're you so sweet...",
  "Hold on…",
  "Motivation not found...",
  "Loading… because teleportation isn’t ready yet...",
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


    if (!post) {
        return <div className="p-4 text-center">Post not found.</div>
    }

  return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-10 flex justify-center">
        <Navbar/>
  <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
    <div className="p-4 flex items-center space-x-4 border-b border-gray-700">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={post.author.profilePic}
        alt="profilePic author"
      />
      <h3>{post.author.username}</h3>
    </div>

    <div className="w-full max-h-[80vh] overflow-hidden">
      <img
        className="w-full object-cover h-auto"
        src={post.content}
        alt="image posted"
      />
    </div>

    <div className="p-4 space-y-3">
      <div>
        <p className="text-lg mb-2 text-gray-200">
          <span className="font-semibold text-white mr-2">
            {post.author.username}:
          </span>
          {post.caption}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center space-x-4 border-b border-gray-700 pb-3">
        <button
          onClick={handleLikeClick}
          className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
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
          <span>{localLikesLength}</span>
        </button>
<div className="mt-6 border-t border-gray-700 pt-4">
  <h4 className="text-lg font-semibold mb-3">Comments</h4>

  <div className="flex items-center gap-2 mb-4">
    <input
      type="text"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write a comment..."
      className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 outline-none"
    />
    <button
      onClick={handleCommentClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
    >
      Post
    </button>
  </div>

  <div className="space-y-3">
    {post.comments && post.comments.length > 0 ? (
      post.comments.map((c) => (
        <div key={c._id} className="flex items-start gap-3">
          {c.user && (
            <img
              src={c.user.profilePic}
              alt={c.user.username}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <div>
            <p className="text-sm">
              <span className="font-semibold">
                {c.user ? c.user.username : "Unknown User"}:
              </span>{" "}
              {c.text}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-sm">No comments yet.</p>
    )}
  </div>
</div>

      </div>
    </div>
  </div>
</div>

  )
}

export default Post