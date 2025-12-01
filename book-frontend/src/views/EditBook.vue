<template>
    <div class="card p-3" style="max-width: 600px; margin: 20px auto;">
        <h5 class="card-title">Chỉnh sửa sách</h5>

        <form @submit.prevent="updateBook">
            <div class="mb-2">
                <label class="form-label">Mã sách</label>
                <input type="text" class="form-control" v-model="book.MASACH" disabled />
            </div>

            <div class="mb-2">
                <label class="form-label">Tên sách</label>
                <input type="text" class="form-control" v-model="book.TENSACH" required />
            </div>

            <div class="mb-2">
                <label class="form-label">Đơn giá</label>
                <input type="number" class="form-control" v-model="book.DONGIA" required />
            </div>

            <div class="mb-2">
                <label class="form-label">Số quyển</label>
                <input type="number" class="form-control" v-model="book.SOQUYEN" required />
            </div>

            <div class="mb-2">
                <label class="form-label">Năm xuất bản</label>
                <input type="number" class="form-control" v-model="book.NAMXUATBAN" required />
            </div>

            <div class="mb-2">
                <label class="form-label">Mã NXB</label>
                <input type="text" class="form-control" v-model="book.MANXB" required />
            </div>

            <div class="form-check mb-3">
                <input type="checkbox" class="form-check-input" id="favoriteCheck" v-model="book.favorite" />
                <label class="form-check-label" for="favoriteCheck">Yêu thích</label>
            </div>

            <button class="btn btn-primary" type="submit" :disabled="!book.MASACH">
                Lưu thay đổi
            </button>

        </form>
    </div>
</template>

<script>
import BookService from "@/services/book.service.js";

export default {
    data() {
        return {
            book: {
                MASACH: "",
                TENSACH: "",
                DONGIA: 0,
                SOQUYEN: 0,
                NAMXUATBAN: new Date().getFullYear(),
                MANXB: "",
                favorite: false,
            },
        };
    },
    mounted() {
        this.loadBook();
    },
    methods: {
        async loadBook() {
            const MASACH = this.$route.params.MASACH;
            try {
                const data = await BookService.getByCode(MASACH);
                // Nếu backend trả về mảng, lấy phần tử đầu tiên
                this.book = Array.isArray(data) ? data[0] : data;
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu sách:", err);
                alert("Không thể tải dữ liệu sách.");
            }
        },
        async updateBook() {
            try {
                console.log("===== Frontend updateBook =====");
                console.log("Book to update:", this.book);

                const updated = await BookService.updateByCode(this.book.MASACH, this.book);
                console.log("Updated returned from API:", updated);

                if (updated) {
                    alert("Cập nhật sách thành công!");
                    this.$router.push({ name: "book.list" });
                } else {
                    alert("Cập nhật sách thất bại! Vui lòng thử lại.");
                }
            } catch (error) {
                console.error("Error updating book:", error);
                alert("Cập nhật sách thất bại! Vui lòng thử lại.");
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
