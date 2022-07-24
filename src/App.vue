<script lang="ts" setup>
import { onMounted } from "vue"
import { useAuthStore } from "./stores/authStore"

const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})
</script>

<template>
  <routerView></routerView>
</template>
