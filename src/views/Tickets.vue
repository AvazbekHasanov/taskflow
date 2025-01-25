<script setup>
import {onMounted, ref} from "vue";
import TableComponent from "@/components/Table.vue";
import ElButton from '@/components/Button.vue'
import Modal from "@/components/Modal.vue";

// Defining columns and table data
const columns = ref([
  {label: "User Note", field: "text"},
  {label: "Added link", field: "link"},
  {label: "User contact", field: "email"},
    {label: "Project name", field: "project_name"}
]);
const userData = JSON.parse(localStorage.getItem("user_info")) || { id: null };

const currentUserData = ref({
  id: null,
  firstName: '',
  lastName: '',
  email: null,
  position: null
})
const showModal = ref(false);
const companyWorkers = ref([]);

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove("no-scroll");
};

const openModal = () => {
  showModal.value = true;
  console.log("vom,e", showModal.value)
  document.body.classList.add("no-scroll");
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
    const url = `https://helped-lucky-prawn.ngrok-free.app/api/v1/feedback/list/`;
  try {
    const data = await fetchData(url, { method: "GET" });

companyWorkers.value = data.map(employee => {
  return {
    ...employee, // Spread the existing properties of the employee
    project_name: employee.projectId.name, // Add or overwrite the project_name property
  };
});
    console.log("companyWorkers", companyWorkers)

  } catch (error) {
    console.error("Error fetching managers:", error);
  }
}


onMounted(()=>{
  getEmployees()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 dark:text-white">
    <div class="p-1 flex justify-center">
      List of project user's comment
    </div>
    <TableComponent :columns="columns" :data="companyWorkers" :rowsPerPage="5"/>
 <Modal v-if="showModal" @close="closeModal" size="modal-lg" header="Add employee">
        <form class="md:col-span-2 w-full py-6 px-6 sm:px-16" id="registration-form" >
          <div class="mb-6">
            <h3 class="text-gray-800 text-2xl font-bold dark:text-gray-100">Create an Employee Account</h3>
          </div>

          <div class="space-y-6">
            <div class="flex gap-2">

            <div class="w-1/2">
              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100">First name</label>
              <div class="relative flex items-center">
                <input name="name" type="text" v-model="currentUserData.firstName" required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md
                 outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter name" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <div class="w-1/2">
              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100">Last name</label>
              <div class="relative flex items-center">
                <input name="name" type="text" v-model="currentUserData.lastName" required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter name" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            </div>

             <div>
              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100">Role</label>
              <div class="relative flex items-center">
                <input name="name" type="text" v-model="currentUserData.position"  required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter employee role" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100">Email address</label>
              <div class="relative flex items-center">
                <input name="email" type="email" v-model="currentUserData.email"  required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter email" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div class="!mt-12">
            <button type="button" @click="saveUserData($event)" class="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:text-gray-100">
              Create an Employee Account
            </button>
          </div>
        </form>
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
</style>
