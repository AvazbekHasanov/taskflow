<template>
  <div class="w-full flex flex-col ">
    <div class="user_info">
      <div>
        <img src="../../public/svgs/cevron-left.svg" alt="none" class="back_icon" />
      </div>
      <div>
        <img
          v-if="selectedChatInfo?.userData?.photo"
          :src="selectedChatInfo.userData.photo"
          alt="User Photo"
          style="border-radius: 50%; width: 48px"
        />
      </div>
      <div class="dark:text-white">{{ selectedChatInfo?.userData?.full_name || 'Unknown User' }}</div>
    </div>
    <div class="flex-grow p-4 overflow-auto" ref="messagesContainer">
      <div
        v-if="selectedChatInfo?.messages?.length > 0"
        class="flex justify-start mb-4"
        v-for="message in selectedChatInfo.messages"
        :key="message.id"
        :class="{ 'justify-end': message.is_owner }"
      >
        <div v-if="!message.is_owner" class="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-2"></div>
        <div class="bg-white dark:bg-gray-800 rounded shadow" style="padding: 5px 20px">
          <p class="font-bold text-black dark:text-white">{{ message.from || 'Unknown' }}</p>
          <p
            class="text-black dark:text-white"
            v-html="formatTextWithBr(message.content || '')"
            v-if="message.content"
          ></p>
        </div>
        <div v-if="message.is_owner" class="flex-shrink-0 ml-2 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
      <div v-else class="free_content">
        No messages here yet.. Start chatting
      </div>
    </div>
    <ChatInput @sendMessage="sendMessage" />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, getCurrentInstance, watch, nextTick } from 'vue';
import ChatInput from '@/components/ChatInput.vue';

const props = defineProps({
  selectedChatInfo: {
    type: Object,
    required: true,
    default: () => ({
      userData: { photo: null, full_name: '', chat_id: null },
      messages: [],
    }),
  },
});

const { proxy } = getCurrentInstance();
const messagesContainer = ref(null);

const sendMessage = async (arg) => {
  if (!arg.text || !arg.text.trim()) {
    console.warn('Cannot send an empty message');
    return;
  }

  const data = {
    message: arg.text,
    chat_id: props.selectedChatInfo.userData?.chat_id,
  };

  try {
    const result = await proxy.$axios.post('/message/new/message', data);
    if (result?.data) {
      props.selectedChatInfo.messages.push(result.data);
      scrollToBottom();
    }
  } catch (error) {

    console.error('Error sending message:', error);
  }
};

const formatTextWithBr = (text, to = '<br>', from = '\n') => {
  return text.replaceAll(from, to);
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth',
    });
  }
};

watch(props.selectedChatInfo, () => {
  nextTick(scrollToBottom);
});

onMounted(() => {
  scrollToBottom();
});
</script>

<style>
.free_content {
  @apply flex items-center justify-center dark:text-white w-full h-full;
}
.user_info {
  @apply p-4 flex flex-row gap-4 items-center border-b-2;
}

.back_icon {
  fill: #000;
  cursor: pointer;
}

@media (prefers-color-scheme: dark) {
  .back_icon {
    fill: #fff; /* Change to white in dark mode */
  }
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
