<script setup>
import {onMounted, ref, watch} from "vue";
import TableComponent from "@/components/Table.vue";
import ElButton from '@/components/Button.vue'
import Modal from "@/components/Modal.vue";
import apiFetch from "@/utils/apiFetch.js";
import {toUpper} from "lodash";

// Defining columns and table data
const columns = ref([
  {label: "Full name", field: "full_name"},
  {label: "Position", field: "profession"},
  {label: "Skills", field: "goodAt"},

]);
const userData = JSON.parse(localStorage.getItem("user_info")) || { id: null };
const emails = ref(null)
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
const inviteWorkers = async () => {
  let url = '/emp/invite'
};

const getEmployees = async ()=>{
    const url = `/emp/get-all`;
  try {
    const data = await apiFetch(url, { method: "GET" });
    console.log("Managers fetched:", data);

    companyWorkers.value = data
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

const saveUserData = async (e)=>{
  e.stopPropagation();
  const url = `/emp/invite`;
  console.log("emails", emails.value.split(","));
  try {
    const data = await apiFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emails.value.split(",")),
    });
    console.log("Project saved:", data);
    await getEmployees();
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
  <div class="bg-white dark:bg-gray-800 dark:text-white">
    <div class="p-1 flex justify-center">
      List of company employees
    </div>
    <TableComponent :columns="columns" :data="companyWorkers" :rowsPerPage="5"/>
    <div class="w-full flex justify-end">
      <ElButton button-text="Invite employees" @click="openModal" class="add_new_item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 24px; height: 24px;">
          <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
        </svg>
      </ElButton>
    </div>
 <Modal v-if="showModal" @close="closeModal" size="modal-lg" header="Add employee">
        <form class="md:col-span-2 w-full py-6 px-6 sm:px-16" id="registration-form" >

            <div class="space-y-6">
              <div class="flex gap-2">

                <div class="w-full">
                  <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100 " >Enter workers' emails to invite</label>
                  <div class="relative flex items-center">
                    <input name="name" type="text" v-model="emails" required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md
                 outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="avabek@gmail.com,test@gmail.com" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                    </svg>
                  </div>
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
