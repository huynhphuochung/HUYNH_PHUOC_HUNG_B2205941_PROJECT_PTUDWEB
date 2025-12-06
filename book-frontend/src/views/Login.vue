<template>
    <div class="card p-3" style="max-width: 500px; margin: 40px auto;">
        <h5 class="card-title text-center mb-3">Đăng nhập nhân viên</h5>

        <form @submit.prevent="login">
            <div class="mb-3">
                <label class="form-label">MSNV</label>
                <input type="text" class="form-control" v-model="MSNV" placeholder="Nhập mã nhân viên" required />
            </div>

            <div class="mb-3">
                <label class="form-label">Mật khẩu</label>
                <input type="password" class="form-control" v-model="Password" placeholder="Nhập mật khẩu" required />
            </div>

            <button class="btn btn-primary w-100" type="submit">
                Đăng nhập
            </button>

            <p class="text-danger mt-3 text-center" v-if="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            MSNV: "",
            Password: "",
            error: ""
        };
    },
    methods: {
        async login() {
            this.error = "";

            try {
                const res = await axios.post("http://localhost:3000/api/employees/login", {
                    MSNV: this.MSNV,
                    Password: this.Password,
                });

                alert("Đăng nhập thành công!");

                // Lưu thông tin nhân viên
                localStorage.setItem("employeeLoggedIn", "true");
                localStorage.setItem("employeeInfo", JSON.stringify(res.data.employee));
                localStorage.setItem("role", "admin");
                this.$router.push({ name: "book.list" });



            } catch (err) {
                this.error =
                    err.response?.data?.message || "Đăng nhập thất bại! Vui lòng thử lại.";
            }
        }
    }
};
</script>

<style scoped>
.card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>