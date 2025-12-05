const ApiError = require("../api-error");
const BookService = require("../services/book.service.js"); 
const MongoDB = require("../utils/mongodb.util.js"); 
exports.create = async (req, res, next) => {
  if (!req.body?.MASACH) {
    return next(new ApiError(400, "MASACH can not be empty"));
  }
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.create(req.body);
    return res.send(document);
  } catch (error) {
    console.error(error); 
    return next(new ApiError(500, "An error occurred while creating the book"));
  }
};
exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const bookService = new BookService(MongoDB.client);
    const { TENSACH } = req.query;
    if (TENSACH) {
      documents = await bookService.findByName(TENSACH);
    } else {
      documents = await bookService.find({});
    }
    res.send(documents);
  } catch (error) {
    next(new ApiError(500, "An error occurred while retrieving books"));
  }
};

exports.findByName = async (req, res, next) => {
  try {
    const TENSACH = req.params.TENSACH;
    const bookService = new BookService(MongoDB.client);
    const books = await bookService.findByName(TENSACH);
    res.send(books);
  } catch (error) {
    next(new ApiError(500, "Error searching books by name"));
  }
};
exports.findByCode = async (req, res, next) => {
  console.log("MASACH param:", req.params.MASACH);
  console.log("Body:", req.body);
  try {
    const code = req.params.MASACH;
    const bookService = new BookService(MongoDB.client);
    const book = await bookService.findByCode(code);
    res.send(book);
  } catch (error) {
    next(new ApiError(500, "Error searching book by code"));
  }
};
exports.updateByCode = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);

    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Data to update can not be empty"));
    }

    const updateData = { ...req.body };
    delete updateData._id;

    const updatedBook = await bookService.updateByCode(
      req.params.MASACH,
      updateData
    );

    if (!updatedBook) {
      return next(
        new ApiError(404, `Book with MASACH=${req.params.MASACH} not found`)
      );
    }

   
    res.send(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    next(
      new ApiError(500, `Error updating book with MASACH=${req.params.MASACH}`)
    );
  }
};

exports.deleteByCode = async (req, res, next) => {
  try {
    const MASACH = req.params.MASACH;
    const bookService = new BookService(MongoDB.client);
    const deletedBook = await bookService.deleteByCode(MASACH);

    if (!deletedBook) {
      return next(new ApiError(404, `Book with MASACH=${MASACH} not found`));
    }

    res.send({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error(error);
    next(
      new ApiError(500, `Error deleting book with MASACH=${req.params.MASACH}`)
    );
  }
};
