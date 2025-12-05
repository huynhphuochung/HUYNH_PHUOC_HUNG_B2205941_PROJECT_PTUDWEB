const express = require("express");
const router = express.Router();

const docgia = require("../controllers/docgia.controller");

//Độc giả xem danh sách sách
router.get("/books", docgia.getBooks);
router.post("/register", docgia.register);
router.post("/login", docgia.login);
module.exports = router;
