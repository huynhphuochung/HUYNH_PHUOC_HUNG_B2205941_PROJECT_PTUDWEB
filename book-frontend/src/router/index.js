import { createRouter, createWebHistory } from "vue-router";
import ListBook from "@/views/ListBook.vue";
import AddBook from "@/views/AddBook.vue";
import EditBook from "@/views/EditBook.vue";
import login from "@/views/Login.vue";
import DocgiaListBook from "@/views/DocgiaListBook.vue";
import DocGiaHistory from "@/views/Docgiahistory.vue";
import Docgiaregister from "@/views/Docgiaregister.vue";
import Logindocgia from "@/views/Logindocgia.vue";
const routes = [
  { path: "/", redirect: "/login" },

  { path: "/login", name: "login", component: login },

  // Quản lý
  {
    path: "/books",
    name: "book.list",
    component: ListBook,
    meta: { role: "admin" },
  },
  {
    path: "/add-book",
    name: "book.add",
    component: AddBook,
    meta: { role: "admin" },
  },
  {
    path: "/edit/:MASACH",
    name: "book.edit",
    component: EditBook,
    meta: { role: "admin" },
  },

  // Đoc giả
  {
    path: "/docgia/books",
    name: "docgia.books",
    component: DocgiaListBook,
    meta: { role: "docgia" },
  },
  {
    path: "/docgia/history",
    name: "docgia.history",
    component: DocGiaHistory,
    meta: { role: "docgia" },
  },
  {
    path: "/docgia/register",
    name: "docgia.register",
    component: Docgiaregister,
  },
  { path: "/docgia/login", name: "login.docgia", component: Logindocgia },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 🔒 Chặn truy cập nếu chưa login
router.beforeEach((to, from, next) => {
  const admin = localStorage.getItem("loggedIn");
  const docgia = localStorage.getItem("docgia");

  // 1️⃣ Nếu vào trang admin mà chưa login admin → chuyển về login admin
  if (to.meta.role === "admin" && !admin) {
    return next({ name: "login" });
  }

  // 2️⃣ Nếu vào trang độc giả mà chưa login độc giả → chuyển về login độc giả
  if (to.meta.role === "docgia" && !docgia) {
    return next({ name: "login.docgia" });
  }

  next();
});

export default router;
