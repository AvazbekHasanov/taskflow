<template>
  <div class="project-card">
    <div class="header">
      <h3 class="project-name">{{ project.name }}</h3>
      <div class="dropdown" ref="dropdown">
        <button class="options-btn" @click="toggleDropdown">⋮</button>
        <ul v-if="dropdownVisible" class="dropdown-menu">
          <li @click="viewProject">View Project</li>
          <li @click="editProject">Edit Project</li>
          <li @click="deleteProject">Delete Project</li>
          <li @click="enterChat">Enter  chat</li>
        </ul>
      </div>
    </div>
    <div class="task-info">
      <p>Умумий топшириқлар сони: <span>{{ project.total_tasks }}</span></p>
      <p>Актив топшириқлар сони: <span>{{ project.active_tasks }}</span></p>
    </div>
    <div class="manager-info">
      <img :src="`https://smart-office.uz/uploads/images/${project.img}`" alt="Manager's Avatar" class="manager-avatar" />
      <span>Лойиҳа раҳбари:</span>
      <span class="manager-name">{{ project.owner_name }}</span>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";

export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dropdownVisible: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    closeDropdown(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.dropdownVisible = false;
      }
    },
    viewProject() {
      console.log('Viewing project:', this.project.name);
    },
    editProject() {
      console.log('Editing project:', this.project.name);
    },
    deleteProject() {
      console.log('Deleting project:', this.project.name);
    },
    enterChat(){
      router.push(`/cabinet/chat?project_id=${this.project.id}`);
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  },
};
</script>



<style scoped>
.project-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.options-btn {
  background: none;
  border: none;
  font-size: 1.5em;
  color: #888;
  cursor: pointer;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  @apply bg-white dark:bg-gray-800 dark:text-white;
  position: absolute;
  top: 100%;
  right: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 150px;
}

.dropdown-menu li {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-menu li:hover {
    opacity: 0.7;
}

.task-info p {
  margin: 4px 0;
  font-size: 0.9em;
}

.task-info span {
  font-weight: bold;
}

.manager-info {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.manager-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.manager-name {
  font-weight: bold;
}
</style>

