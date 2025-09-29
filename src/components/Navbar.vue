<template>
    <!-- Notificación de logout -->
    <Transition name="notification">
        <div v-if="showLogoutMessage" class="alert alert-success fixed top-20 right-4 z-50 w-auto shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Sesión cerrada exitosamente</span>
        </div>
    </Transition>
    
    <div class="navbar bg-primary-content/80 shadow-lg">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a href="/">Home</a></li>
        <li>
            <a href="/productos">Productos</a>
        </li>
      </ul>
    </div>
    <button class="p-2 btn-ghost">
        <i class="fa-solid fa-shop fa-xl text-primary"></i>
    </button>
    <a class="btn btn-ghost text-xl text-primary p-0">Mi tienda</a>
  </div>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/">Home</a></li>
      <li>
        <a href="/productos">Productos</a>
      </li>
    </ul>
  </div>
  
  <div class="navbar-end">
    <div class="flex-none me-3">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle" @click="ccartStore.openCart()">
                    <div class="indicator">
                        <i class="fa-solid fa-cart-shopping text-primary fa-2x"></i>
                        <span v-if="cartStore.totalItems > 0" class="badge badge-sm indicator-item">{{ cartStore.totalItems }}</span>
                    </div>
                </div>
                <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                    <div class="card-body">
                        <span class="text-lg font-bold">{{ cartStore.totalItems }} Items</span>
                        <span class="text-secondary">Subtotal: ${{ cartStore.subtotal.toLocaleString() }}</span>
                        <div class="card-actions">
                            <button class="btn btn-primary btn-block" @click="cartStore.openCart()">Ver carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <button v-if="!authStore.isAuthenticated" class="btn btn-primary" @click="router.push('/login')">Iniciar Sesión</button>
    <button v-else class="btn btn-outline btn-primary" @click="handleLogout">Cerrar Sesión</button>
  </div>
</div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../services/auth'
import { useCartStore } from '../store/cartStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()
const showLogoutMessage = ref(false)

// Verificar autenticación al montar el componente
authStore.checkAuth()

const handleLogout = () => {
  authStore.logout()
  
  // Mostrar mensaje de confirmación
  showLogoutMessage.value = true
  
  // Ocultar mensaje después de 3 segundos
  setTimeout(() => {
    showLogoutMessage.value = false
  }, 3000)
  
  router.push('/')
}
</script>
<style scoped>

li a {
    color:black;
    font-weight: 500;
    transition: all 0.3s ease;
}
li a:hover {
    color: var(--color-primary);
    background-color: var(--color-primary-content);
}

/* Animaciones para la notificación */
.notification-enter-active,
.notification-leave-active {
    transition: all 0.3s ease;
}

.notification-enter-from {
    opacity: 0;
    transform: translateX(100px);
}

.notification-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
</style>