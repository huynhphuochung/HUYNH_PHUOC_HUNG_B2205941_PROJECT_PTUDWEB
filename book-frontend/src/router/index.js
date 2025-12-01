import { createRouter, createWebHistory } from "vue-router";
import ListBook from "@/views/ListBook.vue";
import AddBook from "@/views/AddBook.vue";
import EditBook from "@/views/EditBook.vue";
import login from "@/views/Login.vue";

const routes = [
  { path: "/", redirect: "/login" }, // 👈 mở web vào login trước

  { path: "/login", name: "login", component: login }, // 👈 route login có thật

  { path: "/books", name: "book.list", component: ListBook },
  { path: "/add-book", name: "book.add", component: AddBook },
  { path: "/edit/:MASACH", name: "book.edit", component: EditBook },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 🔒 Chặn truy cập nếu chưa login
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn && to.name !== "login") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
