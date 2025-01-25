<template>
  <button  data-testid="send-button" class="button ">
    <slot></slot>
    <span class="ml-2">{{ buttonText }}</span>
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    buttonText: {
      type: String,
      required: true,
    }
  },
  methods: {
    sendMessage() {
      // Handle send message logic
      console.log("Message sent");
    }
  }
}
</script>

<style scoped>
.button {
  @apply mb-1 me-1 flex cursor-pointer  items-center justify-center
  rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none
  focus-visible:outline-black disabled:text-[#f4f4f4]
  disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white  disabled:bg-[#D7D7D7]
}

.icon-2xl {
  width: 32px;
  height: 32px;
  color: white;
}


.ml-2 {
  margin-left: 8px;
}
</style>
