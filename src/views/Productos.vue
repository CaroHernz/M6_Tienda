<template>
    <div class="productos p-4">
        <h1 class="text-center m-6 text-5xl text-shadow-sm font-bold">Nuestros Productos</h1>
        <div class="busqueda mb-6 text-center">
            <input id="searchInput" type="text" class="input input-border border-primary join-item" v-model="searchTerm" placeholder="Buscar productos..." @keyup.enter="handleSearchButton" @input="handleSearch($event.target.value)">
            <button 
                    class="btn join-item"
                    @click="handleSearchButton"
                    :disabled="!searchTerm.trim()"
                ><i class="fa-solid fa-magnifying-glass fa-xl text-primary"></i>
            </button>
        </div>
        <div v-if="searchTerm" class="search-info mb-4 text-center">
            <p class="text-sm text-gray-600">
                {{ searchResultsMessage }}
            </p>
        </div>
        <div v-if="productStore.loading" class="loading text-center py-8">
            <span class="loading loading-spinner loading-lg"></span>
            <p class="mt-2">Cargando productos...</p>
        </div>
        <div class="error" v-else-if="productStore.error">
            <span>Error: {{ productStore.error }}</span>
            <button @click="productStore.fetchProductos()" class="btn btn-sm ml-4">Reintentar</button>
        </div>
        <div v-else class="productos-container">
            <div class="text-center py-8" v-if="productosFiltrados.length === 0">
                <p class="text-lg">No se encontraron productos</p>
                <button 
                    v-if="searchTerm" 
                    @click="clearSearch" 
                    class="btn btn-outline btn-sm mt-2"
                >
                    Ver todos los productos
                </button>
            </div>
            <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-6 ">
                <ProductCard v-for="producto in productosFiltrados"
                    :key = "producto.id"
                    :product = "producto"
                    @add-to-cart = "addToCart"
                    @show-details="openDetails" />
            </div>
            
            <dialog id="product_modal" class="modal" v-if="selectedProduct">
                <div class="modal-box max-w-3xl">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div class="flex flex-col md:flex-row gap-4">
                        <img :src="selectedProduct.image" :alt="selectedProduct.title" class="w-40 h-40 object-contain mx-auto md:mx-0" />
                        <div>
                            <h3 class="font-bold text-lg">{{ selectedProduct.title }}</h3>
                            <p class="py-2 text-sm text-gray-600">{{ selectedProduct.description }}</p>
                            <div class="mt-2 flex items-center gap-2">
                                <span class="badge badge-outline text-accent badge-sm">{{ selectedProduct.category }}</span>
                                <span class="font-bold text-secondary text-lg">{{ formatPrice(selectedProduct.price) }}</span>
                            </div>
                            <div class="mt-4 flex items-center gap-2">
                                <button class="btn btn-primary btn-sm" @click="addToCart(selectedProduct, 1)">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useProductStore } from '../services/api';
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()
const searchTerm = ref('')
const selectedProduct = ref(null)

onMounted(async()=> {
    await productStore.fetchProductos()
})
const productosFiltrados = computed(()=> {
    let productos = productStore.list 
    if(searchTerm.value) {
        productos = productos.filter(producto => 
            producto.title.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
    }
    return productos
})
const searchResultsMessage = computed(() => {
    if (!searchTerm.value) return ''
    
    const count = productosFiltrados.value.length
    const total = productStore.list.length
    
    if (count === 0) {
        return `No se encontraron resultados para "${searchTerm.value}"`
    } else if (count === total) {
        return `Mostrando todos los ${total} productos`
    } else {
        return `${count} de ${total} productos encontrados para "${searchTerm.value}"`
    }
})
const handleSearch = (term) => {
    searchTerm.value = term
}
const handleSearchButton = () => {
    if(!searchTerm.value.trim()) return
    console.log('Búsqueda ejecutada:', searchTerm.value)
}
const clearSearch=()=> {
    searchTerm.value = ''
}

const formatPrice = (price) => `$${price.toFixed(2)}`

const openDetails = (product) => {
    selectedProduct.value = product
    nextTick(() => {
        const dlg = document.getElementById('product_modal')
        if (dlg && typeof dlg.showModal === 'function') {
            dlg.showModal()
        }
    })
}
</script>