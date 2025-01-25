<template>
  <footer id="contact" class="bg-gray-900 p-8 text-center">
    <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
    <form @submit.prevent="submitForm" class="max-w-md mx-auto">
      <input
        type="text"
        v-model="name"
        placeholder="Your Name"
        class="w-full p-2 mb-4 rounded bg-gray-800 text-white"
      />
      <input
        type="email"
        v-model="email"
        placeholder="Your Email"
        class="w-full p-2 mb-4 rounded bg-gray-800 text-white"
      />
      <textarea
        v-model="message"
        placeholder="Your Message"
        class="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        rows="4"
      ></textarea>
      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  </footer>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const name = ref('');
    const email = ref('');
    const message = ref('');

    const submitForm = () => {
      console.log('Form submitted:', { name: name.value, email: email.value, message: message.value });
    };

    return { name, email, message, submitForm };
  },
};
</script>

<style scoped>
/* Scoped styles specific to Footer */
</style>
