const express = require("express");
const books = require("../controllers/book.controller");
const router = express.Router();

// Tạo sách
router.post("/", books.create);

// Tìm kiếm sách theo tên
router.get("/search/:TENSACH", books.findByName);

// Tìm sách theo MASACH
router.get("/code/:MASACH", books.findByCode);

// Cập nhật sách theo MASACH
router.put("/code/:MASACH", books.updateByCode);

// Xóa sách theo MASACH
router.delete("/code/:MASACH", books.deleteByCode);

module.exports = router;
