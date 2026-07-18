import axios from 'axios'

const api = axios.create({
    baseURL: 'https://gatewayconsole.duckdns.org/social',
    withCredentials: true,
    headers: {
        'X-API-KEY': import.meta.env.VITE_API_KEY
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default api 