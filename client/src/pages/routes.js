import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./home.vue";
import LoginPage from "./login.vue";
import RegisterPage from "./register.vue";
import AllTasks from "@/components/allTasks.vue";
import Stats from "@/components/stats.vue";
import Activity from "@/components/activity.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
    children: [
      {
        path: "/all-task",
        component: AllTasks,
      },
      { path: "/stats", component: Stats },
      { path: "/task-done", component: Activity },
    ],
  },
  { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
