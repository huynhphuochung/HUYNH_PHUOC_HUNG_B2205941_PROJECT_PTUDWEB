<template>
    <div class="borrow-book-page">
        <div class="card shadow-sm mx-auto p-4" style="max-width: 500px;">
            <h3 class="card-title text-center mb-4">Đăng ký mượn sách</h3>

            <p class="text-center fw-semibold mb-4">
                <strong>Sách:</strong> {{ $route.query.TENSACH }}
            </p>

            <form @submit.prevent="submitBorrow">
                <div class="mb-3">
                    <label class="form-label">Ngày mượn</label>
                    <input type="date" v-model="ngaymuon" class="form-control" required />
                </div>

                <div class="mb-3">
                    <label class="form-label">Ngày trả</label>
                    <input type="date" v-model="ngaytra" class="form-control" required />
                </div>

                <button type="submit" class="btn btn-primary w-100 py-2">
                    Gửi đăng ký
                </button>
            </form>
        </div>
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
            if (!user) {
                alert("Bạn cần đăng nhập để mượn sách!");
                this.$router.push({ name: "login.docgia" });
                return;
            }

            if (this.ngaytra <= this.ngaymuon) {
                alert("Ngày trả phải lớn hơn ngày mượn!");
                return;
            }

            const payload = {
                MADOCGIA: user.MADOCGIA,
                MASACH: this.$route.query.MASACH,
                NGAYMUON: this.ngaymuon,
                NGAYTRA: this.ngaytra,
                TRANGTHAI: "Chờ duyệt",
            };

            try {
                await MuonSachService.create(payload);
                alert(
                    "Đã gửi yêu cầu mượn sách, vui lòng chờ quản lý duyệt!"
                );
                this.$router.push({ name: "docgia.books" });
            } catch (error) {
                console.error(error);
                alert(
                    error.response?.data?.message ||
                    "Có lỗi xảy ra, vui lòng thử lại!"
                );
            }
        },
    },
};
</script>

<style scoped>
.borrow-book-page {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
}

.card {
    border-radius: 15px;
    background: #ffffff;
}

.card-title {
    font-size: 1.6rem;
    color: #0d6efd;
}
</style>
