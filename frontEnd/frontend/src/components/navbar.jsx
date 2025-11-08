import React from "react";
import {Link, NavLink , useNavigate} from 'react-router-dom'

function Navbar () {
  const navigate = useNavigate()

  return (
    <>
    <img src="" alt="logo" onClick={() => navigate('/feed')} />
    <button onClick={() => navigate('/create-post')}>Create post</button>
    <img src="" alt="userprofilepic" onClick={() => navigate('/user-profile')}/>
     
    </>
  )
}

export default Navbar