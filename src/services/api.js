import { defineStore } from "pinia";
import { ref, computed } from "vue";

const fakeStoreUrl = 'https://fakestoreapi.com'

export const useProductStore = defineStore('products', () => {
    const items = ref({})
    const ids = ref([])
    const loading = ref(false)
    const error = ref(null)

    const list = computed(() => {
        return ids.value.map(i => items.value[i])
    })

    const loaded = computed(() => {
        return ids.value.length > 0
    })


    // Stock:
    const loadStockFromStorage = () => {
        try {
            const storedStock = localStorage.getItem('product-stock')
            return storedStock ? JSON.parse(storedStock) : {}
        } catch {
            return {}
        }
    }
    const saveStockToStorage = (stockData) => {
        try {
            localStorage.setItem('product-stock', JSON.stringify(stockData))
        } catch (error) {
            console.error('Error guardando stock:', error)
        }
    }
    const updateProductStock = (productId, newStock) => {
        if (items.value[productId]) {
            items.value[productId].stock = Math.max(0, newStock)
            const currentStock = loadStockFromStorage()
            currentStock[productId] = items.value[productId].stock
            saveStockToStorage(currentStock)
        }
    }
    const decreaseProductStock = (productId, quantity = 1) => {
        if (items.value[productId]) {
            const currentStock = items.value[productId].stock || 0
            const newStock = Math.max(0, currentStock - quantity)
            updateProductStock(productId, newStock)
        }
    }

    // Productos
    async function fetchProductos() {
        if (loaded.value) return

        loading.value = true
        error.value = null

        try {
            const res = await fetch(`${fakeStoreUrl}/products`)

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`)
            }

            const data = await res.json()
            console.log('Productos cargados:', data)

            items.value = {}
            ids.value = []
            const storedStock = loadStockFromStorage()
            data.forEach((producto) => {
                const initialStock = storedStock[producto.id] !== undefined
                    ? storedStock[producto.id]
                    : Math.floor(Math.random() * 20) + 5

                items.value[producto.id] = {
                    ...producto,
                    stock: initialStock,
                    originalStock: initialStock
                }
                ids.value.push(producto.id)
            })
            const currentStock = {}
            data.forEach(producto => {
                currentStock[producto.id] = storedStock[producto.id] !== undefined
                    ? storedStock[producto.id]
                    : items.value[producto.id].stock
            })
            saveStockToStorage(currentStock)
        } catch (err) {
            error.value = err.message
            console.error('Error fetching productos: ', err)
        } finally {
            loading.value = false
        }
    }
    const availableProducts = computed(() => {
        return list.value.filter(product => (product.stock || 0) > 0)
    })

    function clearError() {
        error.value = null
    }

    return {
        items,
        ids,
        loading,
        error,
        list,
        loaded,
        fetchProductos,
        updateProductStock,
        decreaseProductStock, 
        clearError
    }
})