<template>
  <section id="projects" class="py-20 px-8 bg-gray-700">
    <h2 class="text-3xl font-bold mb-6 text-center text-white">Projects</h2>
    <Swiper
      :slides-per-view="1"
      :space-between="20"
      :autoplay="{ delay: 1000}"
      :breakpoints="{
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }"
      class="rounded-lg shadow-md"
    >
      <SwiperSlide
        v-for="(project, index) in projectLists"
        :key="index"
        class="bg-gray-800 text-white p-4 rounded shadow-md flex flex-col items-center"
      >
        <ProjectCard :project="project" is_public="true" @sendFeedback="sendFeedback"/>
      </SwiperSlide>
    </Swiper>
  </section>

  <Modal v-if="showModal" @close="closeModal" size="modal-lg" header="Send feedback project">
             <form class="space-y-4 flex flex-col gap-4">
            <div>
              <label for="project-name" class="block text-sm font-medium dark:text-gray-300"> Feedback to {{selectedProject.name}}  project</label>
            </div>

            <div>
              <label for="project-manager" class="text-white">Note</label>
              <textarea v-model="feedbackData.text" type="text" class="p-4  w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              <div class="flex flex-col justify-between pt-4 gap-4">
                <p class="start_date">
                  <label for="start_time">Link</label>
                  <input type="text" v-model="feedbackData.link" class="h-10 p-4 w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </p>
                <p class="end_date">
                  <label for="end_time">Enter your contact</label>
                  <input placeholder="Enter email or phone number" type="text" v-model="feedbackData.email" class=" h-10 p-4 w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </p>
              </div>
            </div>

            <div>
              <div @click="sendToBack($event)"
                class="w-full cursor-pointer text-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Send
              </div>
            </div>
          </form>
  </Modal>


</template>

<script setup>
import {Swiper, SwiperSlide} from "swiper/vue"; // Import Swiper components
import "swiper/swiper-bundle.css"; // Import Swiper styles
import {ref, onMounted} from "vue";
import ProjectCard from "@/components/ProjectCard.vue";
import Modal from '@/components/Modal.vue'
import apiFetch from "@/utils/apiFetch.js";

const projectLists = ref([]);
const showModal = ref(false);
const selectedProject = ref({});

const feedbackData = ref({
  text: null,
  email: null,
  link: null,
  projectId: selectedProject.value.id
})
const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove("no-scroll");
};

const sendToBack = async (e)=>{
  e.stopPropagation();
    const url = `https://helped-lucky-prawn.ngrok-free.app/api/v1/feedback/create/`;
  try {
    const data = await fetchData(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...feedbackData.value})
    });
    closeModal()
    feedbackData.value = {}
  } catch (error) {
    console.error("Error fetching project list:", error);
  }
}

// Fetch helper function


const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      mode: "cors",
      credentials: "include",
      ...options,
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

// Fetch project list
const getProjectList = async () => {
  const url = `/pro/get-list`;
  try {
    const data = await apiFetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" }
    });
    console.log("Project list:", data);
    projectLists.value = data
  } catch (error) {
    console.error("Error saving project:", error);
  }
};

const sendFeedback = (item)=>{
  showModal.value = true;
  document.body.classList.add("no-scroll");
  console.log("come feedback", item);
  selectedProject.value = {...item};
  feedbackData.value.projectId = item.id
}

onMounted(() => {
  getProjectList();
});
</script>

<style scoped>
/* Swiper customization */
.swiper {
  padding: 20px 0;
}

.swiper-slide {
  display: flex;
  justify-content: center;
}
</style>
