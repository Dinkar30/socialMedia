import React, { useState } from 'react'
import api from '../utils/api.js'
import { useNavigate } from 'react-router-dom'

function SignUp () {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [profilePic , setProfilePic] = useState(null)
    const navigate = useNavigate()

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


    const handleSubmit = async () => {
        navigate('/login')
    }
    
    const inputClasses = "w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out placeholder-gray-400"
    
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <form 
                onSubmit={handleClick}
                className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-xl rounded-lg"
            >
                <h2 className="text-3xl font-bold text-center text-white mb-6">Create Account</h2>

                <input 
                    type="text"
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={inputClasses}
                /> 
                
                <input 
                    type="email"
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClasses}
                />
                <input 
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputClasses}
                />
                <div>
                    <label htmlFor="profilePic" className="block text-sm font-medium text-gray-400 mb-2">
                        Profile Picture (Optional)
                    </label>
                    <input 
                        id="profilePic"
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                        className="w-full text-sm text-gray-300
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-full file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-600 file:text-white
                                   hover:file:bg-blue-700 cursor-pointer"
                    />
                </div>
                <button 
                    type='submit'
                    className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </form>
        </div>
    )
}


export default SignUp