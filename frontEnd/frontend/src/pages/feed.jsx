import React , {useState, useEffect} from "react";
import api from "../utils/api.js";

function Feed () {
    const [posts , setPosts] = useState([])

   useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await api.get('/posts/feed')
            console.log(response.data.data);
            
            setPosts(response.data.data.posts)
            
        } catch (error) {
            console.error(error)
            alert('failed to load posts')
        }
    }
    fetchPosts()
   }, [])
    
   return (
     <>
      {posts.map((post) => (
        <div key={post._id}>
            <h3>{post.author.username}</h3>
            <img src={post.content} alt="" />
            
            <p>{post.caption}</p>
            
        </div>
      ))}
     </>
   )
}

export default Feed