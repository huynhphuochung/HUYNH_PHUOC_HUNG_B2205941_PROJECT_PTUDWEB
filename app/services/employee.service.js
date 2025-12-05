const MongoDB = require("../utils/mongodb.util.js");
const bcrypt = require("bcrypt");

class EmployeeService {
  constructor(client) {
    this.collection = client.db().collection("NhanVien");
  }

  async create(data) {
    // Hash password trước khi lưu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.Password, salt);

    const newEmployee = {
      ...data,
      Password: hashedPassword,
    };

    const result = await this.collection.insertOne(newEmployee);

    return {
      _id: result.insertedId,
      ...newEmployee,
    };
  }

  async findByMSNV(MSNV) {
    return await this.collection.findOne({ MSNV });
  }
}

module.exports = EmployeeService;


