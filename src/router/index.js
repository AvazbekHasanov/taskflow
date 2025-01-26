import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Registration.vue'
import Cabinet from "@/views/Cabinet.vue";
import NotFound from '@/views/NotFound.vue'
import Main from '@/views/Main.vue'
import jwtDecode from 'vue-jwt-decode'
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import Tickets from "@/views/Tickets.vue";
import Tasks from "@/views/Tasks.vue";
import Workers from "@/views/Workers.vue"
import Projects from "@/views/Projects.vue";
import Chat from "@/views/Chat.vue";

// Create router instance
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
{
  path: '/cabinet',
  name: 'cabinet',
  component: Cabinet,
  children: [
    {
      path: 'dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: 'profile',
      name: 'profile',
      component: Profile
    },
    {
      path: 'tickets',
      name: 'tickets',
      component: Tickets
    },
    {
      path: 'tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: 'workers', // Ensure this path exists
      name: 'workers',
      component: Workers // Import and add Workers component here
    },
    {
      path: 'projects', // Ensure this path exists
      name: 'projects',
      component: Projects // Import and add Workers component here
    },
    {
      path: 'chat', // Ensure this path exists
      name: 'chat',
      component: Chat // Import and add Workers component here
    }
  ]
},

        {
            path: '/auth/login',
            name: 'login',
            component: Login
        },

        {
            path: '/auth/registration/:user_id?',
            name: 'registration',
            component: Register
        },

        {
            path: '/',
            name: 'main',
            component: Main
        },

        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFound
        }
    ]
})

const publicRoutes = ['login', 'registration']

router.beforeEach((to, from, next) => {



  if ( publicRoutes.includes(to.name)) {
    next();
  } else {
      let jwt = localStorage.getItem('access_token');
      if (!jwt) {
          next({
              name: 'login',
              query: {next: encodeURIComponent(to.fullPath)}
          });
      }
      let userData = JSON.parse(localStorage.getItem('user_info'));
    if (userData.exp <  Date.now()/1000) {
      next({
        name: 'login',
        query: { next: encodeURIComponent(to.fullPath) }
      });
    } else {
        if (!userData.is_full_registrated && to.name !== 'profile') {

            router.push(`/cabinet/profile`);
        } else {
            next();
        }
    }
  }
});

export default router
