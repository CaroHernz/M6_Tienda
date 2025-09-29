<template>
  <div class="card bg-base-100 shadow-md bordered hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
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
      </div>

      <div class="flex items-center gap-1 justify-between">
        <div class="items-center gap-2">
          <label class="text-sm text-gray-600">Cantidad:</label>
          <input v-model.number="quantity" type="number" min="1" max="10"
            class="input input-bordered input-sm w-16 text-center">
        </div>
        <button class="btn btn-primary btn-sm " @click="handleAddToCart" :disabled="quantity < 1">Agregar al carrito</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useCartStore } from '../store/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['add-to-cart', 'show-details'])
const cartStore = useCartStore()
const quantity = ref(1)
const isExpanded = ref(false)
const descriptionElement = ref(null)
const needsTruncation = ref(false)

const checkTruncation = () => {
  if (!descriptionElement.value) return

  const element = descriptionElement.value
  needsTruncation.value = element.scrollHeight > element.clientHeight
}

const toggleDescription = () => {
  emit('show-details', props.product)
}

const handleAddToCart = (event) => {
  if (quantity.value < 1) return
  for(let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(props.product)
  }
  cartStore.openCart()

  const button = event.target
  const originalText = button.innerHTML
  button.innerHTML = '✅ Agregado!'
  button.classList.remove('btn-primary')
  button.classList.add('btn-success')

  setTimeout(() => {
    button.innerHTML=originalText
    button.classList.remove('btn-success')
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