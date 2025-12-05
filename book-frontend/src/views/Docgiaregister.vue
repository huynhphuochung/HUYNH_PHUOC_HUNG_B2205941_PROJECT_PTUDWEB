<template>
    <div class="register-page">
        <h3>Đăng ký đọc giả</h3>
        <form @submit.prevent="register">
            <div class="mb-3">
                <label>Họ lót</label>
                <input type="text" v-model="holot" class="form-control" required />
            </div>
            <div class="mb-3">
                <label>Tên</label>
                <input type="text" v-model="ten" class="form-control" required />
            </div>
            <div class="mb-3">
                <label>Ngày sinh</label>
                <input type="date" v-model="ngaysinh" class="form-control" required />
            </div>
            <div class="mb-3">
                <label>Giới tính</label>
                <select v-model="phai" class="form-control" required>
                    <option value="">Chọn</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
            </div>
            <div class="mb-3">
                <label>Địa chỉ</label>
                <input type="text" v-model="diachi" class="form-control" required />
            </div>
            <div class="mb-3">
                <label>Số điện thoại</label>
                <input type="text" v-model="dienthoai" class="form-control" required />
            </div>
            <div class="mb-3">
                <label>Mật khẩu</label>
                <input type="password" v-model="password" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Đăng ký</button>
        </form>
        <p v-if="message" :class="{ 'text-success': success, 'text-danger': !success }">{{ message }}</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            holot: "",
            ten: "",
            ngaysinh: "",
            phai: "",
            diachi: "",
            dienthoai: "",
            password: "",
            message: "",
            success: false,
        };
    },
    methods: {
        async register() {
            try {
                const res = await axios.post("http://localhost:3001/api/docgia/register", {
                    holot: this.holot,
                    ten: this.ten,
                    ngaysinh: this.ngaysinh,
                    phai: this.phai,
                    diachi: this.diachi,
                    dienthoai: this.dienthoai,
                    password: this.password,
                });
                this.message = res.data.message;
                this.success = true;
                this.holot = "";
                this.ten = "";
                this.ngaysinh = "";
                this.phai = "";
                this.diachi = "";
                this.dienthoai = "";
                this.password = "";
            } catch (err) {
                this.message = err.response?.data?.message || "Đăng ký thất bại";
                this.success = false;
            }
        },
    },
};
</script>

<style scoped>
.register-page {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>
