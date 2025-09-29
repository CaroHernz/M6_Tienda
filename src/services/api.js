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

            data.forEach((producto) => {
                items.value[producto.id] = producto
                ids.value.push(producto.id)
            })
            
        } catch (err) {
            error.value = err.message
            console.error('Error fetching productos: ', err)
        } finally {
            loading.value = false
        }
    }
    
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
        clearError
    }
})