<script setup>
import {onMounted, ref} from "vue";
import TableComponent from "@/components/Table.vue";
import ElButton from '@/components/Button.vue'
import Modal from "@/components/Modal.vue";
import dayjs from "dayjs";

// Defining columns and table data
const columns = ref([
  { label: "Project Name", field: "projectName" },
  { label: "Employee Name", field: "employeeName" },
  { label: "Description", field: "desc" },
  { label: "Start Date", field: "startDate" },
  { label: "Duration (hour)", field: "duration" },
  { label: "Status", field: "status" }
]);
const userData = JSON.parse(localStorage.getItem("user_info")) || { id: null };

const currentTaskData = ref({
  projectId: null,
  desc: null,
  employeeId: null,
  duration: null,
  id: null
})
const showModal = ref(false);
const companyWorkers = ref([]);

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove("no-scroll");
};

const openModal = () => {
  showModal.value = true;
  console.log("showModal", showModal)
  document.body.classList.add("no-scroll");
  getProjects()
};
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
const getEmployees = async ()=>{
    const url = `https://helped-lucky-prawn.ngrok-free.app/api/v1/task/list/`;
  try {
    const data = await fetchData(url, { method: "GET" });
    console.log("Managers fetched:", data);

companyWorkers.value = data.map(task => ({
  projectName: task.projectId?.name || "N/A", // Fallback to "N/A" if name is null or undefined
  employeeName: [
    task.employeeId?.firstName, // Include only if not null/undefined
    task.employeeId?.lastName
  ]
    .filter(Boolean) // Remove null/undefined/empty values
    .join(" ") || "Not taken", // Fallback if no name is available
  desc: task.desc || "No description available", // Fallback for description
  startDate: task.startDate
    ? dayjs(task.startDate).format("DD MMM YYYY, HH:mm")
    : "No start date", // Handle missing start date
  duration: task.duration || "No duration specified", // Fallback for duration
  status: task.status || "Status unknown" // Fallback for status
}));


    console.log("companyWorkers", companyWorkers.value);
  } catch (error) {
    console.error("Error fetching managers:", error);
  }
}


const currentTab =ref(1);
const projects = ref([]);

const getProjects = async () => {
  let role = userData.position? `?position=${userData.position}` : ''
    const url = `https://helped-lucky-prawn.ngrok-free.app/api/v1/project/list/${userData.id}/${role}`;
  try {
    const data = await fetchData(url, { method: "GET" });
    console.log("Managers fetched:", data);
    projects.value = data;
  } catch (error) {
    console.error("Error fetching managers:", error);
  }
};
const changeTab = (tab_id)=>{
  currentTab.value = tab_id
}

const saveTask = async (e)=>{
  e.stopPropagation();

  const url = `https://helped-lucky-prawn.ngrok-free.app/api/v1/task/create/`;
  try {
    const data = await fetchData(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentTaskData.value),
    });
    console.log("Project saved:", data);

    currentTaskData.value = {}
    getEmployees();
    closeModal();
  } catch (error) {
    console.error("Error saving project:", error);
  }
}

onMounted(()=>{
  getEmployees()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 dark:text-white p-4">
<!--    v-if="userData.role === 'TM'"-->
<!--    <div class="tabs flex flex-row gap-4 w-full" >-->
<!--      <div class="tab-item w-1/2" @click="changeTab(1)" :class="{ active: currentTab === 1 }"> My tasks </div>-->
<!--      <div class="tab-item w-1/2" @click="changeTab(2)" :class="{ active: currentTab === 2 }"> Control tasks </div>-->
<!--    </div>-->
    <div class="p-1 flex justify-center" style="font-size: 24px ; margin-top: 10px ">
      Tasks list
    </div>
    <TableComponent :columns="columns" :data="companyWorkers" :rowsPerPage="5" type="task"/>
    <div class="w-full flex justify-end">
      <ElButton button-text="Add new task" @click="openModal" class="add_new_project">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 24px; height: 24px;">
          <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
        </svg>
      </ElButton>
    </div>
    <Modal v-if="showModal"  size="modal-lg" header="Add Task">
      <div class="dark:bg-gray-900 flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
          <form class="space-y-4 flex flex-col gap-4">
            <div>
              <label for="project-name" class="block text-sm font-medium dark:text-gray-300">Task description</label>
              <input
                type="text"
                v-model="currentTaskData.desc"
                id="project-name"
                name="project-name"
                class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter task description"
              />
            </div>

            <div>
              <label for="project_list" class="text-white">Chose project</label>
              <select v-model="currentTaskData.projectId" class="h-10 w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option v-for="manager in projects" :key="manager.id" :value="manager.id" class="bg-gray-800 hover:bg-gray-600 text-white hover:text-yellow-300">
                  {{ manager.name }}
                </option>
              </select>
              <div class="flex flex-row justify-between pt-4 gap-4">
                <p class="start_date">
                  <label for="start_time">Duration(hour)</label>
                  <input type="text" v-model="currentTaskData.duration" class="w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </p>
<!--                <p class="end_date">-->
<!--                  <label for="end_time">End  time</label>-->
<!--                  <input type="date" v-model="editedProject.endDate" class="w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">-->
<!--                </p>-->
              </div>
            </div>

            <div>
              <div @click="saveTask($event)"
                class="w-full cursor-pointer text-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>

  </div>



</template>

<style scoped>

.active{
  opacity: 0.7;
}
button {
  padding: 0.5rem 1rem;
  margin: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #007bff;
  color: white;
}

.tab-item{
      background-color: rgb(17 24 39);
    cursor: pointer;
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
}
.tab-item:hover{
  opacity: 0.7;
}

</style>
