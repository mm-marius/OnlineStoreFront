import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', {
  state: () => ({
    counter: 0,
    name: 'Example Store'
  }),
  
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  
  actions: {
    increment() {
      this.counter++
    },
    
    decrement() {
      this.counter--
    },
    
    updateName(newName) {
      this.name = newName
    }
  }
})

