# API Usage Examples - Global $api

## Overview

The `$api` is globally available in all components via the axios plugin. You don't need to initialize it - just use `this.$api` directly!

---

## ✅ Global Access - No Setup Needed!

The API is automatically available as `this.$api` in all components:

```javascript
export default {
  methods: {
    async fetchData() {
      // Just use this.$api directly - no initialization needed!
      const data = await this.$api.get('/products')
      console.log(data)
    }
  }
}
```

---

## GET Requests

### Fetch All Items

```javascript
async fetchProducts() {
  this.loading = true
  this.error = null
  
  try {
    const data = await this.$api.get('/products')
    this.products = data
    console.log('Products:', data)
  } catch (error) {
    this.error = 'Failed to fetch products'
    console.error(error)
  } finally {
    this.loading = false
  }
}
```

### Fetch Single Item

```javascript
async fetchProduct(productId) {
  try {
    const data = await this.$api.get(`/products/${productId}`)
    this.product = data
  } catch (error) {
    this.error = 'Product not found'
  }
}
```

### GET with Query Parameters

```javascript
async searchProducts(query) {
  try {
    // Query params will be appended: /products?search=laptop&category=electronics
    const data = await this.$api.get('/products', {
      params: {
        search: query,
        category: 'electronics',
        page: 1,
        limit: 20
      }
    })
    this.products = data
  } catch (error) {
    console.error('Search failed:', error)
  }
}
```

---

## POST Requests

### Create New Item

```javascript
async createProduct(productData) {
  this.loading = true
  
  try {
    const newProduct = {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      category: productData.category
    }
    
    const data = await this.$api.post('/products', newProduct)
    console.log('Product created:', data)
    
    // Add to local list
    this.products.push(data)
    
    return data
  } catch (error) {
    this.error = 'Failed to create product'
    throw error
  } finally {
    this.loading = false
  }
}
```

### Submit Form Data

```javascript
async submitOrder(orderData) {
  try {
    const data = await this.$api.post('/orders', {
      items: orderData.items,
      shipping_address: orderData.address,
      payment_method: orderData.payment,
      total: orderData.total
    })
    
    console.log('Order created:', data.order_id)
    return data
  } catch (error) {
    this.error = 'Order submission failed'
    throw error
  }
}
```

---

## PUT Requests

### Update Existing Item

```javascript
async updateProduct(productId, updatedData) {
  this.loading = true
  
  try {
    const data = await this.$api.put(`/products/${productId}`, updatedData)
    console.log('Product updated:', data)
    
    // Update in local list
    const index = this.products.findIndex(p => p.id === productId)
    if (index !== -1) {
      this.products[index] = data
    }
    
    return data
  } catch (error) {
    this.error = 'Failed to update product'
  } finally {
    this.loading = false
  }
}
```

### Partial Update

```javascript
async updatePrice(productId, newPrice) {
  try {
    const data = await this.$api.put(`/products/${productId}`, {
      price: newPrice
    })
    return data
  } catch (error) {
    console.error('Failed to update price:', error)
  }
}
```

---

## DELETE Requests

### Delete Item

```javascript
async deleteProduct(productId) {
  this.loading = true
  
  try {
    await this.$api.delete(`/products/${productId}`)
    console.log('Product deleted')
    
    // Remove from local list
    this.products = this.products.filter(p => p.id !== productId)
  } catch (error) {
    this.error = 'Failed to delete product'
  } finally {
    this.loading = false
  }
}
```

---

## Complete Component Example

```vue
<script>
export default {
  name: 'ProductsPage',
  
  data() {
    return {
      products: [],
      selectedProduct: null,
      loading: false,
      error: null,
      
      // Form data
      form: {
        name: '',
        price: 0,
        description: ''
      }
    }
  },
  
  methods: {
    // GET - Fetch all products
    async loadProducts() {
      this.loading = true
      this.error = null
      
      try {
        // Use this.$api directly - no setup needed!
        const data = await this.$api.get('/products')
        this.products = data
      } catch (error) {
        this.error = 'Failed to load products'
      } finally {
        this.loading = false
      }
    },
    
    // GET - Fetch single product
    async loadProduct(id) {
      this.loading = true
      
      try {
        const data = await this.$api.get(`/products/${id}`)
        this.selectedProduct = data
      } catch (error) {
        this.error = 'Product not found'
      } finally {
        this.loading = false
      }
    },
    
    // POST - Create product
    async createProduct() {
      if (!this.form.name || !this.form.price) {
        this.error = 'Name and price are required'
        return
      }
      
      this.loading = true
      
      try {
        const data = await this.$api.post('/products', this.form)
        this.products.push(data)
        
        // Reset form
        this.form = { name: '', price: 0, description: '' }
        this.error = null
      } catch (error) {
        this.error = 'Failed to create product'
      } finally {
        this.loading = false
      }
    },
    
    // PUT - Update product
    async updateProduct(id) {
      this.loading = true
      
      try {
        const data = await this.$api.put(`/products/${id}`, this.form)
        
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products[index] = data
        }
        
        this.selectedProduct = null
      } catch (error) {
        this.error = 'Failed to update product'
      } finally {
        this.loading = false
      }
    },
    
    // DELETE - Delete product
    async deleteProduct(id) {
      if (!confirm('Are you sure?')) return
      
      this.loading = true
      
      try {
        await this.$api.delete(`/products/${id}`)
        this.products = this.products.filter(p => p.id !== id)
      } catch (error) {
        this.error = 'Failed to delete product'
      } finally {
        this.loading = false
      }
    }
  },
  
  mounted() {
    // Load products on mount
    this.loadProducts()
  }
}
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Products</h1>
    
    <!-- Error Message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      Loading...
    </div>
    
    <!-- Create Form -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-bold mb-4">Create Product</h2>
      <div class="grid grid-cols-1 gap-4">
        <input 
          v-model="form.name" 
          type="text" 
          placeholder="Product Name"
          class="border rounded px-4 py-2"
        >
        <input 
          v-model.number="form.price" 
          type="number" 
          placeholder="Price"
          class="border rounded px-4 py-2"
        >
        <textarea 
          v-model="form.description" 
          placeholder="Description"
          class="border rounded px-4 py-2"
        ></textarea>
        <button 
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          :disabled="loading"
          @click="createProduct"
        >
          Create Product
        </button>
      </div>
    </div>
    
    <!-- Products List -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        v-for="product in products" 
        :key="product.id"
        class="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        <p class="text-2xl font-bold text-blue-600 mb-4">${{ product.price }}</p>
        
        <div class="flex gap-2">
          <button 
            class="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            @click="loadProduct(product.id)"
          >
            Edit
          </button>
          <button 
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            @click="deleteProduct(product.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```

---

## Key Differences

### ❌ Old Way (useApi composable):
```javascript
export default {
  data() {
    return {
      api: null
    }
  },
  
  mounted() {
    this.api = useApi()  // Had to initialize
  },
  
  methods: {
    async fetchData() {
      const data = await this.api.get('/products')
    }
  }
}
```

### ✅ New Way (Global $api):
```javascript
export default {
  // No data or mounted needed!
  
  methods: {
    async fetchData() {
      const data = await this.$api.get('/products')  // Just use it!
    }
  }
}
```

---

## Advanced Usage

### Using Axios Directly

If you need the full axios response (headers, status, etc.), use `this.$axios`:

```javascript
async fetchProductWithHeaders() {
  try {
    const response = await this.$axios.get('/products')
    console.log('Status:', response.status)
    console.log('Headers:', response.headers)
    console.log('Data:', response.data)
  } catch (error) {
    console.error(error)
  }
}
```

### With Custom Headers

```javascript
async uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  
  try {
    const data = await this.$axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    return data.data // Note: axios returns response.data
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
```

### With Authentication Token

The axios interceptor automatically handles this if you have a token cookie:

```javascript
// plugins/axios.js already handles this
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useCookie('token')
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  }
)
```

---

## Error Handling Patterns

### Global Error Handler

```javascript
methods: {
  async apiCall(promise) {
    this.loading = true
    this.error = null
    
    try {
      const data = await promise
      return data
    } catch (error) {
      if (error.response) {
        // Server responded with error
        switch (error.response.status) {
          case 401:
            this.error = 'Unauthorized. Please login.'
            break
          case 404:
            this.error = 'Resource not found'
            break
          case 500:
            this.error = 'Server error. Please try again later.'
            break
          default:
            this.error = error.response.data.message || 'An error occurred'
        }
      } else {
        this.error = 'Network error. Check your connection.'
      }
      throw error
    } finally {
      this.loading = false
    }
  },
  
  async loadProducts() {
    await this.apiCall(this.$api.get('/products'))
      .then(data => {
        this.products = data
      })
  }
}
```

---

## API Base URL Configuration

The API base URL is configured in `nuxt.config.ts`:

```javascript
runtimeConfig: {
  public: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
  }
}
```

Update via `.env` file:
```bash
NUXT_PUBLIC_API_BASE=https://your-api.com/api
```

---

## Available Global Properties

- **`this.$api`** - Simplified API wrapper (returns data directly)
  - `this.$api.get(url, config)`
  - `this.$api.post(url, data, config)`
  - `this.$api.put(url, data, config)`
  - `this.$api.delete(url, config)`

- **`this.$axios`** - Full axios instance (returns full response)
  - Access to all axios methods
  - Full response object with status, headers, etc.

---

## Tips & Best Practices

1. ✅ **Use `this.$api`** for simple requests (recommended)
2. ✅ **Use `this.$axios`** when you need full response details
3. ✅ **Always handle errors** with try-catch blocks
4. ✅ **Show loading states** for better UX
5. ✅ **Update local state** after API calls
6. ✅ **Validate data** before sending
7. ✅ **No initialization needed** - `this.$api` is always available!

---

## Testing API Calls

Visit the homepage and click the colored buttons:
- 🟢 **GET Products** - Fetch data
- 🔵 **POST Create Product** - Create new item
- 🟡 **PUT Update Product** - Update existing item
- 🔴 **DELETE Product** - Delete item

Check the browser console for logs and responses!
