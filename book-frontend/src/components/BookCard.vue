<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên sách:</strong>
            {{ book.TENSACH }}
        </div>
        <div class="p-1">
            <strong>Mã sách:</strong>
            {{ book.MASACH }}
        </div>
        <div class="p-1">
            <strong>Đơn giá:</strong>
            {{ book.DONGIA }}
        </div>
        <div class="p-1">
            <strong>Số lượng:</strong>
            {{ book.SOQUYEN }}
        </div>
        <div class="p-1">
            <strong>Năm xuất bản:</strong>
            {{ book.NAMXUATBAN }}
        </div>
        <div class="p-1">
            <strong>Nhà xuất bản:</strong>
            {{ book.MANXB }}
        </div>
        <div class="p-1">
            <strong>Yêu thích:&nbsp;</strong>
            <i v-if="book.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>
