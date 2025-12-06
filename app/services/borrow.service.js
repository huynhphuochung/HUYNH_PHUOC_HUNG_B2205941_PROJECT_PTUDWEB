const MongoDB = require("../utils/mongodb.util.js");

class BorrowService {
  constructor(client) {
    this.collection = client.db().collection("Borrow"); // collection lưu đăng ký mượn
  }

  // Lấy tất cả đăng ký mượn chưa duyệt
  async getPending() {
    return await this.collection.find({ status: "pending" }).toArray();
  }

  // Duyệt đăng ký mượn theo ID
  async approve(id) {
    const result = await this.collection.findOneAndUpdate(
      { _id: new MongoDB.ObjectId(id), status: "pending" },
      { $set: { status: "approved", approvedAt: new Date() } },
      { returnDocument: "after" }
    );
    return result.value;
  }

  // Từ chối đăng ký mượn
  async reject(id) {
    const result = await this.collection.findOneAndUpdate(
      { _id: new MongoDB.ObjectId(id), status: "pending" },
      { $set: { status: "rejected", rejectedAt: new Date() } },
      { returnDocument: "after" }
    );
    return result.value;
  }
}

module.exports = BorrowService;
