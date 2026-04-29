import Login from "@/auth/login.vue";
import Register from "@/auth/register.vue";
import About from "@/components/About.vue";
import Contact from "@/components/Contact.vue";
import EditStudent from "@/components/EditStudent.vue";
import Home from "@/components/Home.vue";
import StudentList from "@/components/StudentList.vue";
import { createRouter, createWebHistory, } from "vue-router";

const routes = [
  // Page Routes
  { path: '/', component: Home },
  { path: '/student-list', component: StudentList },
  { path: '/edit-student/:id', component: EditStudent, props: true },
  { path: '/about', component: About, },
  { path: '/contact', component: Contact, },

  // Auth Routes
  { path: '/auth/login', component: Login },
  { path: '/auth/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;