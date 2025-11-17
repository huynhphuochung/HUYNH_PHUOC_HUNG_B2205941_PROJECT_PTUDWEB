<template>
    <div class="card p-3 mb-3">
        <h5 class="card-title">Thêm sách mới</h5>

        <form @submit.prevent="submitForm">
            <div class="mb-2">
                <label class="form-label">Tên sách</label>
                <input type="text" class="form-control" v-model="book.TENSACH" required />
            </div>

            <div class="mb-2">
                <label class="form-label">Mã sách</label>
                <input type="text" class="form-control" v-model="book.MASACH" required />
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

            <div class="form-check mb-2">
                <input type="checkbox" class="form-check-input" id="favoriteCheck" v-model="book.favorite" />
                <label class="form-check-label" for="favoriteCheck">Yêu thích</label>
            </div>

            <button type="submit" class="btn btn-primary">
                <i class="fa-solid fa-plus"></i> Thêm sách
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
            },
        };
    },
    mounted() {
        // Lấy sách theo MASACH từ router params
        const code = this.$route.params.MASACH;
        BookService.getByCode(code)
            .then((data) => {
                this.book = data; // gán dữ liệu hiện có vào form
            })
            .catch((err) => console.error("Lỗi lấy sách:", err));
    },
    methods: {
        async updateBook() {
            try {
                console.log("Payload gửi lên backend:", this.book);
                const res = await BookService.updateByCode(this.book.MASACH, this.book);
                console.log("Response backend:", res);
                alert("Cập nhật sách thành công!");
                this.$router.push({ name: "book.list" });
            } catch (err) {
                console.error("Lỗi khi cập nhật sách:", err);
                if (err.response) {
                    console.error("Response data:", err.response.data);
                }
                alert("Cập nhật sách thất bại!");
            }
        },
    },
};

</script>

<style scoped>
.card {
    max-width: 500px;
}
</style>
