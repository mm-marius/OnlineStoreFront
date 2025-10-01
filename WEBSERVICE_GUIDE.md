# Webservice Architecture Guide

## Overview

The webservice architecture provides a clean, event-driven way to organize API calls. Instead of calling `this.$api` directly, you use `this.$fire('event-name', params)` which maps to organized service methods.

---

## 🏗️ Architecture

```
webservice/
├── ws.products.js       # Product-related API calls
├── ws.crm.js           # CRM-related API calls
└── ws.*.js             # Add more service files as needed

plugins/
└── webservice.js       # Plugin with event registry and $fire method
```

---

## ✅ How It Works

### 1. Service Files Define API Methods

Each `ws.*.js` file exports an object with named methods:

```javascript
// webservice/ws.products.js
export default {
  'ws-products-search': async (api, params = {}) => {
    try {
      const response = await api.get('/products')
      return { success: true, data: response }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
```

### 2. Plugin Registers All Methods

The `plugins/webservice.js` automatically registers all methods from `ws.*.js` files:

```javascript
// Automatically loads all ws.*.js files
const services = import.meta.glob('@/webservice/ws.*.js', { eager: true })
```

### 3. Plugin Makes $fire Global

The `webservice.js` plugin provides `this.$fire` to all components:

```javascript
// Now available everywhere:
this.$fire('ws-products-search', { params: { page: 1 } })
```

---

## 🚀 Usage in Components

### Basic Usage

```javascript
export default {
  data() {
    return {
      products: [],
      loading: false,
      error: null
    }
  },
  
  methods: {
    async loadProducts() {
      this.loading = true
      
      const result = await this.$fire('ws-products-search', {
        params: {
          page: 1,
          limit: 20
        }
      })
      
      if (result.success) {
        this.products = result.data
      } else {
        this.error = result.error
      }
      
      this.loading = false
    }
  }
}
```

### With Search Parameters

```javascript
async searchProducts(searchQuery) {
  const result = await this.$fire('ws-products-search', {
    params: {
      search: searchQuery,
      category: 'electronics',
      minPrice: 100,
      maxPrice: 500
    }
  })
  
  if (result.success) {
    this.products = result.data
  }
}
```

### Create/Update/Delete

```javascript
methods: {
  // Create
  async createProduct() {
    const result = await this.$fire('ws-products-create', {
      data: {
        name: 'New Product',
        price: 99.99,
        description: 'Product description'
      }
    })
    
    if (result.success) {
      console.log('Created:', result.data)
    }
  },
  
  // Update
  async updateProduct(id) {
    const result = await this.$fire('ws-products-update', {
      id: id,
      data: {
        price: 149.99
      }
    })
    
    if (result.success) {
      console.log('Updated:', result.data)
    }
  },
  
  // Delete
  async deleteProduct(id) {
    const result = await this.$fire('ws-products-delete', {
      id: id
    })
    
    if (result.success) {
      console.log('Deleted successfully')
    }
  }
}
```

---

## 📝 Creating New Service Files

### Step 1: Create Service File

Create a new file in `webservice/` folder with pattern `ws.*.js`:

```javascript
// webservice/ws.orders.js
export default {
  'ws-orders-search': async (api, params = {}) => {
    try {
      const queryString = new URLSearchParams(params.params || {}).toString()
      const response = await api.get(`/orders?${queryString}`)
      
      return { 
        success: true, 
        data: response 
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch orders'
      }
    }
  },

  'ws-orders-get': async (api, params = {}) => {
    try {
      if (!params.id) {
        return { success: false, error: 'Order ID is required' }
      }

      const response = await api.get(`/orders/${params.id}`)
      
      return { 
        success: true, 
        data: response 
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get order'
      }
    }
  },

  'ws-orders-create': async (api, params = {}) => {
    try {
      const response = await api.post('/orders', params.data)
      
      // Dispatch custom event
      window.dispatchEvent(
        new CustomEvent('order-created', {
          detail: { data: response }
        })
      )
      
      return { 
        success: true, 
        data: response 
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create order'
      }
    }
  }
}
```

### Step 2: Use in Components

```javascript
// No additional setup needed! Just use it:
const result = await this.$fire('ws-orders-search', {
  params: {
    status: 'pending',
    customer_id: 123
  }
})
```

---

## 🎯 Available Service Methods

### Products Service (`ws.products.js`)

| Method | Parameters | Description |
|--------|-----------|-------------|
| `ws-products-search` | `{ params: {} }` | Search/list products |
| `ws-products-get` | `{ id: number }` | Get single product |
| `ws-products-create` | `{ data: {} }` | Create new product |
| `ws-products-update` | `{ id, data: {} }` | Update product |
| `ws-products-delete` | `{ id: number }` | Delete product |
| `ws-products-by-category` | `{ category, additionalParams }` | Get products by category |

### CRM Service (`ws.crm.js`)

| Method | Parameters | Description |
|--------|-----------|-------------|
| `ws-crm-search` | `{ method, params: {} }` | CRM search |
| `ws-crm-get-customer` | `{ id: number }` | Get customer |
| `ws-crm-create-customer` | `{ data: {} }` | Create customer |
| `ws-crm-update-customer` | `{ id, data: {} }` | Update customer |

---

## 🔔 Custom Events

Service methods can dispatch custom DOM events that components can listen to:

### Dispatching Events

```javascript
// In service method:
window.dispatchEvent(
  new CustomEvent('product-created', {
    detail: { data: response }
  })
)
```

### Listening to Events

```javascript
export default {
  mounted() {
    // Listen for product created events
    window.addEventListener('product-created', this.handleProductCreated)
  },
  
  beforeUnmount() {
    // Clean up
    window.removeEventListener('product-created', this.handleProductCreated)
  },
  
  methods: {
    handleProductCreated(event) {
      console.log('New product:', event.detail.data)
      // Update UI, show notification, etc.
    }
  }
}
```

---

## 🎨 Response Format

All webservice methods return a consistent response format:

### Success Response
```javascript
{
  success: true,
  data: { /* response data */ }
}
```

### Error Response
```javascript
{
  success: false,
  error: 'Error message here'
}
```

### Usage Pattern
```javascript
const result = await this.$fire('ws-products-search', params)

if (result.success) {
  // Handle success
  this.products = result.data
} else {
  // Handle error
  this.error = result.error
}
```

---

## 🔧 Advanced Patterns

### Loading State Management

```javascript
data() {
  return {
    loading: false,
    products: []
  }
},

methods: {
  async loadProducts() {
    this.loading = true
    
    try {
      const result = await this.$fire('ws-products-search')
      
      if (result.success) {
        this.products = result.data
      }
    } finally {
      this.loading = false
    }
  }
}
```

### Reusable API Call Wrapper

```javascript
methods: {
  async apiCall(eventName, params = {}) {
    this.loading = true
    this.error = null
    
    try {
      const result = await this.$fire(eventName, params)
      
      if (result.success) {
        return result.data
      } else {
        this.error = result.error
        return null
      }
    } catch (error) {
      this.error = 'Network error'
      return null
    } finally {
      this.loading = false
    }
  },
  
  async loadProducts() {
    const data = await this.apiCall('ws-products-search', {
      params: { page: 1 }
    })
    
    if (data) {
      this.products = data
    }
  }
}
```

### With Pinia Store

```javascript
// stores/products.js
export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      // Access $fire through nuxtApp
      const { $fire } = useNuxtApp()
      
      const result = await $fire('ws-products-search')
      
      if (result.success) {
        this.products = result.data
      } else {
        this.error = result.error
      }
      
      this.loading = false
    }
  }
})
```

---

## 📚 Benefits

✅ **Organized** - All API calls in dedicated service files  
✅ **Consistent** - Standard response format everywhere  
✅ **Reusable** - Service methods can be called from anywhere  
✅ **Event-driven** - Custom events for real-time updates  
✅ **Error handling** - Built-in error handling pattern  
✅ **Type-safe** - Easy to document and understand  
✅ **Testable** - Service methods are easy to test  

---

## 🎯 Best Practices

1. **Name conventions**: Use `ws-{module}-{action}` pattern
   - `ws-products-search`
   - `ws-orders-create`
   - `ws-crm-update-customer`

2. **Always return consistent format**: `{ success: boolean, data/error }`

3. **Validate parameters** before making API calls

4. **Dispatch events** for important actions (create, update, delete)

5. **Handle errors** gracefully with meaningful messages

6. **Group related methods** in the same service file

7. **Document parameters** in comments

---

## 🔄 Migration from Direct API Calls

### Before
```javascript
async fetchProducts() {
  const data = await this.$api.get('/products')
  this.products = data
}
```

### After
```javascript
async fetchProducts() {
  const result = await this.$fire('ws-products-search')
  
  if (result.success) {
    this.products = result.data
  } else {
    this.error = result.error
  }
}
```

---

## 🚀 Getting Started

1. Service files are already created in `webservice/`
2. Plugin is already registered
3. Just use `this.$fire('event-name', params)` in any component!

Check `pages/index.vue` for working examples.

