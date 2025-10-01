import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const axiosInstance = axios.create({
    baseURL: config.public.apiBase || 'https://api.example.com',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // You can add auth token here
      // const token = useCookie('token')
      // if (token.value) {
      //   config.headers.Authorization = `Bearer ${token.value}`
      // }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // Handle errors globally
      if (error.response?.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access')
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: axiosInstance
    }
  }
})

