<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý sách</a>
        <div class="mr-auto navbar-nav d-flex">
            <li class="nav-item">
                <router-link :to="{ name: 'book.list' }" class="nav-link">
                    Danh sách sách <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item ms-3">
                <router-link :to="{ name: 'book.add' }" class="nav-link">
                    Thêm sách <i class="fa-solid fa-plus"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>

<script>
export default {
    name: "AppHeader",
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
