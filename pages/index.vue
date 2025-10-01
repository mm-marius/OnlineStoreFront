<script>
export default {
  name: 'HomePage',
  
  data() {
    return {
      count: 0
    }
  },
  
  methods: {
    increment() {
      this.count++
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

      <!-- Button Examples -->
      <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-12">
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

