<script setup>
import { ref, onMounted } from "vue";
import TableComponent from "@/components/Table.vue";
import ElButton from "@/components/Button.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import Modal from "@/components/Modal.vue";
import apiFetch  from "@/utils/apiFetch.js";

const userData = JSON.parse(localStorage.getItem("user_info")) || { id: null };

// Reactive state
const columns = ref([
  { label: "Name", field: "name" },
  { label: "Age", field: "age" },
  { label: "City", field: "city" },
]);

const editedProject = ref({
  id: "",
  name: "",
  ownerId: "",
  description: null,
  budget: 0,
  companyId: 1,
  startDate: "",
  endDate: "",
});

const showModal = ref(false);
const projectLists = ref([]);
const managers = ref([]);
const loading = ref(true);
const userRole = ref(null)





// Fetch project managers
const getManagers = async () => {
  const url = `/emp/get-all`;
  try {
    const data = await apiFetch(url, { method: "GET" });
    console.log("Managers fetched:", data);

    managers.value = data
        .filter(el => {
          if (!el) {
            console.warn("Missing element:", el);
            return false;
          }
          if (!el.user) {
            console.warn("Missing user in element:", el);
            return false;
          }
          return el.user.role === 'PM';
        })
        .map(el => el); // Keep or transform as needed
    console.log("managers.value", managers.value)

  } catch (error) {
    console.error("Error fetching managers:", error);
  }
};

// Modal controls
const addProject = async () => {
  showModal.value = true;
  document.body.classList.add("no-scroll");
  await getManagers();
};

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove("no-scroll");
};

// Save project
const saveProject = async (e) => {
  e.stopPropagation();
  console.log("Edited project:", editedProject.value);

  const url = `/pro/create`;
  try {
    const data = await apiFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProject.value),
    });
    console.log("Project saved:", data);

    const { companyId } = editedProject.value;
    editedProject.value = { companyId }; // Reset all other fields
    await getProjectList();
    closeModal();
  } catch (error) {
    console.error("Error saving project:", error);
  }
};


const getProjectList = async ()=>{
  loading.value = true
  let role = userData.position? `?position=${userData.position}` : ''
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
  }finally {
    loading.value = false
  }
}

onMounted(() => {
  getProjectList();
  userRole.value = JSON.parse(localStorage.getItem('user_info')).role

});
</script>

<template>
  <div class="p-3">
    <!-- Loading Section -->
    <div v-if="loading" class="loading-container flex justify-center items-center">
      <p class="text-center text-xl font-semibold">Loading...</p>
    </div>

    <!-- Projects Section -->
    <div v-else>
      <h3 class="w-full text-center" style="font-size: 24px">
        {{ projectLists.length > 0 ? 'Your projects' : 'You do not have any projects' }}
      </h3>
      <div class="project_container">
        <ProjectCard :project="project" v-for="(project, index) in projectLists" :key="index" />
      </div>
      <div class="w-full flex justify-end">
        <ElButton button-text="Add new project" @click="addProject" class="add_new_project" v-if="userRole === 'CO' || userRole === 'ROLE_PM'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 24px; height: 24px;">
            <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </ElButton>
      </div>
    </div>

    <!-- Modal Section -->
    <Modal v-if="showModal" @close="closeModal" size="modal-lg" header="Add Project">
      <div class="dark:bg-gray-900 flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
          <form class="space-y-4 flex flex-col gap-4">
            <div>
              <label for="project-name" class="block text-sm font-medium dark:text-gray-300">Project Name</label>
              <input
                type="text"
                v-model="editedProject.name"
                id="project-name"
                name="project-name"
                class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter project name"
              />
            </div>

            <div>
              <label for="project-name" class="block text-sm font-medium dark:text-gray-300">Project description</label>
              <input
                  type="text"
                  v-model="editedProject.description"
                  id="project-description"
                  name="project-description"
                  class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter project description"
              />
            </div>

            <div>
              <label for="project-manager" class="text-white">Project Manager</label>
              <select v-model="editedProject.ownerId" class="h-10 w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="manager in managers" :key="manager.id" :value="manager.id" class="bg-gray-800 hover:bg-gray-600 text-white hover:text-yellow-300">
                  {{ manager.firstname + ' ' + manager.lastname }}
                </option>
              </select>
              <div class="flex flex-row justify-between pt-4 gap-4">
                <p class="start_date">
                  <label for="start_time">Start time</label>
                  <input type="date" v-model="editedProject.startDate" class="w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </p>
                <p class="end_date">
                  <label for="end_time">End  time</label>
                  <input type="date" v-model="editedProject.endDate" class="w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </p>
              </div>
            </div>

            <div>
              <div @click="saveProject($event)"
                class="w-full cursor-pointer text-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add Project
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  </div>
</template>



<style scoped>


button {
  padding: 0.5rem 1rem;
  margin: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #007bff;
  color: white;
}

.project_container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>
