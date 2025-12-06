<template>
    <div class="page-full container mt-4">
        <h3 class="text-center fw-bold mb-4 bg-primary text-white rounded-pill py-2 px-4 d-block mx-auto">
            LỊCH SỬ MƯỢN SÁCH
        </h3>

        <div class="card p-3 shadow-sm">
            <table class="table table-bordered table-hover">
                <thead class="table-secondary">
                    <tr>
                        <th>Mã sách</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả</th>
                        <th>Trạng thái</th>
                        <th>Thời hạn trả sách</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in history" :key="index">
                        <td>{{ item.MASACH }}</td>
                        <td>{{ formatDate(item.NGAYMUON) }}</td>
                        <td>{{ formatDate(item.NGAYTRA) }}</td>
                        <td>
                            <span :class="statusClass(item.status)">
                                {{ displayStatus(item.status) }}
                            </span>
                        </td>
                        <td>
                            <span :class="deadlineClass(item)">
                                {{ countdownDisplay[item._id] }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="history.length === 0" class="text-center text-muted py-3">
                Chưa có lịch sử mượn sách
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "DocGiaHistory",
    data() {
        return {
            history: [],
            countdownDisplay: {}, // lưu thời gian đếm từng item
            madocgia: JSON.parse(localStorage.getItem("docgia"))?.MADOCGIA || null,
        };
    },

    async mounted() {
        await this.fetchHistory();
        this.startCountdown();
    },

    methods: {
        async fetchHistory() {
            try {
                const res = await axios.get("http://localhost:3001/api/borrow");
                this.history = res.data.filter(item => item.MADOCGIA === this.madocgia);
            } catch (error) {
                console.error("❗ Lỗi lấy lịch sử:", error);
            }
        },

        startCountdown() {
            setInterval(() => {
                this.history.forEach(item => this.calculateCountdown(item));
            }, 1000);
        },

        calculateCountdown(item) {
            if (item.status !== "approved") {
                this.countdownDisplay[item._id] = "Chưa bắt đầu";
                return;
            }

            const now = new Date().getTime();
            const deadline = new Date(item.NGAYTRA).getTime();
            const distance = deadline - now;

            if (distance <= 0) {
                this.countdownDisplay[item._id] = "Quá hạn trả";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.countdownDisplay[item._id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        },

        formatDate(date) {
            return date ? new Date(date).toLocaleDateString("vi-VN") : "-";
        },

        displayStatus(status) {
            switch (status) {
                case "pending": return "Chờ duyệt";
                case "approved": return "Đã duyệt";
                case "rejected": return "Từ chối";
                default: return status;
            }
        },

        statusClass(status) {
            return {
                "text-warning": status === "pending",   // Vàng 
                "text-success": status === "approved",  // Xanh
                "text-danger": status === "rejected",   // Đỏ
            };
        }
        ,

        deadlineClass(item) {
            if (item.status !== "approved") {
                return "text-secondary"; // xám
            }
            const now = new Date().getTime();
            const deadline = new Date(item.NGAYTRA).getTime();

            return now > deadline ? "text-danger fw-bold" : "text-primary fw-bold";
        }

    },
};
</script>

<style scoped>
.page-full {
    width: 100%;
    min-height: 100vh;
}

table th,
table td {
    text-align: center;
    vertical-align: middle;
}
</style>
