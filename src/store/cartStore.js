import { defineStore } from "pinia";
import { ref,computed } from "vue";

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isCartOpen = ref(false)

    const totalItems = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity,0)
    })
    const subtotal = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })
    const isEmpty = computed(() => items.value.length===0)

    const addToCart = (product) => {
        const existingItem = items.value.find(item => item.id === product.id)

        if(existingItem) {
            existingItem.quantity += 1
        } else {
            items.value.push({
                id: product.id, name: product.title,
                price: product.price,
                quantity:1
            })
        }
    }
    const removeFromCart = (productId) => {
        const index = items.value.findIndex(item => item.id === productId)
        if(index !== -1) {
            items.value.splice(index,1)
        }
    }
    const updateQuantity = (productId, newQuantity) => {
        const item = items.value.find(item => item.id === productId)
        if(item){
            if(newQuantity <= 0) {
                removeFromCart(productId)
            } else {
                item.quantity = newQuantity
            }
        }
    }
    const clearCart = ()=> {
        items.value = []
    }
    const toggleCart = () => {
        isCartOpen.value = !isCartOpen.value
    }
    const openCart = () => {
        isCartOpen.value = true
    }
    const closeCart = () => {
        isCartOpen.value = false
    }
    return {
        items, isCartOpen,
        totalItems, subtotal,isEmpty,
        addToCart, removeFromCart, updateQuantity, clearCart,
        toggleCart, openCart, closeCart
    }
})