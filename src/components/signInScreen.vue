<script lang="ts" setup>
import { LockClosedIcon } from "@heroicons/vue/solid"

import { reactive, ref } from "vue"
import { signInWithEmailAndPassword } from "@firebase/auth"
import { auth } from "../firebase"
import { useRouter } from "vue-router"

const errorCode = ref<String>()
const router = useRouter()

const loginUser = async () => {
  try {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
  } catch (error: any) {
    switch (error.code) {
      case "auth/user-not-found":
        errorCode.value = "Error: Please try again user does not exist"
        break
      case "auth/wrong-password":
        errorCode.value = "Error: Wrong password"
        break
      default:
        errorCode.value = "Try again, something went wrong"
    }
  }

  credentials.email = ""
  credentials.password = ""
  router.push("/dashboard")
}

const credentials = reactive({
  email: "",
  password: "",
})

const isLoading = ref(false)
</script>

<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:mt-20">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
      </div>
      <form class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="credentials.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="credentials.password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>

          <div class="text-sm">
            <!-- TODO add this function forgot password -->
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click.prevent="loginUser"
            :disabled="isLoading"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
