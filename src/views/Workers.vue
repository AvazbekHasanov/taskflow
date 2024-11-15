<script setup>
import {ref} from "vue";
import TableComponent from "@/components/Table.vue";
import ElButton from '@/components/Button.vue'

// Defining columns and table data
const columns = ref([
  {label: "Name", field: "name"},
  {label: "Age", field: "age"},
  {label: "City", field: "city"}
]);

const tableData = ref([
  {name: "Alice", age: 25, city: "New York"},
  {name: "Bob", age: 30, city: "San Francisco"},
  {name: "Charlie", age: 35, city: "Los Angeles"},
  {name: "David", age: 40, city: "Chicago"},
  {name: "Eve", age: 28, city: "Miami"},
  {name: "Frank", age: 50, city: "Dallas"},
  {name: "Grace", age: 29, city: "Seattle"}
]);

// Dark mode toggle
const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<template>
  <div>
    <div class="p-1 flex justify-center">
      List of company employees
    </div>
    <TableComponent :columns="columns" :data="tableData" :rowsPerPage="5"/>
    <div class="w-full flex justify-end">
      <ElButton button-text="Add new employee">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 24px; height: 24px;">
          <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
        </svg>
      </ElButton>
    </div>

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
