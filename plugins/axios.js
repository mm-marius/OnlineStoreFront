import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const axiosInstance = axios.create({
    baseURL: config.public.apiBase || 'https://api.example.com',
    // timeout: 10000,
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

  // Create API wrapper that returns data directly
  const api = {
    async get(url, config = {}) {
      try {
        const response = await axiosInstance.get(url, config)
        return response.data
      } catch (error) {
        console.error('GET request failed:', error)
        throw error
      }
    },

    async post(url, data = {}, config = {}) {
      try {
        const response = await axiosInstance.post(url, data, config)
        return response.data
      } catch (error) {
        console.error('POST request failed:', error)
        throw error
      }
    },

    async put(url, data = {}, config = {}) {
      try {
        const response = await axiosInstance.put(url, data, config)
        return response.data
      } catch (error) {
        console.error('PUT request failed:', error)
        throw error
      }
    },

    async delete(url, config = {}) {
      try {
        const response = await axiosInstance.delete(url, config)
        return response.data
      } catch (error) {
        console.error('DELETE request failed:', error)
        throw error
      }
    }
  }

  return {
    provide: {
      axios: axiosInstance,
      api: api
    }
  }
})

