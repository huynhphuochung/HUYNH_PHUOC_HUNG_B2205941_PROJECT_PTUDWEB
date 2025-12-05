<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
        <a href="/" class="navbar-brand">Ứng dụng Độc giả</a>

        <div class="mr-auto navbar-nav d-flex">
            <li class="nav-item">
                <router-link :to="{ name: 'docgia.books' }" class="nav-link">
                    Danh sách sách <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item ms-3">
                <router-link :to="{ name: 'docgia.history' }" class="nav-link">
                    Lịch sử mượn sách <i class="fas fa-history"></i>
                </router-link>
            </li>
        </div>

        <!-- Góc phải -->
        <div class="d-flex align-items-center text-white gap-3">
            <template v-if="user">
                <span class="me-3">{{ user.HOLOT }} {{ user.TEN }}</span>

                <button class="btn btn-sm btn-outline-light" @click="logout">Đăng xuất</button>
            </template>

            <template v-else>
                <router-link :to="{ name: 'login.docgia' }" class="btn btn-sm btn-warning">
                    Đăng nhập
                </router-link>
            </template>
        </div>
    </nav>
</template>

<script>
export default {
    name: "DocGiaHeader",
    data() {
        return { user: null };
    },
    mounted() {
        const storedUser = localStorage.getItem("docgia");
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        }
    },
    methods: {
        logout() {
            const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");

            if (confirmLogout) {
                localStorage.removeItem("docgia");
                localStorage.removeItem("loggedIn");
                this.user = null;

                // 🔁 Chuyển về trang danh sách sách độc giả
                this.$router.push({ name: "docgia.books" });
            }
        }
    },
};
</script>
