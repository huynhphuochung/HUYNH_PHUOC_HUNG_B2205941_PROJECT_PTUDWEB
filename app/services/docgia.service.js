const MongoDB = require("../utils/mongodb.util");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

class DocGiaService {
  constructor() {
    const client = MongoDB.getClient(); // lấy client
    this.Book = client.db("QuanLyMuonSach").collection("SACH"); // gọi db() từ client
    this.DocGia = client.db("QuanLyMuonSach").collection("DOCGIA");
  }

  async getAllBooks() {
    return await this.Book.find({}).toArray();
  }
  async create(data) {
    // kiểm tra số điện thoại đã đăng ký chưa
    const exist = await this.DocGia.findOne({ DIENTHOAI: data.dienthoai });
    if (exist) throw new Error("Số điện thoại đã được đăng ký");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const docgia = {
      MADOCGIA: new ObjectId(),
      HOLOT: data.holot,
      TEN: data.ten,
      NGAYSINH: data.ngaysinh,
      PHAI: data.phai,
      DIACHI: data.diachi,
      DIENTHOAI: data.dienthoai,
      PASSWORD: hashedPassword,
    };

    const result = await this.DocGia.insertOne(docgia);
    return docgia;
  }
  // Thêm phương thức getByPhone
  async getByPhone(dienthoai) {
    return await this.DocGia.findOne({ DIENTHOAI: dienthoai });
  }
}

module.exports = DocGiaService;
