// router/index.js
import { createRouter, createWebHistory } from "vue-router"; // ✅ import createRouter
import ListBook from "@/views/ListBook.vue";
import AddBook from "@/views/AddBook.vue";
import EditBook from "@/views/EditBook.vue"; 
const routes = [
  { path: "/", name: "book.list", component: ListBook },
  { path: "/add-book", name: "book.add", component: AddBook },
  { path: "/edit/:MASACH", name: "book.edit", component: EditBook },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
