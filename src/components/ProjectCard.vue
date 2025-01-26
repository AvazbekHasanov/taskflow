<template>
  <div class="project-card">
    <div class="header">
      <h3 class="project-name">{{ project.name }}</h3>
      <div class="dropdown" ref="dropdown">
        <button class="options-btn" @click="toggleDropdown">⋮</button>
        <ul v-if="dropdownVisible" class="dropdown-menu">
          <li v-if="!is_public" @click="viewProject">View Project</li>
          <li v-if="!is_public" @click="editProject">Edit Project</li>
          <li v-if="!is_public" @click="deleteProject">Delete Project</li>
          <li v-if="!is_public" @click="enterChat">Download documentation</li>
          <li class="dropdown-menu-item" v-if="is_public" @click="sendFeedback">Send feedback</li>
        </ul>
      </div>
    </div>
    <div class="task-info" v-if="project.tasks_count && project.tasks_count>0">
      <p>All tasks count: <span>{{ project.tasks_count }}</span></p>
    </div>
    <div class="manager-info">
      <img :src="`https://www.bank-kredit.uz/media/store/images/png/platon_user.png`" alt="Manager's Avatar" class="manager-avatar" />
      <span>Project Manager:</span>
      <span class="manager-name">{{ project.owner.firstname + ' ' + project.owner.lastname}}</span>
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
    is_public: {
      type: Boolean,
      default: false,
    }
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
    sendFeedback(){
      this.$emit('sendFeedback', this.project);
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
      window.open(`https://sculpin-golden-bluejay.ngrok-free.app/api/report/download/${this.project.id}`, '_blank');
      // router.push(`/cabinet/chat?project_id=${this.project.id}`);
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

