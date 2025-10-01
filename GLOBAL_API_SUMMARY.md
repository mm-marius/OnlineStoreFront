# ✅ Global API - No Initialization Needed!

## What Changed

The API is now **globally available** in all components as `this.$api`. You don't need to initialize it in `mounted()` anymore!

---

## ❌ Before (Old Way)

```javascript
export default {
  data() {
    return {
      api: null  // Had to store it
    }
  },
  
  mounted() {
    this.api = useApi()  // Had to initialize every time
  },
  
  methods: {
    async fetchProducts() {
      const data = await this.api.get('/products')
    }
  }
}
```

---

## ✅ After (New Way - Simpler!)

```javascript
export default {
  // No api in data!
  // No mounted() needed!
  
  methods: {
    async fetchProducts() {
      // Just use this.$api directly - it's global!
      const data = await this.$api.get('/products')
    }
  }
}
```

---

## Quick Examples

### GET Request
```javascript
async fetchProducts() {
  try {
    const data = await this.$api.get('/products')
    this.products = data
  } catch (error) {
    console.error(error)
  }
}
```

### POST Request
```javascript
async createProduct() {
  try {
    const data = await this.$api.post('/products', {
      name: 'New Product',
      price: 99.99
    })
    console.log('Created:', data)
  } catch (error) {
    console.error(error)
  }
}
```

### PUT Request
```javascript
async updateProduct(id) {
  try {
    const data = await this.$api.put(`/products/${id}`, {
      price: 149.99
    })
    console.log('Updated:', data)
  } catch (error) {
    console.error(error)
  }
}
```

### DELETE Request
```javascript
async deleteProduct(id) {
  try {
    await this.$api.delete(`/products/${id}`)
    console.log('Deleted!')
  } catch (error) {
    console.error(error)
  }
}
```

---

## How It Works

The `plugins/axios.js` file provides `$api` globally to all components:

```javascript
return {
  provide: {
    axios: axiosInstance,  // Full axios instance
    api: api               // Simplified API wrapper
  }
}
```

Now every component automatically has:
- `this.$api` - Simplified wrapper (returns data directly)
- `this.$axios` - Full axios instance (if you need it)

---

## Benefits

✅ **No initialization** - Use immediately in any component  
✅ **Cleaner code** - No need for `mounted()` or data properties  
✅ **Consistent** - Same API available everywhere  
✅ **Easier** - Less boilerplate code  
✅ **Automatic** - Works in all components by default  

---

## See Full Documentation

Check `API_USAGE_EXAMPLES.md` for complete examples and patterns!

