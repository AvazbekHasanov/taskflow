<script setup>
import {onMounted, ref, watch} from "vue";
import TableComponent from "@/components/Table.vue";
import ElButton from '@/components/Button.vue'
import Modal from "@/components/Modal.vue";
import apiFetch from "@/utils/apiFetch.js";

const userData = JSON.parse(localStorage.getItem("user_info")) || { id: null };

const isInfoLoaded = ref(true);

const currentUserData = ref({
  id: null,
  firstName: '',
  lastName: '',
  skills: '',
  email: null,
  position: null,
  birthdate: null,
  passport: null,
})
const showModal = ref(false);

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove("no-scroll");
};

const openModal = () => {
  showModal.value = true;
  console.log("vom,e", showModal.value)
  document.body.classList.add("no-scroll");
};

const getUserDta = async ()=>{
  isInfoLoaded.value = false
  const url = `/emp/findById/${userData.userId}`;
  try {
    const data = await apiFetch(url, { method: "GET" });
    currentUserData.value = data;
    isInfoLoaded.value = true
  } catch (error) {
    console.error("Error fetching managers:", error);
  }
}

const saveUserData = async (e)=>{
  e.stopPropagation();
  const url = `/emp/fill-profile`;
  let body = JSON.stringify({
    firstname: currentUserData.value.firstName,
    lastname: currentUserData.value.lastName,
    profession: currentUserData.value.position,
    goodAt: currentUserData.value.skills,
    userId: userData.userId
  })

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhdmF6YmVrIiwiaWF0IjoxNzM3ODM2ODkzLCJleHAiOjE3Mzc5MjMyOTMsInJvbGUiOiJST0xFX0VNUExPWUVFIiwidXNlcklkIjo1fQ.nBN1t7suq-phH3ElK64OyCmDOjIclPVaXAaBPXtXNMrLl_1RyQOhn4p9vgBhd6aJ");


  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body,
    redirect: "follow"
  };

  fetch("https://sculpin-golden-bluejay.ngrok-free.app/api/emp/fill-profile", requestOptions)
      .then((response) => response.text())
      .then( (result) => {
        console.log(result);
        console.log("Project saved:", result);
        let cache = JSON.parse(localStorage.getItem("user_info"));
        cache.is_full_registrated = true;
        localStorage.setItem("user_info", JSON.stringify(cache));
        currentUserData.value = {  };
        getUserDta();
        closeModal();
      })
      .catch((error) => console.error(error));
}

const getPassportInfo = async ()=>{
  if (currentUserData.value.passport.length<9 || !currentUserData.value.birthdate) return

  const requestOptions = {
    method: "POST",
    redirect: "follow"
  };

  fetch(`https://uzbekcoders.uz/api/public/info/individual?document=${currentUserData.value.passport}&dob=${currentUserData.value.birthdate}&occupation=student`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.content);
        currentUserData.value.firstName = data.content.name;
        currentUserData.value.lastName = data.content.surname;

      })
      .catch((error) => console.error("Error fetching data:", error));

}

watch(
    () => currentUserData.value.birthdate,
    (newVal, oldVal) => {
      if (newVal) {
        getPassportInfo()
      }
    }
);

// Watch passport
watch(
    () => currentUserData.value.passport,
    (newVal, oldVal) => {
      if (newVal && newVal.length >8) {
        getPassportInfo()
      }
    })

onMounted(()=>{
  if (!userData.is_full_registrated ){
    showModal.value = true;
  }else getUserDta()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 dark:text-white">
    <div v-if="isInfoLoaded" class="p-1 flex justify-center " style="font-size: 24px">
      User profile information
    </div>
    <div v-else class="p-1 flex justify-center " style="font-size: 24px">
      Info loading...
    </div>
    <div v-if="isInfoLoaded" class="flex items-center p-6 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out bg-gray-800 text-white">
      <!-- Left Section: Avatar -->
      <div class="mr-6">
        <img class="w-20 h-20 rounded-full border-4 border-indigo-600 shadow-md object-cover"
             src="https://img.myloview.com/stickers/default-avatar-profile-flat-icon-social-media-user-vector-portrait-of-unknown-a-human-image-700-209987471.jpg"
             alt="Avatar">
      </div>

      <!-- Right Section: User Info -->
      <div>
        <h2 class="text-3xl font-extrabold text-gray-100 mb-2">{{currentUserData.firstname + ' '+ currentUserData.lastname}}</h2>
        <p class="text-lg text-gray-300">Profession: <span class="font-semibold text-indigo-400"> {{currentUserData.profession}} </span></p>
        <p class="text-lg text-gray-300">Skills: <span class="font-semibold text-indigo-400">{{currentUserData.goodAt}}</span></p>
        <p class="text-lg text-gray-300">ID: <span class="font-semibold text-indigo-400"> {{currentUserData.id}} </span></p>
      </div>
    </div>



    <Modal v-if="showModal" @close="closeModal" size="modal-lg" header="Full profile information">
      <form class="md:col-span-2 w-full py-6 px-6 sm:px-16" id="registration-form" >

        <div class="space-y-6">
          <div class="flex gap-2">

            <div class="w-1/2">
              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100 " >Passport series</label>
              <div class="relative flex items-center">
                <input name="name" type="text" v-model="currentUserData.passport" required class="text-gray-800 uppercase bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md
                 outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter user passport series" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <div class="w-1/2">
              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100">Birthdate</label>
              <div class="relative flex items-center">
                <input name="name" type="date" v-model="currentUserData.birthdate" required class="text-gray-800 bg-white border
                  border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter birthdate" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="flex gap-2">

            <div class="w-1/2">
              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100">First name</label>
              <div class="relative flex items-center">
                <input readonly name="name" type="text" v-model="currentUserData.firstName" required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md
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
                <input readonly name="name" type="text" v-model="currentUserData.lastName" required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter name" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
          </div>


          <div class="flex gap-2">

            <div class="w-1/2">
              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100">Role</label>
              <div class="relative flex items-center">
                <input name="name" type="text" v-model="currentUserData.position"  required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter employee role" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <div class="w-1/2">
              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100">Skills</label>
              <div class="relative flex items-center">
                <input name="skills" type="text" v-model="currentUserData.skills"  required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Skills" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
          </div>


          <!--            <div>-->
          <!--              <label class="text-gray-800 text-sm mb-2 block dark:text-gray-100">Email address</label>-->
          <!--              <div class="relative flex items-center">-->
          <!--                <input name="email" type="email" v-model="currentUserData.email"  required class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 pr-8 py-2.5 rounded-md outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter email" />-->
          <!--                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">-->
          <!--                  <defs>-->
          <!--                    <clipPath id="a" clipPathUnits="userSpaceOnUse">-->
          <!--                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>-->
          <!--                    </clipPath>-->
          <!--                  </defs>-->
          <!--                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">-->
          <!--                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>-->
          <!--                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>-->
          <!--                  </g>-->
          <!--                </svg>-->
          <!--              </div>-->
          <!--            </div>-->
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
