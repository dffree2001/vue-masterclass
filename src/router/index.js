import HomePage from "@/pages/HomePage.vue";
import ThreadShow from "@/pages/ThreadShow.vue";
import NotFound from "@/pages/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";
import sourceData from '@/data.json'

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true,
    beforeEnter (to, from, next) {
        // check if thread exists
        const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
        // if exists continue. 
        if (threadExists) {
            return next()
        } else {
            next({ 
                name: 'NotFound',
                params: { pathMatch: to.path.substring(1).split('/') },
                query: to.query,
                hash: to.hash
            })
        }
        //If doesn't exist, redirect to not found page
    }
  },
  {
    path: "/:pathMatch(.*)*", 
    name: "NotFound", 
    component: NotFound,
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
})
