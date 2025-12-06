<template>
    <nav class="navbar navbar-expand navbar-dark bg-info px-3">
        <a href="/" class="navbar-brand">HỆ THỐNG QUẢN LÝ SÁCH</a>

        <div class="mr-auto navbar-nav d-flex">
            <li class="nav-item">
                <router-link :to="{ name: 'book.list' }" class="nav-link">
                    XEM SÁCH <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item ms-3">
                <router-link :to="{ name: 'book.add' }" class="nav-link">
                    THÊM SÁCH <i class="fa-solid fa-plus"></i>
                </router-link>
            </li>
            <li class="nav-item ms-3">
                <router-link :to="{ name: 'approve.borrow' }" class="nav-link">
                    QUẢN LÝ MƯỢN SÁCH <i class="fas fa-check"></i>
                </router-link>
            </li>
        </div>

        <!-- Thông tin người dùng -->
        <div class="ms-auto d-flex align-items-center" v-if="loggedIn" style="gap: 20px;">
            <span class="text-light">{{ employee.HoTenNV }}</span>
            <button class="btn btn-outline-light btn-sm" @click="confirmLogout">
                Đăng xuất
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    name: "AppHeader",
    data() {
        return {
            loggedIn: false,
            employee: null,
            role: null,
        };
    },
    created() {
        const logged = localStorage.getItem("employeeLoggedIn");
        const emp = localStorage.getItem("employeeInfo");
        const role = localStorage.getItem("role");
        if (logged && emp) {
            this.loggedIn = true;
            this.employee = JSON.parse(emp);
            this.role = role;
        }
    },
    methods: {
        confirmLogout() {
            if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
                this.logout();
            }
        },
        logout() {
            localStorage.removeItem("employeeLoggedIn");
            localStorage.removeItem("employeeInfo");
            localStorage.removeItem("role");

            this.loggedIn = false;
            this.employee = null;
            this.role = null;

            this.$router.push({ name: "login" });
        },
    },
};
</script>

<style scoped>
.navbar-brand {
    font-weight: bold;
}

.nav-link i {
    margin-left: 5px;
}
</style>
