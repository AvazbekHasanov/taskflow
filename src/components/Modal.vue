<template id="modal-template">
  <div class="modal-mask">
    <div class="modal-wrapper flex">
      <div class="modal-container bg-white dark:bg-gray-900">
        <!-- Header Section -->
        <div class="modal-header flex justify-between items-center border-b pb-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            <slot name="header"> {{ header }} </slot>
          </h3>
          <button
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            @click="closeModal"
          >
            ✕
          </button>
        </div>

        <!-- Body Section -->
        <div class="modal-body py-4">
          <slot style="width: 500px;"></slot>
        </div>

        <!-- Close Section -->
        <div class="modal-footer flex justify-end pt-2 border-t">
          <button
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:{
    header: {
      type: String,
      default: ' '
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      return
      const modalContainer = document.querySelector('.modal-container');

      const parentHasAddNewProject = (e.target.closest('.add_new_project') || e.target.closest('.add_new_item')) !== null;

      if (!modalContainer.contains(e.target) && !parentHasAddNewProject && !e.target.classList.contains('dropdown-menu-item')) {
        this.$emit('close');
      }
    });
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: fit-content;
  margin: 0 auto;
  height: fit-content;
  max-height: fit-content;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
}

.modal-body {
  margin: 20px 0;
  min-width: 50vw;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e5e5;
  padding-top: 10px;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
