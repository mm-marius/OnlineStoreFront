# Online Store - Folder Structure Guide (Customer-Facing)

## 📁 Complete Project Structure

```
Store_Front/
│
├── 📁 pages/                          # 🔴 ROUTES/PAGES (auto-routing)
│   ├── index.vue                      # Home page (/)
│   ├── products/
│   │   ├── index.vue                  # Products listing (/products)
│   │   ├── [id].vue                   # Single product (/products/123)
│   │   └── category/
│   │       └── [slug].vue             # Category page (/products/category/electronics)
│   ├── cart.vue                       # Shopping cart (/cart)
│   ├── checkout/
│   │   ├── index.vue                  # Checkout main (/checkout)
│   │   ├── shipping.vue               # Shipping step (/checkout/shipping)
│   │   ├── payment.vue                # Payment step (/checkout/payment)
│   │   └── success.vue                # Order confirmation (/checkout/success)
│   ├── auth/
│   │   ├── login.vue                  # Login page (/auth/login)
│   │   ├── register.vue               # Register page (/auth/register)
│   │   └── forgot-password.vue        # Password recovery
│   ├── account/
│   │   ├── index.vue                  # Account overview (/account)
│   │   ├── orders.vue                 # Order history (/account/orders)
│   │   ├── orders/
│   │   │   └── [id].vue              # Order detail (/account/orders/123)
│   │   ├── profile.vue                # User profile (/account/profile)
│   │   ├── addresses.vue              # Saved addresses (/account/addresses)
│   │   └── wishlist.vue               # Wishlist (/account/wishlist)
│   ├── about.vue                      # About page (/about)
│   ├── contact.vue                    # Contact page (/contact)
│   └── search.vue                     # Search results (/search)
│
├── 📁 components/                     # 🔴 REUSABLE COMPONENTS
│   ├── layout/
│   │   ├── Header.vue                 # Site header
│   │   ├── Footer.vue                 # Site footer
│   │   ├── Navbar.vue                 # Navigation bar
│   │   └── MobileMenu.vue             # Mobile navigation
│   ├── product/
│   │   ├── ProductCard.vue            # Product card in grid
│   │   ├── ProductGrid.vue            # Products grid layout
│   │   ├── ProductDetail.vue          # Product details
│   │   ├── ProductImages.vue          # Product image gallery
│   │   ├── ProductReviews.vue         # Reviews section
│   │   ├── AddToCart.vue              # Add to cart button
│   │   ├── ProductFilters.vue         # Filter sidebar
│   │   └── RelatedProducts.vue        # Related products
│   ├── cart/
│   │   ├── CartItem.vue               # Single cart item
│   │   ├── CartSummary.vue            # Cart total summary
│   │   ├── CartDrawer.vue             # Sliding cart drawer
│   │   └── MiniCart.vue               # Mini cart dropdown
│   ├── checkout/
│   │   ├── CheckoutSteps.vue          # Checkout progress indicator
│   │   ├── ShippingForm.vue           # Shipping info form
│   │   ├── PaymentForm.vue            # Payment info form
│   │   └── OrderSummary.vue           # Order review
│   ├── auth/
│   │   ├── LoginForm.vue              # Login form
│   │   ├── RegisterForm.vue           # Registration form
│   │   └── SocialLogin.vue            # Social login buttons
│   ├── account/
│   │   ├── OrderCard.vue              # Order in history
│   │   ├── AddressCard.vue            # Saved address
│   │   └── ProfileForm.vue            # Edit profile form
│   └── ui/                            # Generic UI components
│       ├── Button.vue
│       ├── Input.vue
│       ├── Modal.vue
│       ├── Alert.vue
│       ├── Loading.vue
│       ├── Pagination.vue
│       ├── Breadcrumb.vue
│       └── Badge.vue
│
├── 📁 layouts/                        # 🔴 PAGE LAYOUTS
│   ├── default.vue                    # Default layout (header + footer)
│   ├── auth.vue                       # Auth pages layout (minimal)
│   └── checkout.vue                   # Checkout layout (simplified header)
│
├── 📁 stores/                         # 🔴 PINIA STATE MANAGEMENT
│   ├── auth.js                        # Authentication state
│   ├── cart.js                        # Shopping cart state
│   ├── products.js                    # Products state & cache
│   ├── categories.js                  # Categories state
│   ├── orders.js                      # Orders state
│   ├── wishlist.js                    # Wishlist state
│   └── user.js                        # User profile state
│
├── 📁 composables/                    # 🔴 REUSABLE COMPOSITION FUNCTIONS
│   ├── useApi.js                      # API wrapper (✅ already created)
│   ├── useAuth.js                     # Authentication helpers
│   ├── useCart.js                     # Cart operations
│   ├── useProduct.js                  # Product operations
│   ├── useOrder.js                    # Order operations
│   ├── useValidation.js               # Form validation
│   ├── useToast.js                    # Toast notifications
│   └── useFormatter.js                # Format currency, dates, etc.
│
├── 📁 middleware/                     # 🔴 ROUTE MIDDLEWARE
│   ├── auth.js                        # Protect authenticated routes
│   └── guest.js                       # Redirect if authenticated
│
├── 📁 plugins/                        # 🔴 PLUGINS
│   ├── axios.js                       # Axios config (✅ already created)
│   ├── toast.js                       # Toast notification plugin
│   └── currency.js                    # Currency formatter plugin
│
├── 📁 assets/                         # 🔴 ASSETS (processed by build)
│   ├── css/
│   │   ├── main.css                   # Main styles
│   │   └── tailwind.css               # Tailwind imports
│   ├── images/                        # Images (processed)
│   │   ├── logo.svg
│   │   ├── placeholder.png
│   │   └── hero-banner.jpg
│   └── icons/                         # Custom icons
│
├── 📁 public/                         # 🔴 STATIC FILES (served as-is)
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/                        # Public images
│       └── placeholder-product.jpg
│
├── 📁 server/                         # 🔴 SERVER API ROUTES (optional - if needed)
│   └── api/
│       ├── products.get.js            # GET /api/products
│       └── newsletter.post.js         # POST /api/newsletter
│
├── 📁 utils/                          # 🔴 UTILITY FUNCTIONS
│   ├── constants.js                   # App constants
│   ├── helpers.js                     # Helper functions
│   └── validators.js                  # Validation functions
│
├── nuxt.config.ts                     # Nuxt configuration
├── package.json                       # Dependencies
├── .env                               # Environment variables
└── README.md                          # Project documentation
```

---

## 🎯 Key Folders Explained

### 1. **pages/** - AUTO-ROUTING 🚀
- **Most Important!** Each `.vue` file becomes a route
- `index.vue` = home page of that folder
- `[id].vue` = dynamic route (e.g., product ID)
- Folder structure = URL structure

**Examples:**
```
pages/index.vue              → /
pages/products/index.vue     → /products
pages/products/[id].vue      → /products/123
pages/cart.vue               → /cart
pages/checkout/shipping.vue  → /checkout/shipping
pages/account/orders.vue     → /account/orders
```

### 2. **components/** - REUSABLE UI
- Components used in multiple pages
- NOT routes, just UI pieces
- Auto-imported in Nuxt 3
- Organize by feature (product, cart, auth, etc.)

### 3. **layouts/** - PAGE TEMPLATES
- Wrapper templates for pages
- Define in page: `definePageMeta({ layout: 'checkout' })`
- Different headers/footers for different sections

### 4. **stores/** - STATE MANAGEMENT (Pinia)
- Global app state
- Cart items, user data, products cache
- Persists across page navigation

### 5. **composables/** - REUSABLE LOGIC
- JavaScript functions (not UI)
- Auto-imported
- Business logic, API calls, calculations

### 6. **middleware/** - ROUTE GUARDS
- Run before entering routes
- Check authentication, permissions
- Redirect if needed

---

## 🛒 Online Store Page Flow

### 1. Shopping Flow:
```
Home (/) 
  → Products (/products) 
    → Product Detail (/products/123)
      → Cart (/cart)
        → Checkout (/checkout/shipping)
          → Payment (/checkout/payment)
            → Success (/checkout/success)
```

### 2. User Account Flow:
```
Login (/auth/login) or Register (/auth/register)
  → Account Dashboard (/account)
    → Orders (/account/orders)
    → Profile (/account/profile)
    → Addresses (/account/addresses)
    → Wishlist (/account/wishlist)
```

---

## 📦 Essential Pages Structure

### Customer-Facing Pages:
```
pages/
  ├── index.vue                    # 🏠 Home/Landing page
  │
  ├── products/
  │   ├── index.vue                # 📦 All products
  │   ├── [id].vue                 # 🔍 Product detail
  │   └── category/[slug].vue      # 📁 Category pages
  │
  ├── cart.vue                     # 🛒 Shopping cart
  │
  ├── checkout/
  │   ├── index.vue                # ✅ Checkout start
  │   ├── shipping.vue             # 📮 Shipping info
  │   ├── payment.vue              # 💳 Payment
  │   └── success.vue              # 🎉 Order confirmation
  │
  ├── auth/
  │   ├── login.vue                # 🔐 Login
  │   ├── register.vue             # ✍️ Register
  │   └── forgot-password.vue      # 🔑 Reset password
  │
  ├── account/
  │   ├── index.vue                # 👤 Account home
  │   ├── orders.vue               # 📋 Order history
  │   ├── orders/[id].vue          # 📄 Order detail
  │   ├── profile.vue              # ⚙️ Edit profile
  │   ├── addresses.vue            # 📍 Saved addresses
  │   └── wishlist.vue             # ❤️ Wishlist
  │
  ├── about.vue                    # ℹ️ About us
  ├── contact.vue                  # 📧 Contact
  └── search.vue                   # 🔎 Search results
```

---

## 🏗️ Core Stores (Pinia)

```javascript
stores/
  ├── auth.js          # User login status, token, user info
  ├── cart.js          # Cart items, quantities, totals
  ├── products.js      # Product cache, filters
  ├── categories.js    # Category list
  ├── orders.js        # Order history
  ├── wishlist.js      # Wishlist items
  └── user.js          # User profile data
```

---

## 🎨 Typical Page Structure

### Example: Product Detail Page
```vue
<!-- pages/products/[id].vue -->
<script setup>
// Get product ID from URL
const route = useRoute()
const productId = route.params.id

// Fetch product from API
const { data: product } = await useFetch(`/api/products/${productId}`)

// Access cart store
const cartStore = useCartStore()

// Add to cart function
const addToCart = () => {
  cartStore.addItem(product.value)
}
</script>

<template>
  <div class="product-page">
    <Breadcrumb :items="breadcrumbs" />
    <div class="product-container">
      <ProductImages :images="product.images" />
      <ProductDetail :product="product" @add-to-cart="addToCart" />
    </div>
    <ProductReviews :reviews="product.reviews" />
    <RelatedProducts :category="product.category" />
  </div>
</template>
```

---

## 🔒 Protected Routes (Middleware)

```javascript
// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }
})
```

Use in pages:
```vue
<!-- pages/account/index.vue -->
<script setup>
definePageMeta({
  middleware: 'auth'  // Requires login
})
</script>
```

---

## 📝 Environment Variables

Create `.env` file:
```bash
# API Backend URL
NUXT_PUBLIC_API_BASE=http://localhost:8000/api

# Payment Gateway (Stripe, PayPal, etc.)
NUXT_PUBLIC_STRIPE_KEY=pk_test_xxxxx

# Other services
NUXT_PUBLIC_GOOGLE_MAPS_KEY=xxxxx
```

---

## 🎯 Recommended Build Order

### Phase 1: Basic Structure
1. ✅ Install Nuxt, Pinia, Axios (DONE)
2. Create folder structure
3. Setup layouts (default, auth, checkout)
4. Create basic components (Header, Footer, Button, etc.)

### Phase 2: Products
5. Products listing page
6. Product detail page
7. Product components (Card, Grid, Filters)
8. Products store

### Phase 3: Cart & Checkout
9. Cart page
10. Cart store
11. Checkout flow (shipping, payment, success)
12. Cart components (CartItem, MiniCart)

### Phase 4: Authentication
13. Login/Register pages
14. Auth store
15. Auth middleware
16. Protected routes

### Phase 5: User Account
17. Account dashboard
18. Order history
19. Profile management
20. Wishlist

---

## 🚀 Next Steps

Would you like me to:
1. **Create the entire folder structure now?**
2. **Start with a specific feature?** (Products, Cart, Auth, etc.)
3. **Create the core stores and composables?**
4. **Build the layouts and base components?**

Just let me know where you'd like to start! 🛒
