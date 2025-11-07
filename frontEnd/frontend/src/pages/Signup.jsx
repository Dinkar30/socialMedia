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
            
        } catch (error) {
            console.error(error)
            alert('sign up failed ' + error)
        }

    }
    return (
        <form onSubmit={handleClick}>
        <input type="text"
               placeholder='username'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
        /> 
        <input type="email"
               placeholder='email'
               value={email}
                onChange={(e) => setEmail(e.target.value)}
               required
        />
        <input type="password"
               placeholder='password'
               value={password}
                onChange={(e) => setPassword(e.target.value)}
               required
        />
        <input type="file"
               onChange={(e) => setProfilePic(e.target.files[0])}
          />

        <button type='submit'>register</button>
        </form>
    )
}


export default SignUp