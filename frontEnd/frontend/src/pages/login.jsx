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
       
       console.log('Login successful:', response.data)
       localStorage.setItem('accessToken', response.data.data.accessToken)
       localStorage.setItem('refreshToken', response.data.data.refreshToken)
       alert('Login successful!')

    } catch (error) {
        console.error('Login error:', error)
        alert('Login failed: ' + (error.response?.data?.message || error.message))
    }
    
   }

   // Common Tailwind classes for input fields in dark mode
   const inputClasses = "w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out placeholder-gray-400"

   return (
    // Outer container with a simple dark background
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <form 
            onSubmit={handleClick}
            // Simple dark container styling
            className="w-full max-w-sm p-8 space-y-6 bg-gray-800 shadow-xl rounded-lg" 
        >
            <h2 className="text-3xl font-bold text-center text-white mb-6">Log In</h2>

            {/* Username/Email Input */}
            <input 
                type="text"
                value={id}
                placeholder="Username or Email"
                onChange={(e) => setId(e.target.value)}
                required
                className={inputClasses}
            />

            {/* Password Input */}
            <input 
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClasses}
            />
            
            {/* Login Button */}
            <button 
                type="submit" 
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
                Log In
            </button>
        </form>
    </div>
   )
 }

export default Login