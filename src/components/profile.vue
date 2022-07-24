<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useAuthStore } from "../stores/authStore"

const credentials = reactive({
  email: "",
  password: "",
  message: "",
})

const responseMessages = reactive({
  emailChangeError: "",
  passwordChangeError: "",
  emailSuccessMsg: "",
  passwordSuccessMsg: "",
})

const authStore = useAuthStore()

const about = ref("")

const clearMsg = () => (
  (responseMessages.emailChangeError = ""),
  (responseMessages.emailSuccessMsg = ""),
  (responseMessages.passwordChangeError = ""),
  (responseMessages.passwordSuccessMsg = "")
)

const timeOut = () => {
  setTimeout(clearMsg, 3000)
}

const changePassword = async () => {
  if (!credentials.password) return
  Loading.password = true

  try {
    await authStore.changePassword(credentials.password)
  } catch (err: any) {
    responseMessages.passwordChangeError = err
    Loading.password = false
    timeOut()
    return
  }
  Loading.password = false
  responseMessages.passwordSuccessMsg = "success"
  timeOut()
}

const changeEmail = async () => {
  if (!credentials.email) return
  Loading.email = true

  try {
    await authStore.changeAccountEmail(credentials.email)
  } catch (err: any) {
    responseMessages.emailChangeError = err
    Loading.email = false
    timeOut()
    return
  }
  Loading.email = false
  responseMessages.emailSuccessMsg = "success"
  timeOut()
}

const Loading = reactive({
  email: false,
  password: false,
})
</script>
<template>
  <div class="space-y-8 divide-y divide-gray-200">
    <div>
      <div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Change Profile Information</h3>
        <p class="mt-1 text-sm text-gray-500">This is your user account information.</p>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Change account email
          </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              v-model="credentials.email"
              :disabled="Loading.email"
              autocomplete="email"
              placeholder="Change your account email"
              class="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
            />
            <button
              @click.prevent="changeEmail"
              :disabled="Loading.email"
              class="ml-3 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ Loading.email ? "Loading.." : "Save" }}
            </button>
          </div>
          <p v-if="responseMessages.emailChangeError" class="ml-2 font-semibold text-red-600">
            {{ responseMessages.emailChangeError }}
          </p>
          <p v-if="responseMessages.emailSuccessMsg" class="ml-2 font-semibold text-green-600">
            {{ responseMessages.emailSuccessMsg }}
          </p>
        </div>
        <div class="sm:col-span-4">
          <label class="block text-sm font-medium text-gray-700"> Change account password </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              v-model="credentials.password"
              type="password"
              autocomplete="current-password"
              class="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
            />
            <button
              @click.prevent="changePassword"
              :disabled="Loading.password"
              class="ml-3 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ Loading.password ? "Loading.." : "Save" }}
            </button>
          </div>
          <p v-if="responseMessages.passwordChangeError" class="ml-2 font-semibold text-red-600">
            {{ responseMessages.passwordChangeError }}
          </p>
          <p v-if="responseMessages.passwordSuccessMsg" class="ml-2 font-semibold text-green-600">
            {{ responseMessages.passwordSuccessMsg }}
          </p>
        </div>
        <!-- TODO add picture upload feature -->
        <!-- <div class="sm:col-span-6">
              <label for="photo" class="block text-sm font-medium text-gray-700"> Photo </label>
              <div class="mt-1 flex items-center">
                <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </span>
                <button
                  type="button"
                  class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
            </div> -->
        <!-- TODO add function to about section -->
        <div class="sm:col-span-6">
          <label for="about" class="block text-sm font-medium text-gray-700"> About </label>
          <p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
          <div class="mt-1">
            <textarea
              v-model="about"
              name="about"
              rows="3"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- TODO clear reactive and ref fields to '' -->
  <div class="pt-5">
    <div class="flex justify-end">
      <button
        type="button"
        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <!-- TODO add update function to google firestore -->
      <button
        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </div>
</template>
