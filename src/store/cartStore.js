import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useProductStore } from '../services/api'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isCartOpen = ref(false)
    const productStore = useProductStore()

    const totalItems = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0)
    })
    const subtotal = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })
    const isEmpty = computed(() => items.value.length === 0)

    const hasEnoughStock = (product, quantity = 1) => {
        const productStore = useProductStore()
        const productInStore = productStore.items[product.id]
        return productInStore && (productInStore.stock || 0) >= quantity
    }

    const addToCart = (product) => {
        if (!hasEnoughStock(product, 1)) {
            console.warn(`No hay suficiente stock para ${product.title}`)
            return false
        }
        const existingItem = items.value.find(item => item.id === product.id)

        if (existingItem) {
            if (!hasEnoughStock(product, existingItem.quantity + 1)) {
                console.warn(`No hay suficiente stock para agregar más de ${product.title}`)
                return false
            }
            existingItem.quantity += 1
        } else {
            items.value.push({
                id: product.id, name: product.title,
                price: product.price,
                quantity: 1
            })
        }
        return true
    }
    const removeFromCart = (productId) => {
        const index = items.value.findIndex(item => item.id === productId)
        if (index !== -1) {
            items.value.splice(index, 1)
        }
    }
    const updateQuantity = (productId, newQuantity) => {
        const item = items.value.find(item => item.id === productId)
        if (item) {
            const product = productStore.items[productId]
            if (product && newQuantity > (product.stock || 0)) {
                console.warn(`No hay suficiente stock para ${product.title}`)
                return false
            }
            if (newQuantity <= 0) {
                removeFromCart(productId)
            } else {
                item.quantity = newQuantity
            }
        }
        return true
    }
    const clearCart = () => {
        items.value = []
    }
    const finalizarCompra = () => {
        if (isEmpty.value) return false
        const productStore = useProductStore()
        for (const item of items.value) {
            const product = productStore.items[item.id]
            if (!product || (product.stock || 0) < item.quantity) {
                console.error(`Stock insuficiente para ${item.name}`)
                return false
            }
        }
        items.value.forEach(item => {
            productStore.decreaseProductStock(item.id, item.quantity)
        })
        const purchasedItems = [...items.value]
        clearCart()
        return purchasedItems
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
        totalItems, subtotal, isEmpty,
        addToCart, removeFromCart, updateQuantity, clearCart,
        toggleCart, openCart, closeCart, finalizarCompra, hasEnoughStock
    }
})