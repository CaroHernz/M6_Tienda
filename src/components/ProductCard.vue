<template>
  <div class="card bg-base-100 shadow-md bordered hover:shadow-lg transition-shadow duration-300 flex flex-col h-full" :class="{'opacity-60': product.stock <= 0}">

    <div v-if="product.stock <= 0" class="absolute top-2 right-2 z-10">
      <span class="badge badge-error text-white font-bold">Agotado</span>
    </div>

    <div v-if="product.stock <= 0" class="absolute inset-0 bg-gray-500 bg-opacity-50 z-5 rounded-lg flex items-center justify-center">
      <span class="text-white font-bold text-lg bg-error px-4 py-2 rounded">Producto sin stock disponible</span>
    </div>

    <figure class="flex-shrink-0">
      <img class=" h-50" :src="product.image" :alt="product.title" loading="lazy" />
    </figure>

    <div class="card-body flex flex-col flex-grow p-4">
      <div class="flex-grow">
        <h2 class="card-title text-xl">{{ product.title }}</h2>
      </div>
      <div class="card-description mb-3">
        <p ref="descriptionElement" class="text-gray-600 text-sm" :class="{ 'line-clamp-1': !isExpanded }">
          {{product.description }}
        </p>
        <button v-if="needsTruncation" @click="toggleDescription"
          class="text-neutral text-xs font-medium mt-1 hover:underline focus:outline-none">
          {{ isExpanded ? 'Ver menos' : 'Ver más' }}
        </button>

        <div class="text-end">
          <span class="badge badge-outline text-accent badge-sm">{{ product.category }}</span>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <p class="font-bold text-center text-secondary text-lg">{{ formatPrice(product.price) }}</p>
        <span class="text-xs" :class="getStockClass(product.stock)">{{ getStockText(product.stock) }}</span>
      </div>

      <div v-if="product.stock > 0" class="flex items-center gap-1 justify-between">
        <div class="items-center gap-2">
          <label class="text-sm text-gray-600">Cantidad:</label>
          <input v-model.number="quantity" type="number" min="1" :max="Math.min(product.stock,10)"
            class="input input-bordered input-sm w-16 text-center" :disabled="product.stock <=0">
        </div>
        <button class="btn btn-primary btn-sm " @click="handleAddToCart" :disabled="quantity < 1 || product.stock <= 0 || quantity > product.stock">{{ product.stock > 0 ? 'Agregar al carrito' : 'Sin stock' }}</button>
      </div>

      <div v-else class="text-center py-2">
        <button class="btn btn-disabled btn-sm w-full">
          Producto Agotado
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick, onMounted, computed } from 'vue'
import { useCartStore } from '../store/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['show-details'])
const cartStore = useCartStore()
const quantity = ref(1)
const isExpanded = ref(false)
const descriptionElement = ref(null)
const needsTruncation = ref(false)

const maxQuantity = computed(() => {
  return Math.min(props.product.stock, 10)
})

const checkTruncation = () => {
  if (!descriptionElement.value) return
  const element = descriptionElement.value
  needsTruncation.value = element.scrollHeight > element.clientHeight
}

const toggleDescription = () => {
  emit('show-details', props.product)
}

const getStockClass = (stock) => {
  if (stock <= 0) return 'text-error'
  if (stock <= 3) return 'text-warning'
  return 'text-success'
}

const getStockText = (stock) => {
  if (stock <= 0) return 'Agotado'
  if (stock <= 3) return `Últimas ${stock} unidades`
  return `Stock: ${stock}`
}

const handleAddToCart = (event) => {
  if (quantity.value < 1 || quantity.value > props.product.stock) return
  let successCount = 0
  for(let i = 0; i < quantity.value; i++) {
    if (cartStore.addToCart(props.product)){
      successCount++
    }
  }

  const button = event.target
  const originalText = button.innerHTML
if (successCount > 0) {
    cartStore.openCart()
    button.innerHTML = '✅ Agregado!'
    button.classList.remove('btn-primary')
    button.classList.add('btn-success')
  } else {
    button.innerHTML = '❌ Sin stock'
    button.classList.remove('btn-primary')
    button.classList.add('btn-error')
  }

  setTimeout(() => {
    button.innerHTML=originalText
    button.classList.remove('btn-success', 'btn-error')
    button.classList.add('btn-primary')
    quantity.value = 1
  }, 2000)
}
const formatPrice = (price) => {
  return `$${price.toFixed(2)}`
}
onMounted(() => {
  nextTick(() => {
    setTimeout(checkTruncation, 100)
  })
})

</script>
<style scoped>
.card {
  background-color: white;
  color: black
}
</style>