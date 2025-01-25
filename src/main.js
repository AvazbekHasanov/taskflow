import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss'

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add all solid icons to the library
library.add(fas);

import $axios from './axios.js'

const app = createApp(App)


app.config.warnHandler = () => {
  // Do nothing, effectively muting all warnings
};

const toggleDarkMode = (darkMode) => {
    if (darkMode !== null) {
        darkMode = JSON.parse(darkMode);
        let headEl = document.getElementById("app");
        if (darkMode) {
            headEl.classList.add('dark');
        } else if(headEl && !darkMode){
            headEl.classList.remove('dark');
        }else {
            headEl.classList.remove('dark');
        }

    }
}

app.provide('$toggleDarkMode', toggleDarkMode)
app.config.globalProperties.$axios = $axios;

app.use(createPinia())
app.use(router)
app.use(VueTheMask)
app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Register FontAwesomeIcon globally
app.component('font-awesome-icon', FontAwesomeIcon);


app.mount('#app')


