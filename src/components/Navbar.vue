<template>
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
      <li><a href="/carrito">Carrito</a></li>
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
      <li><a href="/carrito">Carrito</a></li>
    </ul>
  </div>
  
  <div class="navbar-end">
    <div class="flex-none me-3">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <i class="fa-solid fa-cart-shopping text-primary fa-2x"></i>
                        <span class="badge badge-sm indicator-item">0</span>
                    </div>
                </div>
                <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                    <div class="card-body">
                        <span class="text-lg font-bold">8 Items</span>
                        <span class="text-secondary">Subtotal: $999</span>
                        <div class="card-actions">
                            <a href="/carrito">
                            <button class="btn btn-primary btn-block">Ir al carrito</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <a class="btn btn-primary" href="/login">Iniciar Sesión</a>
  </div>
</div>
</template>
<script setup>

</script>
<style scoped>
li a {
    font-weight: 500;
    transition: all 0.3s ease;
}
li a:hover {
    color: var(--color-primary);
    background-color: var(--color-primary-content);
}
</style>