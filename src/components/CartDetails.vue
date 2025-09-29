<template>
  <div class="drawer drawer-end">
    <input 
      id="cart-drawer" 
      type="checkbox" 
      class="drawer-toggle" 
      v-model="cartStore.isCartOpen" 
    />
    
    <div class="drawer-content">
    </div>
    
    <div class="drawer-side">
      <label 
        for="cart-drawer" 
        aria-label="close sidebar" 
        class="drawer-overlay"
        @click="cartStore.closeCart()"
      ></label>
      
      <div class="menu bg-base-100 text-base-content min-h-full w-80 p-4 shadow-xl">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Carrito de Compras</h2>
          <button class="btn btn-ghost btn-sm" @click="cartStore.closeCart()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Contenido -->
        <div v-if="cartStore.isEmpty" class="text-center py-8">
          <i class="fas fa-shopping-cart text-4xl text-gray-400 mb-4"></i>
          <p class="text-gray-500">Tu carrito está vacío</p>
          <button class="btn btn-primary mt-4" @click="cartStore.closeCart()">
            Seguir comprando
          </button>
        </div>

        <div v-else>
          <!-- Lista de productos -->
          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div 
              v-for="item in cartStore.items" 
              :key="item.id" 
              class="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
            >
              <img 
                :src="item.image" 
                :alt="item.name" 
                class="w-12 h-12 object-cover rounded"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-sm">{{ item.name }}</h3>
                <p class="text-primary font-bold">${{ item.price.toLocaleString() }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <button 
                    class="btn btn-xs btn-outline"
                    @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                  >
                    -
                  </button>
                  <span class="text-sm">{{ item.quantity }}</span>
                  <button 
                    class="btn btn-xs btn-outline"
                    @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                class="btn btn-ghost btn-xs text-error"
                @click="cartStore.removeFromCart(item.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>

          <!-- Resumen de compra -->
          <div class="border-t mt-6 pt-4">
            <div class="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span class="font-bold">${{ cartStore.subtotal.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between mb-4">
              <span>Envío:</span>
              <span class="font-bold">$0</span>
            </div>
            <div class="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>${{ cartStore.subtotal.toLocaleString() }}</span>
            </div>
          </div>

          <!-- Acciones -->
          <div class="mt-6 space-y-2">
            <button class="btn btn-primary btn-block">
              Proceder al pago
            </button>
            <button 
              class="btn btn-outline btn-error btn-block" 
              @click="cartStore.clearCart()"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cartStore'

const cartStore = useCartStore()
</script>