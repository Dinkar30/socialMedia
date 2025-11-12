import { useEffect, useState } from "react";
import api from "../utils/api.js";
import { useParams } from "react-router-dom";

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


    const handleCommentClick = async () => {
        try {
            
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
                const currentUserId = localStorage.getItem(userId)
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

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }


    if (!post) {
        return <div className="p-4 text-center">Post not found.</div>
    }

  return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-10 flex justify-center">
        <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 flex items-center space-x-4 border-b border-gray-700">
       <img 
       className="w-10 h-10 rounded-full object-cover"
       src={post.author.profilePic} alt="profilePic author" />
       <h3>{post.author.username}</h3>
       </div>
       <div className="w-full max-h-[80vh] overflow-hidden">
        <img className="w-full object-cover h-auto"  src={post.content} alt="image posted" />
        </div>
       
       <div className="p-4 space-y-3">
        <div className="flex items-center space-x-4 border-b border-gray-700 pb-3">
        <button onClick={handleLikeClick}
         class="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
        </svg>
        <span>{localLikesLength}</span>
       </button>

       <button onClick={handleCommentClick} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        💬 {post.comments.length} comments
       </button>
       </div>
       

      <div>
         <p className="text-lg mb-2 text-gray-200">
                            <span className="font-semibold text-white mr-2">{post.author.username}:</span>
                            {post.caption}
                        </p>
        <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
       </div>
       </div>
      </div>
  )
}

export default Post