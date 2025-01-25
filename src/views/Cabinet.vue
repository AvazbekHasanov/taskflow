<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg"/>
    <sidebar class="sidebar-container bg-white dark:bg-gray-900" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <Navbar></Navbar>
      </div>
      <div class="scrollable bg-white dark:bg-gray-800 dark:text-white" style="height: calc(100vh - 70px) ; overflow: auto; ">
        <router-view  />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar/index.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      device: 'desktop'
    }
  },
  computed: {
    sidebar() {
      return {opened: true}
    },
    fixedHeader() {
      return false
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
