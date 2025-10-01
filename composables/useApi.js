export const useApi = () => {
  const { $axios } = useNuxtApp()

  const get = async (url, config = {}) => {
    try {
      const response = await $axios.get(url, config)
      return response.data
    } catch (error) {
      console.error('GET request failed:', error)
      throw error
    }
  }

  const post = async (url, data = {}, config = {}) => {
    try {
      const response = await $axios.post(url, data, config)
      return response.data
    } catch (error) {
      console.error('POST request failed:', error)
      throw error
    }
  }

  const put = async (url, data = {}, config = {}) => {
    try {
      const response = await $axios.put(url, data, config)
      return response.data
    } catch (error) {
      console.error('PUT request failed:', error)
      throw error
    }
  }

  const del = async (url, config = {}) => {
    try {
      const response = await $axios.delete(url, config)
      return response.data
    } catch (error) {
      console.error('DELETE request failed:', error)
      throw error
    }
  }

  return {
    get,
    post,
    put,
    delete: del
  }
}

