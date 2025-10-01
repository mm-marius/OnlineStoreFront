# Tailwind CSS Setup Guide

## ✅ Installation Complete

Tailwind CSS has been successfully installed and configured!

### Installed Packages:
- `@nuxtjs/tailwindcss` - Nuxt Tailwind module

### Configuration Files:
- `tailwind.config.js` - Tailwind configuration
- `assets/css/main.css` - Main CSS with Tailwind directives
- `nuxt.config.ts` - Updated with Tailwind module

---

## 🎨 Using Tailwind CSS

### Basic Utility Classes

```vue
<template>
  <!-- Text Styling -->
  <h1 class="text-3xl font-bold text-blue-600">Title</h1>
  <p class="text-lg text-gray-600">Paragraph</p>
  
  <!-- Spacing -->
  <div class="p-4 m-8">Padding and Margin</div>
  <div class="mt-4 mb-6 px-8 py-4">Specific spacing</div>
  
  <!-- Colors -->
  <div class="bg-blue-500 text-white">Blue background</div>
  <div class="bg-primary-600 text-white">Primary color</div>
  
  <!-- Flexbox -->
  <div class="flex items-center justify-between">
    <span>Left</span>
    <span>Right</span>
  </div>
  
  <!-- Grid -->
  <div class="grid grid-cols-3 gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
  
  <!-- Responsive -->
  <div class="w-full md:w-1/2 lg:w-1/3">
    Responsive width
  </div>
  
  <!-- Hover & States -->
  <button class="bg-blue-500 hover:bg-blue-700 transition-colors">
    Hover me
  </button>
</template>
```

---

## 🎯 Custom Components (Pre-configured)

### Buttons

```vue
<template>
  <!-- Primary Button -->
  <button class="btn btn-primary">Click Me</button>
  
  <!-- Secondary Button -->
  <button class="btn btn-secondary">Secondary</button>
  
  <!-- Outline Button -->
  <button class="btn btn-outline">Outline</button>
  
  <!-- Custom Button -->
  <button class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
    Custom
  </button>
</template>
```

### Input Fields

```vue
<template>
  <!-- Using pre-configured class -->
  <input type="text" class="input" placeholder="Enter text..." />
  
  <!-- Custom input -->
  <input 
    type="email" 
    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    placeholder="Email"
  />
</template>
```

### Cards

```vue
<template>
  <!-- Using pre-configured class -->
  <div class="card">
    <h3 class="text-xl font-bold mb-2">Card Title</h3>
    <p class="text-gray-600">Card content goes here</p>
  </div>
  
  <!-- Custom card -->
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 class="text-xl font-bold mb-2">Custom Card</h3>
    <p class="text-gray-600">With hover effect</p>
  </div>
</template>
```

---

## 🎨 Color Palette

### Primary Colors (Custom)
```vue
<div class="bg-primary-50">Lightest</div>
<div class="bg-primary-100">...</div>
<div class="bg-primary-500">Medium</div>
<div class="bg-primary-600">Default Primary</div>
<div class="bg-primary-900">Darkest</div>
```

### Default Tailwind Colors
- `gray-*` - Gray shades
- `red-*` - Red shades
- `blue-*` - Blue shades
- `green-*` - Green shades
- `yellow-*` - Yellow shades
- `purple-*` - Purple shades
- And many more!

---

## 📱 Responsive Design

### Breakpoints

```vue
<template>
  <!-- Mobile first approach -->
  <div class="
    w-full          /* Mobile: full width */
    md:w-1/2        /* Tablet: half width */
    lg:w-1/3        /* Desktop: one-third */
    xl:w-1/4        /* Large: one-quarter */
  ">
    Responsive content
  </div>
  
  <!-- Hide/Show at different sizes -->
  <div class="hidden md:block">
    Visible on tablet and up
  </div>
  
  <div class="block md:hidden">
    Visible on mobile only
  </div>
</template>
```

### Breakpoint Reference
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

---

## 🎭 Common Patterns for E-commerce

### Product Card

```vue
<template>
  <div class="card hover:shadow-xl transition-shadow duration-300 cursor-pointer">
    <!-- Product Image -->
    <div class="aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-lg">
      <img 
        src="/product.jpg" 
        alt="Product"
        class="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
    
    <!-- Product Info -->
    <h3 class="text-lg font-semibold text-gray-900 mb-2">Product Name</h3>
    <p class="text-gray-600 text-sm mb-4">Short description</p>
    
    <!-- Price and Button -->
    <div class="flex items-center justify-between">
      <span class="text-2xl font-bold text-primary-600">$99.99</span>
      <button class="btn btn-primary">Add to Cart</button>
    </div>
  </div>
</template>
```

### Navigation Bar

```vue
<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <h1 class="text-2xl font-bold text-primary-600">Store</h1>
        </div>
        
        <!-- Menu -->
        <div class="hidden md:flex space-x-8">
          <a href="/" class="text-gray-700 hover:text-primary-600 transition-colors">
            Home
          </a>
          <a href="/products" class="text-gray-700 hover:text-primary-600 transition-colors">
            Products
          </a>
          <a href="/cart" class="text-gray-700 hover:text-primary-600 transition-colors">
            Cart
          </a>
        </div>
        
        <!-- Cart Icon -->
        <div class="flex items-center">
          <button class="relative p-2">
            <span class="text-2xl">🛒</span>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
```

### Shopping Cart Item

```vue
<template>
  <div class="flex items-center space-x-4 p-4 border-b hover:bg-gray-50 transition-colors">
    <!-- Image -->
    <img 
      src="/product.jpg" 
      alt="Product"
      class="w-20 h-20 object-cover rounded-lg"
    />
    
    <!-- Details -->
    <div class="flex-1">
      <h3 class="font-semibold text-gray-900">Product Name</h3>
      <p class="text-sm text-gray-600">Size: M, Color: Blue</p>
    </div>
    
    <!-- Quantity -->
    <div class="flex items-center space-x-2">
      <button class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">-</button>
      <span class="w-12 text-center font-semibold">2</span>
      <button class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">+</button>
    </div>
    
    <!-- Price -->
    <div class="text-right">
      <p class="font-bold text-lg text-gray-900">$199.98</p>
      <button class="text-red-500 text-sm hover:underline">Remove</button>
    </div>
  </div>
</template>
```

### Form

```vue
<template>
  <form class="card max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Login</h2>
    
    <!-- Email -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Email
      </label>
      <input 
        type="email" 
        class="input"
        placeholder="you@example.com"
      />
    </div>
    
    <!-- Password -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <input 
        type="password" 
        class="input"
        placeholder="••••••••"
      />
    </div>
    
    <!-- Submit -->
    <button type="submit" class="w-full btn btn-primary">
      Sign In
    </button>
    
    <!-- Links -->
    <div class="mt-4 text-center">
      <a href="#" class="text-sm text-primary-600 hover:underline">
        Forgot password?
      </a>
    </div>
  </form>
</template>
```

---

## 🔧 Customizing Tailwind

### Add Custom Colors

Edit `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#ff6b6b',
          DEFAULT: '#ee5a6f',
          dark: '#c92a2a',
        },
      },
    },
  },
}
```

Use in templates:
```vue
<div class="bg-brand text-white">Default brand color</div>
<div class="bg-brand-light">Light brand color</div>
```

### Add Custom Utilities

Edit `assets/css/main.css`:

```css
@layer components {
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .heading-1 {
    @apply text-4xl font-bold text-gray-900 mb-4;
  }
  
  .text-ellipsis-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

---

## 📚 Useful Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Heroicons](https://heroicons.com/) - Beautiful icons
- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)

---

## 🚀 Next Steps

1. Check out the demo page at `pages/index.vue`
2. Customize colors in `tailwind.config.js`
3. Add custom components in `assets/css/main.css`
4. Start building your store components!

Run the dev server to see Tailwind in action:
```bash
npm run dev
```

Visit http://localhost:3000 to see the styled demo page!

