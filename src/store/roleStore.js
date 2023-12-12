import { defineStore } from 'pinia'

export const useRoleStore = defineStore('role', {
  state: () => ({
    products: [],
    isFetchingProducts: false
  }),
  getters: {
    categories () {
      const categoryList = this.products
        .map(p => p.category)
        .filter((v, i, a) => a.indexOf(v) === i)
      return categoryList.reduce((obj, category) => {
        obj[category] = this.products.filter(p => p.category === category)
        return obj
      }, {})
    },
    
  },
  actions: {
    async pushProducts (item) {
        this.products.push(item)
    },
    async fetchProducts () {
      this.isFetchingProducts = true
      try {
        const result = await fetch('https://fakestoreapi.com/products')
        const data = await result.json()
        this.products = data
      } catch (error) {
        console.log(error)
      } finally {
        this.isFetchingProducts = false
      }
    }
  }
})