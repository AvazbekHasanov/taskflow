<template>
  <div :class="{'has-logo': showLogo}">
    <div class="flex flex-row">
       <Edit style="width: 24px"/>
      <p style="width: 50px;">Mars</p>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="menuStyles.menuBg"
        :text-color="menuStyles.menuText"
        :unique-opened="false"
        :active-text-color="menuStyles.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import {Edit} from "@element-plus/icons-vue";

export default {
  components: {Edit, SidebarItem, Logo },
  props: {
    showLogo: {
      type: Boolean,
      default: true
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    menuStyles: {
      type: Object,
      default: () => ({
        menuBg: '#ffffff', // Default background color
        menuText: '#303133', // Default text color
        menuActiveText: '#409EFF' // Default active text color
      })
    },
    routes: {
      type: Array,
      default: () => [
    { path: '/cabinet/dashboard', name: 'Dashboard', meta: { title: 'Dashboard', icon: 'Document' } },
    { path: '/cabinet/projects', name: 'Projects', meta: { title: 'Projects', icon: 'Briefcase' } },
    { path: '/cabinet/workers', name: 'Employees', meta: { title: 'Employees', icon: 'User' } },
    { path: '/cabinet/tasks', name: 'Tasks', meta: { title: 'Tasks', icon: 'List' } },
    { path: '/cabinet/tickets', name: 'Tickets', meta: { title: 'Tickets', icon: 'Tickets' } },
    { path: '/cabinet/profile', name: 'Profile', meta: { title: 'Profile', icon: 'UserFilled' } },
        // Add other static routes as needed
      ]
    }
  },
  computed: {
    activeMenu() {
      const { meta, path } = this.$route
      return meta.activeMenu || path
    }
  }
}
</script>

<style >
.has-logo {
  /* Additional styling for 'has-logo' class if needed */
}
.el-menu{
  background-color: transparent !important;
}
</style>
