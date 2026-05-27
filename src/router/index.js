import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/Home.vue";
import StudentList from "@/components/StudentList.vue";
import EditStudent from "@/components/EditStudent.vue";
import About from "@/components/About.vue";
import Contact from "@/components/Contact.vue";
import Detail from "@/components/Detail.vue";

import Login from "@/components/Login.vue";
import Register from "@/auth/Register.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/student-list", component: StudentList },
  { path: "/edit-student/:id", component: EditStudent, props: true },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/detail/:id", component: Detail },

  { path: "/auth/login", component: Login },
  { path: "/auth/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
