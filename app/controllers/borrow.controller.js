const MongoDB = require("../utils/mongodb.util");
const { ObjectId } = require("mongodb");

class BorrowController {
  constructor() {
    const client = MongoDB.getClient();
    this.borrow = client.db("QuanLyMuonSach").collection("THEODOIMUONSACH");
    this.books = client.db("QuanLyMuonSach").collection("SACH");
    this.readers = client.db("QuanLyMuonSach").collection("DOCGIA");
  }

  // Gửi yêu cầu mượn sách
  async create(req, res) {
    try {
      const { MADOCGIA, MASACH, NGAYMUON, NGAYTRA } = req.body;

      console.log("Frontend gửi MADOCGIA:", MADOCGIA);
      console.log("Kiểu dữ liệu:", typeof MADOCGIA);

      // Tìm độc giả dựa trên _id trong MongoDB
      const reader = await this.readers.findOne({
        MADOCGIA: new ObjectId(MADOCGIA),
      });

      console.log("Kết quả tìm reader:", reader);

      if (!reader)
        return res.status(404).json({ message: "Độc giả không tồn tại" });

      const book = await this.books.findOne({ MASACH });
      if (!book) return res.status(404).json({ message: "Sách không tồn tại" });
      if (book.SOQUYEN <= 0)
        return res.status(400).json({ message: "Sách đã hết" });

      await this.borrow.insertOne({
        MADOCGIA: new ObjectId(MADOCGIA),
        MASACH,
        NGAYMUON,
        NGAYTRA,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.json({ message: "Gửi yêu cầu mượn thành công" });
    } catch (error) {
      console.error("Lỗi create borrow:", error);
      res.status(500).json({ message: "Lỗi server", error });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.borrow
        .aggregate([
          {
            $lookup: {
              from: "SACH",
              localField: "MASACH",
              foreignField: "MASACH",
              as: "book",
            },
          },
          { $unwind: { path: "$book", preserveNullAndEmptyArrays: true } },

          {
            $lookup: {
              from: "DOCGIA",
              localField: "MADOCGIA",
              foreignField: "_id",
              as: "docgia",
            },
          },
          { $unwind: { path: "$docgia", preserveNullAndEmptyArrays: true } },

          { $sort: { createdAt: -1 } },
        ])
        .toArray();

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }

  // Duyệt yêu cầu
  async approve(req, res) {
    try {
      const id = req.params.id;
      const request = await this.borrow.findOne({ _id: new ObjectId(id) });
      if (!request)
        return res.status(404).json({ message: "Yêu cầu không tồn tại" });

      await this.books.updateOne(
        { MASACH: request.MASACH },
        { $inc: { SOQUYEN: -1 } }
      );

      await this.borrow.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "approved", updatedAt: new Date() } }
      );

      res.json({ message: "Đã duyệt yêu cầu mượn" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }

  // Từ chối yêu cầu
  async reject(req, res) {
    try {
      const id = req.params.id;
      await this.borrow.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "rejected", updatedAt: new Date() } }
      );
      res.json({ message: "Đã từ chối yêu cầu mượn" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
  async getPending(req, res) {
    try {
      const result = await this.borrow.find({ status: "pending" }).toArray();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
  async confirmReturn(req, res) {
    try {
      const id = req.params.id;
      const request = await this.borrow.findOne({ _id: new ObjectId(id) });
      if (!request)
        return res.status(404).json({ message: "Yêu cầu không tồn tại" });

      if (request.status !== "approved")
        return res
          .status(400)
          .json({ message: "Chỉ sách đã duyệt mới trả được" });

      await this.borrow.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "returned", updatedAt: new Date() } }
      );

     
      await this.books.updateOne(
        { MASACH: request.MASACH },
        { $inc: { SOQUYEN: 1 } }
      );

      res.json({ message: "Đã nhận trả sách" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
}

module.exports = BorrowController;
