<script>
export default {
  name: 'HomePage',
  
  data() {
    return {
      count: 0,
      products: [],
      loading: false,
      error: null
    }
  },
  
  mounted() {
    // Example: Fetch products on mount
    // Uncomment to test with your real API
    // this.fetchProducts()
  },
  
  methods: {
    increment() {
      this.count++
    },
    
    // Example: Fetch products from API using $fire
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        // Using the global $fire with webservice
        const result = await this.$fire('ws-products-search', {
          params: {
            page: 1,
            limit: 20
          }
        })
        
        if (result.success) {
          this.products = result.data
          console.log('Products fetched:', result.data)
        } else {
          this.error = result.error
        }
      } catch (error) {
        this.error = 'Failed to fetch products'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },
    
    // Example: Create a new product using $fire
    async createProduct() {
      this.loading = true
      this.error = null
      
      try {
        const result = await this.$fire('ws-products-create', {
          data: {
            name: 'Sample Product',
            price: 99.99,
            description: 'This is a sample product'
          }
        })
        
        if (result.success) {
          console.log('Product created:', result.data)
          // Add to products list
          this.products.push(result.data)
        } else {
          this.error = result.error
        }
      } catch (error) {
        this.error = 'Failed to create product'
        console.error('Error creating product:', error)
      } finally {
        this.loading = false
      }
    },
    
    // Example: Update a product using $fire
    async updateProduct(productId) {
      this.loading = true
      this.error = null
      
      try {
        const result = await this.$fire('ws-products-update', {
          id: productId,
          data: {
            name: 'Updated Product Name',
            price: 149.99
          }
        })
        
        if (result.success) {
          console.log('Product updated:', result.data)
          
          // Update in local list
          const index = this.products.findIndex(p => p.id === productId)
          if (index !== -1) {
            this.products[index] = result.data
          }
        } else {
          this.error = result.error
        }
      } catch (error) {
        this.error = 'Failed to update product'
        console.error('Error updating product:', error)
      } finally {
        this.loading = false
      }
    },
    
    // Example: Delete a product using $fire
    async deleteProduct(productId) {
      this.loading = true
      this.error = null
      
      try {
        const result = await this.$fire('ws-products-delete', {
          id: productId
        })
        
        if (result.success) {
          console.log('Product deleted')
          
          // Remove from local list
          this.products = this.products.filter(p => p.id !== productId)
        } else {
          this.error = result.error
        }
      } catch (error) {
        this.error = 'Failed to delete product'
        console.error('Error deleting product:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-3xl font-bold text-primary-600">Store Front</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Welcome Card -->
      <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto text-center mb-8">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Your Online Store! 🛍️
        </h2>
        <p class="text-lg text-gray-600 mb-6">
          Tailwind CSS is installed and ready to use
        </p>
        
        <!-- Counter Demo -->
        <div class="bg-gray-50 rounded-lg p-6 mb-6">
          <p class="text-2xl font-semibold text-gray-700 mb-4">
            Counter: <span class="text-primary-600">{{ count }}</span>
          </p>
          <button class="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors" @click="increment">
            Increment
          </button>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div class="text-primary-600 text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-semibold mb-2">Fast Performance</h3>
          <p class="text-gray-600">Built with Nuxt 3 for optimal speed</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div class="text-primary-600 text-4xl mb-4">🎨</div>
          <h3 class="text-xl font-semibold mb-2">Beautiful Design</h3>
          <p class="text-gray-600">Styled with Tailwind CSS</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div class="text-primary-600 text-4xl mb-4">🛒</div>
          <h3 class="text-xl font-semibold mb-2">E-commerce Ready</h3>
          <p class="text-gray-600">Pinia & Axios configured</p>
        </div>
      </div>

      <!-- API Examples -->
      <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-12">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">API Methods with useApi</h3>
        
        <!-- Error Message -->
        <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {{ error }}
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
          Loading...
        </div>
        
        <!-- API Buttons -->
        <div class="flex flex-wrap gap-4 justify-center mb-6">
          <button 
            class="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            :disabled="loading"
            @click="fetchProducts"
          >
            GET Products
          </button>
          <button 
            class="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            :disabled="loading"
            @click="createProduct"
          >
            POST Create Product
          </button>
          <button 
            class="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50"
            :disabled="loading || products.length === 0"
            @click="updateProduct(products[0]?.id)"
          >
            PUT Update Product
          </button>
          <button 
            class="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            :disabled="loading || products.length === 0"
            @click="deleteProduct(products[0]?.id)"
          >
            DELETE Product
          </button>
        </div>
        
        <!-- Products List -->
        <div v-if="products.length > 0" class="mt-6">
          <h4 class="font-semibold text-gray-900 mb-3">Products ({{ products.length }}):</h4>
          <div class="space-y-2">
            <div 
              v-for="product in products" 
              :key="product.id"
              class="p-3 bg-gray-50 rounded-lg"
            >
              <p class="font-semibold">{{ product.name }}</p>
              <p class="text-sm text-gray-600">Price: ${{ product.price }}</p>
            </div>
          </div>
        </div>
        
        <div v-else-if="!loading" class="mt-6 text-center text-gray-500">
          No products yet. Click "GET Products" to fetch from API.
        </div>
      </div>
      
      <!-- Button Styles -->
      <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Button Styles</h3>
        <div class="flex flex-wrap gap-4 justify-center">
          <button class="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">Primary Button</button>
          <button class="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors">Secondary Button</button>
          <button class="px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">Outline Button</button>
        </div>
      </div>

      <!-- Input Example -->
      <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Form Elements</h3>
        <input 
          type="text" 
          placeholder="Try typing here..." 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p class="text-center text-gray-600">
          Built with Nuxt 3 + Tailwind CSS + Pinia + Axios
        </p>
      </div>
    </footer>
  </div>
</template>

