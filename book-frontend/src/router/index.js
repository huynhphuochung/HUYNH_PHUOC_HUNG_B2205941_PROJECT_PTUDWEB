import { createRouter, createWebHistory } from "vue-router";
import ListBook from "@/views/ListBook.vue";
import AddBook from "@/views/AddBook.vue";
import EditBook from "@/views/EditBook.vue";
import login from "@/views/Login.vue";
import DocgiaListBook from "@/views/DocgiaListBook.vue";
import DocGiaHistory from "@/views/Docgiahistory.vue";
import Docgiaregister from "@/views/Docgiaregister.vue";
import Logindocgia from "@/views/Logindocgia.vue";
import Dangkymuon from "@/views/Dangkymuon.vue";
import ApproveBorrow from "@/views/ApproveBorrow.vue";

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
  {
    path: "/docgia/muon", // URL khi điều hướng
    name: "dangky.muon", // tên route bạn sẽ dùng trong this.$router.push
    component: Dangkymuon,
    meta: { role: "docgia" }, // nếu muốn chặn nếu chưa login
  },
  {
    path: "/approve-borrow",
    name: "approve.borrow",
    component: ApproveBorrow,
    meta: { role: "admin" }, // chỉ admin mới vào được
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 🔒 Chặn truy cập nếu chưa login
router.beforeEach((to, from, next) => {
  // Nếu route yêu cầu quyền admin
  if (to.meta.role === "admin") {
    const isAdmin = localStorage.getItem("employeeLoggedIn");
    if (!isAdmin) return next({ name: "login" });
  }

  // Nếu route yêu cầu quyền docgia
  if (to.meta.role === "docgia") {
    const isDocgia = localStorage.getItem("docgiaLoggedIn");
    if (!isDocgia) return next({ name: "login.docgia" });
  }

  next();
});

export default router;
