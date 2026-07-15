import axios from 'axios'

const api = axios.create({
    baseURL: 'http://16.192.94.81/social',
    withCredentials: true,
    headers: {
        'X-API-KEY': import.meta.env.API_KEY
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default api 