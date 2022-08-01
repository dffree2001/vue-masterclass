import PageHome from "@/pages/Home.vue";
import PageThreadShow from "@/pages/ThreadShow.vue";
import PageNotFound from "@/pages/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";
import sourceData from '@/data.json'

const routes = [
  {
    path: "/",
    name: "Home",
    component: PageHome,
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: PageThreadShow,
    props: true,
    beforeEnter (to, from, next) {
        // check if thread exists
        const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
        // if exists continue. 
        if (threadExists) {
            return next()
        } else {
            next({ 
                name: 'PageNotFound',
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
    name: "PageNotFound", 
    component: PageNotFound,
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
})
