<script setup>
import {onMounted, ref} from "vue";
import TableComponent from "@/components/Table.vue";
import ElButton from '@/components/Button.vue'
import Modal from "@/components/Modal.vue";
import dayjs from "dayjs";
import apiFetch from "@/utils/apiFetch.js";


// Defining columns and table data
const columns = ref([
  { label: "Project Name", field: "projectName" },
  { label: "Task Name", field: "name" },
  { label: "Employee Name", field: "assignedTo" },
  { label: "Description", field: "description" },
  { label: "Prior", field: "prior" },
  { label: "Status", field: "status" },
  {label: "Rating", field: "rating" }
]);

const userData = JSON.parse(localStorage.getItem("user_info")) || { id: null };

const  assignedTo = ref({
  taskId: null,
  taskName: null,
  employeeId: null,
  employeeName: null,
});
const currentTaskData = ref({
  projectId: null,
  description: '',
  score: 0,
  employeeId: null,
  startDate: null,
  prior: null,
  endDate: 'HIGH',
  name: null,
  id: null,
})

const project = ref({});

const showTaskModal = ref(false);

const showModal = ref(false);
const companyWorkers = ref([]);
const workers = ref([]);

const closeModal = () => {
  showModal.value = false;
  showTaskModal.value = false;
  document.body.classList.remove("no-scroll");
};

const openModal = () => {
  showModal.value = true;
  document.body.classList.add("no-scroll");
  getProjects()
};
const getTasks = async ()=>{
  console.log("userData", userData)
    const url = `/task/getAll/${1}`;
  try {
    const data = await apiFetch(url, { method: "GET" });
    console.log("Managers fetched:", data);

companyWorkers.value = data


  } catch (error) {
    console.error("Error fetching managers:", error);
  }
}

const getEmployees = async ()=>{
  const url = `/emp/get-all`;
  try {
    const data = await apiFetch(url, { method: "GET" });
    console.log("Managers fetched:", data);

    workers.value = data
        .filter(employee => employee && typeof employee === 'object') // Filter out null or non-object values
        .map(employee => {
          const fullName = employee.firstname + ' ' + employee.lastname;

          return {
            ...employee,
            full_name: fullName,
          };
        })
        .filter(employee => employee.full_name); // Only include employees with a full_name

    console.log("companyWorkers", companyWorkers.value);
  } catch (error) {
    console.error("Error fetching managers:", error);
  }
}

const currentTab =ref(1);
const projects = ref([]);

const getProjects = async () => {
  const url = `/pro/get-list`;
  try {
    const data = await apiFetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" }
    });
    console.log("Project list:", data);
    projects.value = data
  } catch (error) {
    console.error("Error saving project:", error);
  }
};
const handleWorkerAssigned = (data)=>{
  console.log("handleWorkerAssigned",data);
  showTaskModal.value = true;
  assignedTo.value.taskId = data.id;
  assignedTo.value.taskName = data.name;
  getEmployees()
}

const assignedToWorker = async ()=>{
  let url = `/task/assignTo-emp`;
  console.log("assignedToWorker:", assignedTo);
  let body = JSON.stringify({
    taskId: assignedTo.value.taskId,
    userId: assignedTo.value.employeeId,
  })
  try {
    const data = await apiFetch(url, {
      method: "POST",
      body:body
    })
    console.log("added to employee:", data)
    closeModal()
    await getTasks()
  }catch(error){
    console.log("Error saving task:", error);
  }

}

const saveTask = async (e)=>{
  e.stopPropagation();

  const url = `/task/create`;
  try {
    const data = await apiFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentTaskData.value),
    });
    console.log("Project saved:", data);

    currentTaskData.value = {}
    await getTasks();
    closeModal();
  } catch (error) {
    console.error("Error saving project:", error);
  }
}

onMounted(()=>{
  getTasks()
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
    <TableComponent :columns="columns" :data="companyWorkers" :rowsPerPage="5" @worker-assigned="handleWorkerAssigned" type="task"/>
    <div class="w-full flex justify-end">
      <ElButton button-text="Add new task" @click="openModal" class="add_new_project">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 24px; height: 24px;">
          <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
        </svg>
      </ElButton>
    </div>
    <Modal @close="closeModal"  v-if="showModal"  size="modal-lg" header="Add Task">
      <div class="dark:bg-gray-900 flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
          <form class="space-y-4 flex flex-col gap-4">
            <div>
              <label for="task-name" class="block text-sm font-medium dark:text-gray-300">Task Name</label>
              <input
                  type="text"
                  v-model="currentTaskData.name"
                  id="task-name"
                  name="task-name"
                  class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter task name"
              />
            </div>

            <div>
              <label for="task-desc" class="block text-sm font-medium dark:text-gray-300">Task Description</label>
              <input
                  type="text"
                  v-model="currentTaskData.description"
                  id="task-desc"
                  name="task-desc"
                  class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter task description"
              />
            </div>

            <div>
              <label for="task-priority" class="block text-sm font-medium dark:text-gray-300">Task Priority</label>
              <select
                  v-model="currentTaskData.prior"
                  id="task-priority"
                  name="task-priority"
                  class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <div>
              <label for="project-list" class="text-sm font-medium dark:text-gray-300">Choose Project</label>
              <select
                  v-model="currentTaskData.projectId"
                  id="project-list"
                  class="h-10 w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option
                    v-for="project in projects"
                    :key="project.id"
                    :value="project.id"
                    class="bg-gray-800 hover:bg-gray-600 text-white hover:text-yellow-300"
                >
                  {{ project.name }}
                </option>
              </select>
            </div>

            <div class="flex flex-row justify-between gap-4">
              <div>
                <label for="start-date" class="block text-sm font-medium dark:text-gray-300">Start Date</label>
                <input
                    type="date"
                    v-model="currentTaskData.startDate"
                    id="start-date"
                    name="start-date"
                    class="w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label for="end-date" class="block text-sm font-medium dark:text-gray-300">End Date</label>
                <input
                    type="date"
                    v-model="currentTaskData.endDate"
                    id="end-date"
                    name="end-date"
                    class="w-full mt-1 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>


            <div>
              <div
                  @click="saveTask($event)"
                  class="w-full cursor-pointer text-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Task
              </div>
            </div>
          </form>
        </div>
      </div>

    </Modal>
    <Modal @close="closeModal"  v-if="showTaskModal"  size="modal-lg" header="Assign  task to worker">
      <div style="font-size: 32px">
        Assign "{{assignedTo.taskName}}" task to worker
      </div>
      <div>
        <label for="task-priority" class="mb-2 mt-1 block text-sm font-medium dark:text-gray-300" style="font-size: 24px"> Choose worker </label>
        <select
            v-model="assignedTo.employeeId"
            id="task-priority"
            name="task-priority"
            class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option
              :value="item.user.id"
              v-for="(item, index) in workers"
              :key="index"
          >
            {{ item.full_name }}
          </option>
        </select>


      </div>
      <div
          @click="assignedToWorker($event)"
          class="mt-3 w-full cursor-pointer text-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save
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
