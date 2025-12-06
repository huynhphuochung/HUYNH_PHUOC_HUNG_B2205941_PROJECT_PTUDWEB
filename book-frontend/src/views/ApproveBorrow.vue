<template>
    <div class="container mt-4">
        <h3 class="text-center text-white bg-primary py-2 mb-3 rounded">
            QUẢN LÝ ĐĂNG KÝ MƯỢN SÁCH
        </h3>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Đọc giả</th>
                    <th>Tên Sách</th>
                    <th>Ngày đăng ký</th>
                    <th>Ngày trả</th>
                    <th>Trạng thái</th>
                    <th>Duyệt mượn</th>
                    <th>Trả sách</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in borrowList" :key="item._id">

                    <td>{{ item.docgia?.HoTen || item.MADOCGIA }}</td>
                    <td>{{ item.book?.TENSACH || item.MASACH }}</td>
                    <td>{{ item.NGAYMUON }}</td>
                    <td>{{ item.NGAYTRA }}</td>
                    <td>
                        {{ item.status === 'pending' ? 'Chờ duyệt' :
                        item.status === 'approved' ? 'Đã duyệt' :
                        item.status === 'returned' ? 'Đã trả' : 'Đã từ chối' }}
                    </td>

                    <td class="d-flex" , style="gap: 8px;">
                        <button class=" btn btn-success btn-sm" @click="approve(item._id)"
                            :disabled="item.status !== 'pending'">
                            Duyệt
                        </button>
                        <button class="btn btn-danger btn-sm" @click="reject(item._id)"
                            :disabled="item.status !== 'pending'">
                            Từ chối
                        </button>
                    </td>


                    <td>
                        <button class="btn btn-info btn-sm" @click="confirmReturn(item._id)"
                            :disabled="item.status !== 'approved'">
                            Nhận trả
                        </button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ApproveBorrow",
    data() {
        return {
            borrowList: [],
        };
    },
    async created() {
        await this.fetchBorrowList();
    },
    methods: {
        async fetchBorrowList() {
            try {
                const res = await axios.get("http://localhost:3000/api/borrow");
                // Map dữ liệu để có docgiaName và bookName nếu muốn
                this.borrowList = res.data.map(item => ({
                    ...item,
                    bookName: item.book?.TenSach || item.MASACH,
                    docgiaName: item.docgia?.HoTen || item.MADOCGIA
                }));
            } catch (err) {
                console.error("Lỗi khi lấy danh sách mượn:", err);
            }
        }
        ,
        async approve(id) {
            try {
                await axios.put(`http://localhost:3000/api/borrow/approve/${id}`);
                this.fetchBorrowList(); // refresh danh sách
            } catch (err) {
                console.error(err);
            }
        },
        async reject(id) {
            try {
                await axios.put(`http://localhost:3000/api/borrow/reject/${id}`);
                this.fetchBorrowList(); // refresh danh sách
            } catch (err) {
                console.error(err);
            }
        },
        async confirmReturn(id) {
            try {
                await axios.put(`http://localhost:3000/api/borrow/confirm-return/${id}`);
                this.fetchBorrowList();
            } catch (err) {
                console.error(err);
            }
        },
    },

};
</script>
