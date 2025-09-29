<template>
    <div class="hero bg-base-200 min-h-screen">
  <div class="hero-content flex-col lg:flex-row">
    <div class="text-center lg:text-right">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <div class="py-6 ">
        <h4>Credenciales de Demo:</h4>
        <p><strong>Correo:</strong> usuario@ejemplo.com</p>
        <p><strong>Contraseña:</strong> password123</p>
      </div>
    </div>
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form class="card-body" @submit.prevent="handleLogin">
        <fieldset class="fieldset">
          <label class="label">Email</label>
          <input type="email" id="email" v-model="email" class="input" placeholder="Email" :class="['input input-bordered', {'input-error': emailError}]"  @input="clearErrors" required />
              <span v-if="emailError" class="text-error text-xs mt-1">{{ emailError }}</span>
          <label class="label">Password</label>
          <input type="password" v-model="password" id="password" class="input" placeholder="Password" :class="['input input-bordered', {'input-error': passwordError}]"  @input="clearErrors" required />
              <span v-if="passwordError" class="text-error text-xs mt-1">{{ passwordError }}</span>
          <div><a class="link link-hover">Forgot password?</a></div>

          <button type="submit" :disabled="loading" :class="['btn btn-primary', {'loading': loading}]">
            <span v-if="loading">Iniciando sesión...</span>
          <span v-else>Iniciar Sesión</span>
          </button>

          <div v-if="generalError" class="alert alert-error">
            <span>{{ generalError }}</span>
        </div>

        <div v-if="successMessage" class="alert alert-success">
          <span>{{ successMessage }}</span>
        </div>
        </fieldset>
      </form>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../services/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const emailError = ref('')
const passwordError = ref('')
const generalError = ref('')
const successMessage = ref('')

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
const clearErrors = () => {
  emailError.value = ''
  passwordError.value = ''
  generalError.value = ''
}

const handleLogin = async() => {
  clearErrors()
  if(!email.value) {
    emailError.value = 'El correo electrónico es requerido'
    return
  }
  if(!validateEmail(email.value)) {
    emailError.value = 'Ingrese un correo electrónico válido'
    return
  }
  if(!password.value) {
    passwordError.value = 'La contraseña es requerida'
    return
  }
  if(password.value.length <6) {
    passwordError.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }
  loading.value = true
  generalError.value = ''

  try {
    await authStore.login(email.value, password.value)
    successMessage.value = 'Inicio de sesión exitoso'
    setTimeout(()=> {
      router.push('/')
    }, 2000)
  } catch(error) {
    generalError.value = error.message
  } finally {
    loading.value = false
  }
}
</script>