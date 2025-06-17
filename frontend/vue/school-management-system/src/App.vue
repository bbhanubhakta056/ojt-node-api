<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 p-4">
    <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
      <h2 class="text-3xl font-bold text-center text-blue-600 transition-all duration-500">
        {{ isLogin ? 'Login to your account' : 'Create a new account' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-semibold mb-1">username</label>
          <input type="text" v-model="form.username" required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-1">Password</label>
          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="form.password" required
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <!-- <button type="button" @click="togglePassword" class="absolute right-3 top-2.5 text-gray-500">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.356 1.213-1.072 2.372-2.042 3.308M15 12a3 3 0 01-6 0" />
              </svg>
            </button> -->
          </div>
        </div>

        <div v-if="!isLogin">
          <label class="block text-gray-700 font-semibold mb-1">Confirm Password</label>
          <input type="password" v-model="form.confirmPassword" required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300">
          {{ isLogin ? 'Login' : 'Register' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <button @click="toggleForm" class="text-blue-600 font-semibold hover:underline ml-1">
          {{ isLogin ? "Register" : "Login" }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLogin = ref(true)
const showPassword = ref(false)
const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
})

function toggleForm() {
  isLogin.value = !isLogin.value
  form.value = { email: '', password: '', confirmPassword: '' }
}

function togglePassword() {
  showPassword.value = !showPassword.value
}

function handleSubmit() {
  if (!isLogin.value && form.value.password !== form.value.confirmPassword) {
    alert("Passwords do not match!")
    return
  }
  // Perform login or register logic here
  alert(`${isLogin.value ? 'Logging in' : 'Registering'} with email: ${form.value.email}`)
}
</script>
