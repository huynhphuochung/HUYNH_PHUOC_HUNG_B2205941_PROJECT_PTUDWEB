<template>
    <div class="login-container">
        <h3>Đăng nhập đọc giả</h3>

        <form @submit.prevent="login">
            <div class="mb-3">
                <label>Số điện thoại</label>
                <input v-model="dienthoai" type="text" class="form-control" placeholder="Nhập số điện thoại" required />
            </div>

            <div class="mb-3">
                <label>Mật khẩu</label>
                <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu" required />
            </div>

            <button type="submit" class="btn btn-primary">Đăng nhập</button>

            <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { ref } from "vue"; // ✅ Import ref
import axios from "axios";
import { useRouter } from "vue-router";

export default {
    name: "LoginDocgia",
    setup() {
        const router = useRouter();

        const dienthoai = ref(""); // ✅ Sửa Vue.ref -> ref
        const password = ref("");
        const errorMessage = ref("");

        const login = async () => {
            try {
                const res = await axios.post("http://localhost:3001/api/docgia/login", {
                    dienthoai: dienthoai.value,
                    password: password.value,
                });

                // Lưu thông tin đọc giả vào localStorage
                localStorage.setItem("docgia", JSON.stringify(res.data.data));
                localStorage.setItem("loggedIn", true);
                // Chuyển hướng sang trang danh sách sách đọc giả
                router.push({ name: "docgia.books" });
            } catch (err) {
                errorMessage.value = err.response?.data?.message || "Đăng nhập thất bại";
            }
        };

        return { dienthoai, password, errorMessage, login };
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f8f9fa;
}
</style>
