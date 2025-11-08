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
    <form onSubmit={handleClick}>
      <input type="text"
             placeholder="enter caption"
             value={caption}
             onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file"
             onChange={(e) => setContent(e.target.files[0])}
        />
        <button type="submit">Post</button>
    </form>

  )
}

export default CreatePost