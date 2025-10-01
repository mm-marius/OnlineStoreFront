/**
 * Products Webservice
 * All product-related API calls
 */

export default {
  /**
   * Search/Get all products
   */
  'ws-products-search': async (api, params = {}) => {
    try {
      const queryString = new URLSearchParams(params.params || {}).toString()
      const url = queryString ? `/products?${queryString}` : '/products'
      
      const response = await api.get(url)
      
      return { 
        success: true, 
        data: response 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to search products'
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  },

  /**
   * Get a single product by ID
   */
  'ws-products-get': async (api, params = {}) => {
    try {
      if (!params.id) {
        return { 
          success: false, 
          error: 'Product ID is required' 
        }
      }

      const response = await api.get(`/products/${params.id}`)
      
      return { 
        success: true, 
        data: response 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to get product'
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  },

  /**
   * Create a new product
   */
  'ws-products-create': async (api, params = {}) => {
    try {
      if (!params.data) {
        return { 
          success: false, 
          error: 'Product data is required' 
        }
      }

      const response = await api.post('/products', params.data)
      
      // Dispatch event for components to listen
      window.dispatchEvent(
        new CustomEvent('product-created', {
          detail: { data: response }
        })
      )
      
      return { 
        success: true, 
        data: response 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create product'
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  },

  /**
   * Update a product
   */
  'ws-products-update': async (api, params = {}) => {
    try {
      if (!params.id) {
        return { 
          success: false, 
          error: 'Product ID is required' 
        }
      }

      if (!params.data) {
        return { 
          success: false, 
          error: 'Product data is required' 
        }
      }

      const response = await api.put(`/products/${params.id}`, params.data)
      
      // Dispatch event for components to listen
      window.dispatchEvent(
        new CustomEvent('product-updated', {
          detail: { data: response }
        })
      )
      
      return { 
        success: true, 
        data: response 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update product'
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  },

  /**
   * Delete a product
   */
  'ws-products-delete': async (api, params = {}) => {
    try {
      if (!params.id) {
        return { 
          success: false, 
          error: 'Product ID is required' 
        }
      }

      await api.delete(`/products/${params.id}`)
      
      // Dispatch event for components to listen
      window.dispatchEvent(
        new CustomEvent('product-deleted', {
          detail: { id: params.id }
        })
      )
      
      return { 
        success: true, 
        message: 'Product deleted successfully' 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete product'
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  },

  /**
   * Search products by category
   */
  'ws-products-by-category': async (api, params = {}) => {
    try {
      if (!params.category) {
        return { 
          success: false, 
          error: 'Category is required' 
        }
      }

      const queryParams = new URLSearchParams({
        category: params.category,
        ...params.additionalParams
      }).toString()
      
      const response = await api.get(`/products?${queryParams}`)
      
      return { 
        success: true, 
        data: response 
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to get products by category'
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  }
}

