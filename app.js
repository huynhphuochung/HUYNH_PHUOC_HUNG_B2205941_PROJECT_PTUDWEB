const express = require("express");
const cors = require("cors"); // 🔹 import cors
const app = express();

const MongoDB = require("./app/utils/mongodb.util");
const borrowRouterInit = require("./app/routes/borrow.route");
const bookRoutes = require("./app/routes/book.route");
const employeeRoutes = require("./app/routes/employee.route");
const docgiaRoutes = require("./app/routes/docgia.route");
const config = require("./app/config");

// 🔹 Bật CORS trước tất cả route
app.use(cors()); // cho phép tất cả origin
// Nếu muốn chỉ cho frontend, có thể dùng:
// app.use(cors({ origin: "http://localhost:3001" }));

app.use(express.json());

// Mount các router bình thường
app.use("/api/books", bookRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/docgia", docgiaRoutes);

async function startServer() {
  try {
    // Connect MongoDB
    await MongoDB.connect(config.db.uri);

    // Mount borrow router sau khi DB connect
    const borrowRouter = await borrowRouterInit();
    app.use("/api/borrow", borrowRouter);

    const PORT = config.app.port || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();
module.exports = app;
