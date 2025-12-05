<template>
    <div class="page-full">
        <h3 class="text-center fw-bold mb-4 bg-primary text-white rounded-pill py-2 px-4 d-block mx-auto">
            THƯ VIỆN SÁCH
        </h3>


        <!-- Tìm kiếm sách -->
        <input v-model="searchText" placeholder="Tìm kiếm sách..." class="form-control mb-3" />

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
                    <th>Đăng ký</th>

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
                        <button class="btn btn-sm btn-success" @click="registerBorrow(book)">
                            Đăng ký mượn
                        </button>
                    </td>

                </tr>
            </tbody>
        </table>

        <p v-if="filteredBooksCount === 0">Không có sách nào.</p>
    </div>
</template>

<script>
import BookService from "@/services/book.service.js";

export default {
    data() {
        return {
            books: [],
            searchText: "",
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
                const data = await BookService.getAll(); // gọi API lấy sách
                this.books = data;
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        },
        registerBorrow(book) {
            const user = JSON.parse(localStorage.getItem("docgia"));

            if (!user) {
                alert("Bạn cần đăng nhập để mượn sách!");
                this.$router.push({ name: "login.docgia" });
                return;
            }

            this.$router.push({
                name: "dangky.muon",
                query: {
                    MASACH: book.MASACH,
                    TENSACH: book.TENSACH,
                }
            });
        }


    },
    mounted() {
        this.retrieveBooks();
    },


};
</script>

<style scoped>
.page-full {
    width: 100%;
    padding: 10px;
}
</style>
