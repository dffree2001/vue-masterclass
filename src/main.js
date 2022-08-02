import { createApp } from 'vue'
import App from './App.vue'
import AppDate from '@/components/AppDate'
import router from '@/router'


const forumApp = createApp(App)
forumApp.use(router)
forumApp.component('AppDate',AppDate)
forumApp.mount('#app')
