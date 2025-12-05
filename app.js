const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const MongoDB = require("./app/utils/mongodb.util");
const bookRoutes = require("./app/routes/book.route");
const employeeRoutes = require("./app/routes/employee.route");
const docgiaRoutes = require("./app/routes/docgia.route");

const app = express();
app.use(cors());
app.use(express.json());

// 2️⃣ Mount router
app.use("/api/books", bookRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/docgia", docgiaRoutes);

// Test route
app.get("/", (req, res) =>
  res.json({ message: "Welcome to book application." })
);

// 404 handler
app.use((req, res, next) => next(new ApiError(404, "Resource not found")));

// Error handler
app.use((err, req, res, next) =>
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



module.exports = app;
