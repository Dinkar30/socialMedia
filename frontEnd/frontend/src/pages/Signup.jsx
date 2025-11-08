import React, { useState } from 'react'
import api from '../utils/api.js'
 

function SignUp () {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [profilePic , setProfilePic] = useState(null)

    const handleClick = async (e) => {
        e.preventDefault()

        try {

            const formData = new FormData()
            formData.append('username', username)
            formData.append('email',email)
            formData.append('password',password)
            if(profilePic) formData.append('profilePic',profilePic)

            const response = await api.post('/users/register',formData , {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            
            console.log('Sign up successful:', response.data)
            alert('Sign up successful!')
            
        } catch (error) {
            console.error(error)
            alert('sign up failed ' + (error.response?.data?.message || error.message))
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
                className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-xl rounded-lg"
            >
                <h2 className="text-3xl font-bold text-center text-white mb-6">Create Account</h2>

                {/* Username Input */}
                <input 
                    type="text"
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={inputClasses}
                /> 
                
                {/* Email Input */}
                <input 
                    type="email"
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClasses}
                />
                
                {/* Password Input */}
                <input 
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputClasses}
                />

                {/* Profile Picture Input (File) */}
                <div>
                    <label htmlFor="profilePic" className="block text-sm font-medium text-gray-400 mb-2">
                        Profile Picture (Optional)
                    </label>
                    <input 
                        id="profilePic"
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                        // Styled file input for dark theme
                        className="w-full text-sm text-gray-300
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-full file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-600 file:text-white
                                   hover:file:bg-blue-700 cursor-pointer"
                    />
                </div>

                {/* Register Button */}
                <button 
                    type='submit'
                    className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                    Register
                </button>
            </form>
        </div>
    )
}


export default SignUp