<script >
import { RouterLink, RouterView } from 'vue-router'
import {inject, onMounted} from "vue";
export default {
  name: 'App',
  setup() {
    const toggleDarkMode = inject('$toggleDarkMode')
    onMounted(() => {
      localStorage.setItem('darkMode', true)
      const savedDarkMode = localStorage.getItem('darkMode')
        toggleDarkMode(savedDarkMode)
    })
  }
}
</script>

<template class="dark">
  <RouterView />
</template>

<style scoped>

</style>
