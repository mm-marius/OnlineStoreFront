// Event registry to store all webservice methods
const eventRegistry = {}

/**
 * Register a webservice event
 * @param {string} eventName - The name of the event
 * @param {Function} handler - The handler function
 */
function registerEvent(eventName, handler) {
  eventRegistry[eventName] = handler
}

/**
 * Fire a webservice event
 * @param {string} eventName - The name of the event to fire
 * @param {*} args - Arguments to pass to the handler
 * @returns {Promise} - The result of the handler
 */
async function fireEvent(eventName, ...args) {
  if (!eventRegistry[eventName]) {
    console.error(`Event "${eventName}" is not registered`)
    return { success: false, error: `Event "${eventName}" not found` }
  }

  try {
    return await eventRegistry[eventName](...args)
  } catch (error) {
    console.error(`Error firing event "${eventName}":`, error)
    return { 
      success: false, 
      error: error.message || 'An error occurred' 
    }
  }
}

/**
 * Register all webservice methods
 * @param {Object} api - The global API instance
 */
function registerAllServices(api) {
  // Import and register all service files from webservice folder
  const services = import.meta.glob('@/webservice/ws.*.js', { eager: true })
  
  Object.entries(services).forEach(([, module]) => {
    const serviceMethods = module.default
    
    // Register each method from the service
    Object.entries(serviceMethods).forEach(([eventName, handler]) => {
      // Pass the API instance to each handler
      registerEvent(eventName, (...args) => handler(api, ...args))
    })
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  // Get the API instance from the axios plugin
  const api = nuxtApp.$api

  // Register all webservice methods
  registerAllServices(api)

  // Add $fire method to all Vue instances
  nuxtApp.vueApp.config.globalProperties.$fire = (eventName, ...args) => {
    return fireEvent(eventName, ...args)
  }

  // Also provide it via provide/inject
  return {
    provide: {
      fire: (eventName, ...args) => {
        return fireEvent(eventName, ...args)
      }
    }
  }
})
