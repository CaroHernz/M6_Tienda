<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Hero from './components/Hero.vue'
import { useAuthStore } from './services/auth'

const authStore = useAuthStore()

const route = useRoute()
const showHero = computed(()=> {
  const routesWhitHero = ['Home', 'Productos']
  return routesWhitHero.includes(route.name)
})
onMounted(() => {
  authStore.checkAuth()
})

</script>

<template>
  <Navbar />
  <main>
    <Hero v-if="showHero"/>
    <router-view v-slot="{Component}">
      <component :is="Component" />
    </router-view>
  </main>
  <Footer />
</template>

<style scoped>

</style>
