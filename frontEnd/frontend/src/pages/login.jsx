import React, { useState } from "react";
import api from "../utils/api.js";

function Login() {
   const [id , setId] = useState('')
   const [password , setPassword] = useState('')

   const handleClick = async (e) => {
    e.preventDefault()

    try {
       const response = await api.post('/users/login', {
        username: id,
        email: id,
        password,
       })
       // response check 
       console.log(response.data)
    
       localStorage.setItem('accessToken', response.data.data.accessToken)
       localStorage.setItem('refreshToken', response.data.data.refreshToken)
       alert('login successful')

    } catch (error) {
        console.error(error)
        alert('login failed'+ error.response?.data?.message )
    }
    
   }

   return (
    <form onSubmit={handleClick}>
    <input type="text"
           value={id}
           placeholder="username/email"
           onChange={(e) => setId(e.target.value)}
    />
    <input type="password"
    value={password}
    placeholder="password"
    onChange={(e) => setPassword(e.target.value)}/>
    
    
    <button type="submit" >Login</button>
    </form>
   )
 }

export default Login