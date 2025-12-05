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

exports.login = async (req, res, next) => {
  try {
    const { MSNV, Password } = req.body;

    if (!MSNV || !Password) {
      return next(new ApiError(400, "MSNV và Password không được để trống"));
    }

    const employeeService = new EmployeeService(MongoDB.getClient());
    const employee = await employeeService.findByMSNV(MSNV);

    if (!employee) {
      return next(new ApiError(404, "Nhân viên không tồn tại"));
    }


    const isMatch = await bcrypt.compare(Password, employee.Password);

    if (!isMatch) {
      return next(new ApiError(401, "Sai mật khẩu"));
    }

    return res.send({
      message: "Đăng nhập thành công!",
      employee,
    });
  } catch (error) {
    return next(new ApiError(500, "Lỗi server khi đăng nhập"));
  }
};
