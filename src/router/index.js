import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Productos from '../views/Productos.vue'
import Carrito from '../views/Carrito.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
        path: '/', 
        name: 'Home',
        component: Home 
    },
    { 
        path: '/productos', 
        name: 'Productos',
        component: Productos 
    },
    { 
        path: '/carrito', 
        name: 'Carrito',
        component: Carrito 
    },
    { 
        path: '/login', 
        name: 'Login',
        component: Login 
    },
  ]
})

export default router;