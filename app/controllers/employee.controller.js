const ApiError = require("../api-error");
const EmployeeService = require("../services/employee.service.js"); // import class EmployeeService
const MongoDB = require("../utils/mongodb.util.js");

exports.create = async (req, res, next) => {
  if (
    !req.body?.MSNV ||
    !req.body?.HoTenNV ||
    !req.body?.Password ||
    !req.body?.ChucVu ||
    !req.body?.DiaChi ||
    !req.body?.SoDienThoai
  ) {
    return next(new ApiError(400, "MANV can not be empty"));
  }

  try {
    const employeeService = new EmployeeService(MongoDB.getClient());
    const document = await employeeService.create(req.body);
    return res.send(document);
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "An error occurred while creating the employee")
    );
  }
};
const bcrypt = require("bcrypt");
// const Employees = require("../models/employee.model.js"); // chắc chắn import model

exports.login = async (req, res) => {
  try {
    console.log("Body nhận được:", req.body);

    const { MSNV, Password } = req.body;
    if (!MSNV || !Password) {
      console.log("MSNV hoặc Password trống!");
      return res
        .status(400)
        .json({ message: "MSNV và mật khẩu không được để trống" });
    }

    const employeeService = new EmployeeService(MongoDB.getClient());
    const employeeData = await employeeService.login(MSNV, Password); // 🔹 gọi service login

    console.log("Kết quả login:", employeeData);

    if (!employeeData) {
      console.log("MSNV hoặc mật khẩu không đúng");
      return res.status(401).json({ message: "MSNV hoặc mật khẩu không đúng" });
    }

    res.status(200).json({
      message: "Đăng nhập thành công!",
      employee: employeeData,
    });
  } catch (error) {
    console.error("Lỗi khi login:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};
