# Pinia & Axios Setup Guide (Options API)

## Installation Complete ✅

The following packages have been installed:
- **Pinia** - State management
- **@pinia/nuxt** - Nuxt module for Pinia
- **Axios** - HTTP client

## File Structure

```
├── stores/
│   └── example.js          # Example Pinia store
├── plugins/
│   └── axios.js            # Axios plugin with interceptors
├── composables/
│   └── useApi.js           # API composable wrapper
└── nuxt.config.ts          # Nuxt configuration
```

## Configuration

### API Base URL
Update the API base URL in `nuxt.config.ts` or set the environment variable:

```bash
# .env file
NUXT_PUBLIC_API_BASE=http://localhost:8000/api
```

## Usage Examples (Options API)

### 1. Using Pinia Store

```vue
<!-- In any component or page -->
<script>
import { mapState, mapActions } from 'pinia'
import { useExampleStore } from '~/stores/example'

export default {
  computed: {
    // Map store state and getters
    ...mapState(useExampleStore, ['counter', 'name', 'doubleCount'])
  },
  
  methods: {
    // Map store actions
    ...mapActions(useExampleStore, ['increment', 'decrement', 'updateName']),
    
    handleUpdateName() {
      this.updateName('New Name')
    }
  },
  
  mounted() {
    console.log('Counter:', this.counter)
    console.log('Double:', this.doubleCount)
  }
}
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <p>Counter: {{ counter }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="handleUpdateName">Update Name</button>
  </div>
</template>
```

### Alternative: Direct Store Access

```vue
<script>
import { useExampleStore } from '~/stores/example'

export default {
  data() {
    return {
      store: null
    }
  },
  
  computed: {
    counter() {
      return this.store?.counter || 0
    },
    doubleCount() {
      return this.store?.doubleCount || 0
    },
    storeName() {
      return this.store?.name || ''
    }
  },
  
  methods: {
    increment() {
      this.store.increment()
    },
    
    updateName() {
      this.store.updateName('New Name')
    }
  },
  
  mounted() {
    this.store = useExampleStore()
  }
}
</script>

<template>
  <div>
    <h1>{{ storeName }}</h1>
    <p>Counter: {{ counter }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="updateName">Update Name</button>
  </div>
</template>
```

### 2. Using Axios Directly

```vue
<script>
export default {
  data() {
    return {
      users: [],
      loading: false
    }
  },
  
  methods: {
    async fetchData() {
      this.loading = true
      try {
        const response = await this.$axios.get('/users')
        this.users = response.data
        console.log('Users:', response.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    },
    
    async createUser() {
      try {
        const response = await this.$axios.post('/users', {
          name: 'John Doe',
          email: 'john@example.com'
        })
        console.log('User created:', response.data)
        this.users.push(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  },
  
  mounted() {
    this.fetchData()
  }
}
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
    <button @click="createUser">Create User</button>
  </div>
</template>
```

### 3. Using the API Composable in Options API

```vue
<script>
export default {
  data() {
    return {
      api: null,
      users: [],
      loading: false
    }
  },
  
  methods: {
    async fetchUsers() {
      this.loading = true
      try {
        const data = await this.api.get('/users')
        this.users = data
        console.log('Users:', data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    },
    
    async createUser() {
      try {
        const data = await this.api.post('/users', {
          name: 'John Doe',
          email: 'john@example.com'
        })
        console.log('User created:', data)
        this.users.push(data)
      } catch (error) {
        console.error('Error:', error)
      }
    },
    
    async updateUser(id) {
      try {
        const data = await this.api.put(`/users/${id}`, {
          name: 'Jane Doe'
        })
        console.log('User updated:', data)
        // Update in local array
        const index = this.users.findIndex(u => u.id === id)
        if (index !== -1) {
          this.users[index] = data
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    
    async deleteUser(id) {
      try {
        await this.api.delete(`/users/${id}`)
        console.log('User deleted')
        // Remove from local array
        this.users = this.users.filter(u => u.id !== id)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  },
  
  mounted() {
    this.api = useApi()
    this.fetchUsers()
  }
}
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }}
          <button @click="updateUser(user.id)">Update</button>
          <button @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
    </div>
    <button @click="createUser">Create User</button>
  </div>
</template>
```

### 4. Creating a New Store (Options API Compatible)

Create a new file in `stores/` directory:

```javascript
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false
  }),
  
  getters: {
    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName} ${state.user.lastName}`
    },
    
    isLoggedIn: (state) => state.isAuthenticated
  },
  
  actions: {
    setUser(userData) {
      this.user = userData
      this.isAuthenticated = true
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
    
    async fetchUser() {
      this.loading = true
      const api = useApi()
      try {
        const data = await api.get('/user/profile')
        this.setUser(data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        this.loading = false
      }
    },
    
    async login(credentials) {
      this.loading = true
      const api = useApi()
      try {
        const data = await api.post('/auth/login', credentials)
        this.setUser(data.user)
        // Store token
        const token = useCookie('token')
        token.value = data.token
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      } finally {
        this.loading = false
      }
    }
  }
})
```

### 5. Using Store in Component (Options API)

```vue
<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '~/stores/user'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  
  computed: {
    ...mapState(useUserStore, ['user', 'isAuthenticated', 'fullName', 'loading'])
  },
  
  methods: {
    ...mapActions(useUserStore, ['login', 'logout', 'fetchUser']),
    
    async handleLogin() {
      const success = await this.login({
        email: this.email,
        password: this.password
      })
      
      if (success) {
        this.$router.push('/account')
      }
    }
  },
  
  mounted() {
    if (this.isAuthenticated) {
      this.fetchUser()
    }
  }
}
</script>

<template>
  <div>
    <div v-if="isAuthenticated">
      <h1>Welcome, {{ fullName }}</h1>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="handleLogin" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
    </div>
  </div>
</template>
```

### 6. Adding Authentication Token

The axios plugin is already set up with interceptors. To add authentication:

```javascript
// Uncomment and modify the request interceptor in plugins/axios.js
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useCookie('token')
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
```

### 7. Complete Example: Product Page

```vue
<script>
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '~/stores/cart'

export default {
  data() {
    return {
      product: null,
      loading: false,
      quantity: 1
    }
  },
  
  computed: {
    ...mapState(useCartStore, ['items']),
    
    productId() {
      return this.$route.params.id
    },
    
    totalPrice() {
      if (!this.product) return 0
      return this.product.price * this.quantity
    }
  },
  
  methods: {
    ...mapActions(useCartStore, ['addItem']),
    
    async fetchProduct() {
      this.loading = true
      try {
        const response = await this.$axios.get(`/products/${this.productId}`)
        this.product = response.data
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        this.loading = false
      }
    },
    
    handleAddToCart() {
      this.addItem({
        ...this.product,
        quantity: this.quantity
      })
      alert('Added to cart!')
    },
    
    increaseQuantity() {
      this.quantity++
    },
    
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    }
  },
  
  mounted() {
    this.fetchProduct()
  },
  
  watch: {
    '$route.params.id'(newId) {
      this.fetchProduct()
    }
  }
}
</script>

<template>
  <div>
    <div v-if="loading">Loading product...</div>
    <div v-else-if="product">
      <h1>{{ product.name }}</h1>
      <img :src="product.image" :alt="product.name" />
      <p>{{ product.description }}</p>
      <p class="price">${{ product.price }}</p>
      
      <div class="quantity">
        <button @click="decreaseQuantity">-</button>
        <span>{{ quantity }}</span>
        <button @click="increaseQuantity">+</button>
      </div>
      
      <p>Total: ${{ totalPrice }}</p>
      <button @click="handleAddToCart">Add to Cart</button>
    </div>
    <div v-else>
      Product not found
    </div>
  </div>
</template>
```

## Running the App

```bash
npm run dev
```

Your app will be available at http://localhost:3000

## Key Differences: Composition vs Options API

### Composition API (setup):
```javascript
<script setup>
const count = ref(0)
const increment = () => count.value++
</script>
```

### Options API:
```javascript
<script>
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() { this.count++ }
  }
}
</script>
```

## Next Steps

1. Update the `NUXT_PUBLIC_API_BASE` environment variable
2. Create your own stores in the `stores/` directory
3. Customize the axios interceptors in `plugins/axios.js`
4. Start building your components with Options API!
