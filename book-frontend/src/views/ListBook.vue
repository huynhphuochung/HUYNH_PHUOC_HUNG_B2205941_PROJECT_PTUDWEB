<template>
    <div class="page-full">
        <input v-model="searchText" placeholder="Tìm kiếm sách..." class="form-control mb-2" />

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên sách</th>
                    <th>Mã sách</th>
                    <th>Đơn giá</th>
                    <th>Mã NXB</th>
                    <th>Năm XB</th>
                    <th>Số quyển</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in filteredBooks" :key="book._id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ book.TENSACH }}</td>
                    <td>{{ book.MASACH }}</td>
                    <td>{{ book.DONGIA }}</td>
                    <td>{{ book.MANXB }}</td>
                    <td>{{ book.NAMXUATBAN }}</td>
                    <td>{{ book.SOQUYEN }}</td>
                    <td>
                        <div style="display: inline-flex; gap: 8px;">
                            <router-link :to="{ name: 'book.edit', params: { MASACH: book.MASACH } }"
                                class="btn btn-warning btn-sm me-2">
                                <i class="fa-solid fa-pen"></i> Sửa
                            </router-link>
                            <button class="btn btn-danger btn-sm" @click="deleteBook(book.MASACH)">
                                <i class="fa-solid fa-trash"></i> Xóa
                            </button>
                        </div>
                    </td>



                </tr>
            </tbody>
        </table>

        <p v-if="filteredBooksCount === 0">Không có sách nào.</p>

        <!-- Modal Sửa sách -->
        <div class="modal" v-if="editingBook">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Sửa sách</h5>
                        <button type="button" class="btn-close" @click="closeEditModal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label class="form-label">Tên sách</label>
                            <input type="text" class="form-control" v-model="editingBook.TENSACH" />
                        </div>
                        <div class="mb-2">
                            <label class="form-label">Đơn giá</label>
                            <input type="number" class="form-control" v-model="editingBook.DONGIA" />
                        </div>
                        <div class="mb-2">
                            <label class="form-label">Số quyển</label>
                            <input type="number" class="form-control" v-model="editingBook.SOQUYEN" />
                        </div>
                        <div class="mb-2">
                            <label class="form-label">Năm xuất bản</label>
                            <input type="number" class="form-control" v-model="editingBook.NAMXUATBAN" />
                        </div>
                        <div class="mb-2">
                            <label class="form-label">Mã NXB</label>
                            <input type="text" class="form-control" v-model="editingBook.MANXB" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="closeEditModal">Hủy</button>
                        <button class="btn btn-primary" @click="updateBook">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from "@/services/book.service.js";

export default {
    data() {
        return {
            books: [],
            searchText: "",
            editingBook: null, // đối tượng sách đang sửa
        };
    },
    computed: {
        bookStrings() {
            return this.books.map(
                ({ MASACH, TENSACH, MANXB, NAMXUATBAN, DONGIA }) =>
                    [MASACH, TENSACH, MANXB, NAMXUATBAN, DONGIA].join("").toLowerCase()
            );
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            const text = this.searchText.toLowerCase();
            return this.books.filter((_b, i) => this.bookStrings[i].includes(text));
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                const data = await BookService.getAll();
                this.books = data;
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        },
        refreshList() {
            this.retrieveBooks();
        },
        openEditModal(book) {
            // tạo bản sao để sửa, tránh thay đổi trực tiếp trong table
            this.editingBook = { ...book };
        },
        closeEditModal() {
            this.editingBook = null;
        },
        async updateBook() {
            try {
                await BookService.updateByCode(this.editingBook.MASACH, this.editingBook);
                const index = this.books.findIndex(b => b.MASACH === this.editingBook.MASACH);
                if (index !== -1) {
                    this.books[index] = { ...this.editingBook };
                }
                this.closeEditModal();
            } catch (error) {
                console.error("Error updating book:", error);
            }
        },
        async deleteBook(MASACH) {
            if (!confirm("Bạn có chắc muốn xóa sách này?")) return;

            try {
                await BookService.deleteByCode(MASACH);

                // Cập nhật mảng books, loại bỏ sách vừa xóa
                this.books = this.books.filter(book => book.MASACH !== MASACH);

                alert("Xóa sách thành công!");
            } catch (error) {
                console.error("Error deleting book:", error);
                alert("Xóa sách thất bại!");
            }
        }

    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page-full {
    width: 100%;
    padding: 10px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    max-width: 500px;
    margin: 100px auto;
}
</style>
