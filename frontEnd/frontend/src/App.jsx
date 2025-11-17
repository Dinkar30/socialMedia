import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login.jsx'
import SignUp from './pages/Signup.jsx'
import Feed from './pages/feed.jsx'
import CreatePost from './pages/createPost.jsx'
import UserProfile from './pages/userProfile.jsx'
import Post from './components/post.jsx'

function App() { 

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/create-post' element={<CreatePost/>} />
        <Route path='/profile/:username' element={<UserProfile/>}/>
        <Route path='/post/:postId' element={<Post/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
