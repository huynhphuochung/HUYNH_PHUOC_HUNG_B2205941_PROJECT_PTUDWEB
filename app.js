const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();

// 1️⃣ Middleware chung trước route
app.use(cors());
app.use(express.json());

// 2️⃣ Route
const bookRoutes = require("./app/routes/book.route");
app.use("/api/books", bookRoutes);

// 3️⃣ Route test
app.get("/", (req, res) => {
  res.json({ message: "Welcome to book application." });
});

// 4️⃣ Handle 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// 5️⃣ Handle other errors
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
