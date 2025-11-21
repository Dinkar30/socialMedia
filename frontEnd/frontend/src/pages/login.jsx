import React, { useState } from "react";
import api from "../utils/api.js";
import {useNavigate } from "react-router-dom";

function Login() {
   const [id , setId] = useState('')
   const [password , setPassword] = useState('')
   const navigate = useNavigate()
   const handleClick = async (e) => {
    e.preventDefault()

    try {
       const response = await api.post('/users/login', {
        username: id,
        email: id, 
        password,
       })
       
       console.log('Login successful:', response.data)
       localStorage.setItem('accessToken', response.data.data.accessToken)
       localStorage.setItem('refreshToken', response.data.data.refreshToken)
       localStorage.setItem('userId',response.data.data.user._id )
       localStorage.setItem('username',response.data.data.user.username)
    //    alert('Login successful!')
       navigate('/feed')

    } catch (error) {
        console.error('Login error:', error)
        alert('Login failed: ' + (error.response?.data?.message || error.message))
    }
    
   }

   const handleSignUp = async () => {
    navigate('/signup')
   }

   const inputClasses = "w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out placeholder-gray-400"

   return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <form 
            onSubmit={handleClick}
            className="w-full max-w-sm p-8 space-y-6 bg-gray-800 shadow-xl rounded-lg" 
        >
            <h2 className="text-3xl font-bold text-center text-white mb-6">Log In</h2>

            <input 
                type="text"
                value={id}
                placeholder="Username or Email"
                onChange={(e) => setId(e.target.value)}
                required
                className={inputClasses}
            />

            <input 
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClasses}
            />
            
            <button 
                type="submit" 
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out cursor-pointer"
                 
            >
                Log In
            </button>
            <p className="py-3 px-4 text-white font-semibold shadow-lg "> got no account</p>
            <button 
                   className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out cursor-pointer"
                   onClick={handleSignUp}>signup</button>
        </form>
    </div>
   )
 }

export default Login