import React, {  useState } from "react";
import api from "../utils/api.js";


function CreatePost () {
    const [caption , setCaption] = useState('')
    const [content,  setContent] = useState(null)

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('content',content)
            formData.append('caption',caption)

            const response = await api.post('/posts/create-post', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            alert('post created successfully')
            setCaption('')
            setContent(null)
        } catch (error) {
            console.error(error)
            alert('couldnot create post')
        }
    }

  return (
    <div className="bg-gray-900 min-h-screen w-full">
    <form 
      onSubmit={handleClick} 
      className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col gap-4"
    >
      <input 
        type="text"
        placeholder="enter caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-600"
      />

      <input 
        type="file"
        onChange={(e) => setContent(e.target.files[0])}
        className="w-full p-3 rounded-lg bg-gray-800 text-white file:bg-gray-700 file:text-white file:border-none file:px-3 file:py-2"
      />

      <button 
        type="submit"
        className="w-full p-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 hover:scale-[1.02] transition"
      >
        Post
      </button>
    </form>
    </div>

  )
}

export default CreatePost