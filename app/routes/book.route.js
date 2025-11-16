const express = require('express');
const books = require('../controllers/book.controller');
const router = express.Router();
router.route('/')
        .post(books.create);
router.route('/:id')
        .put(books.update)
        .delete(books.delete);
module.exports = router;
