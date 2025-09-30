<template>
    <div>
        <div class="p-10 text-center bg-base-300">
            <h2 class="mb-5 text-5xl text-shadow-sm font-bold text-primary">Calidad que Inspira</h2>
<p class="mb-5 text-xl italic">
  Productos diseñados para durar, con estilo que perdura. 
  Encuentra tu look perfecto sin comprometer tu presupuesto.
</p>
        </div>
        <section class="py-10 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12">¿Por Qué Elegirnos?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body text-center">
              <i class="fas fa-shipping-fast text-4xl text-primary mb-4"></i>
              <h3 class="card-title justify-center">Envío Express</h3>
              <p>Recibe tus pedidos en 24-48 horas. Envío gratis en compras superiores a $50.000</p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body text-center">
              <i class="fas fa-award text-4xl text-primary mb-4"></i>
              <h3 class="card-title justify-center">Calidad Garantizada</h3>
              <p>Productos seleccionados con los más altos estándares de calidad y durabilidad</p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body text-center">
              <i class="fas fa-undo-alt text-4xl text-primary mb-4"></i>
              <h3 class="card-title justify-center">Devolución Fácil</h3>
              <p>30 días para cambiar o devolver tus productos si no estás satisfecho</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Products Preview -->
    <section class="py-10 bg-primary-content text-primary">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4">Tendencias de la Temporada</h2>
        <p class="text-center text-xl mb-12">Descubre lo que está marcando tendencia este mes</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ProductCard 
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        
        <div class="text-center">
          <button class="btn btn-secondary btn-lg" @click="$router.push('/productos')">
            Ver Todos los Productos
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-10 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card bg-base-300 shadow-lg">
            <div class="card-body">
              <div class=" mb-4">              
                <i class="fa-solid fa-star text-secondary"></i>
                <i class="fa-solid fa-star text-secondary" ></i>
                <i class="fa-solid fa-star text-secondary"></i>
                <i class="fa-solid fa-star text-secondary"></i>
                <i class="fa-solid fa-star text-secondary"></i>
              </div>
              <p class="italic">"La calidad de los productos superó mis expectativas. El envío fue increíblemente rápido!"</p>
              <div class="card-actions justify-end mt-4">
                <span class="font-semibold">- María González</span>
              </div>
            </div>
          </div>
          <div class="card bg-base-300 shadow-lg">
            <div class="card-body">
              <div class=" mb-4">
                <i class="fa-solid fa-star text-secondary"></i>
                <i class="fa-solid fa-star text-secondary" ></i>
                <i class="fa-solid fa-star text-secondary"></i>
                <i class="fa-solid fa-star text-secondary"></i>
                <i class="fa-solid fa-star text-secondary-content"></i>
              </div>
              <p class="italic">"Excelente atención al cliente y productos de muy buena calidad. Volveré a comprar!"</p>
              <div class="card-actions justify-end mt-4">
                <span class="font-semibold">- Carlos Rodríguez</span>
              </div>
            </div>
          </div>
          <div class="card bg-base-300 shadow-lg">
            <div class="card-body">
              <div class=" mb-4">
                <i class="fa-solid fa-star text-secondary"></i>
                <i class="fa-solid fa-star text-secondary" ></i>
                <i class="fa-solid fa-star text-secondary"></i>
                <i class="fa-solid fa-star text-secondary"></i>
                <i class="fa-solid fa-star text-secondary"></i>
              </div>
              <p class="italic">"Encontré justo lo que buscaba y a un precio excelente. Muy recomendable!"</p>
              <div class="card-actions justify-end mt-4">
                <span class="font-semibold">- Ana Martínez</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-16 bg-primary text-primary-content">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-4">Únete a Nuestra Comunidad</h2>
        <p class="text-xl mb-8">Recibe ofertas exclusivas y sé el primero en conocer nuestras novedades</p>
        <div class="max-w-md mx-auto">
          <div class="join w-full">
            <input type="email" placeholder="tu@email.com" class="input input-bordered join-item flex-grow">
            <button class="btn btn-accent join-item">Suscribirse</button>
          </div>
          <p class="text-sm mt-2">Al suscribirte aceptas nuestra política de privacidad</p>
        </div>
      </div>
    </section>
    </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useProductStore } from '../services/api'
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()

const featuredProducts = computed(() => {
  return productStore.list.slice(0, 4)
})

onMounted(async () => {
  await productStore.fetchProductos()
})
</script>