<template>
    <div>
        <h3>Đăng ký mượn sách</h3>
        <p>Sách: {{ $route.query.TENSACH }}</p>

        <form @submit.prevent="submitBorrow">
            <label>Ngày mượn</label>
            <input type="date" v-model="ngaymuon" required />

            <label>Ngày trả</label>
            <input type="date" v-model="ngaytra" required />

            <button type="submit" class="btn btn-primary">Gửi đăng ký</button>
        </form>
    </div>
</template>

<script>
import MuonSachService from "@/services/muonsach.service";

export default {
    data() {
        return {
            ngaymuon: "",
            ngaytra: "",
        };
    },
    methods: {
        async submitBorrow() {
            const user = JSON.parse(localStorage.getItem("docgia"));
            const payload = {
                MADOCGIA: user.MADOCGIA,
                MASACH: this.$route.query.MASACH,
                NGAYMUON: this.ngaymuon,
                NGAYTRA: this.ngaytra,
                TRANGTHAI: "Chờ duyệt"
            };

            await MuonSachService.create(payload);
            alert("Đã gửi yêu cầu mượn sách, vui lòng chờ quản lý duyệt!");
            this.$router.push({ name: "home.docgia" });
        }
    }
};
</script>
