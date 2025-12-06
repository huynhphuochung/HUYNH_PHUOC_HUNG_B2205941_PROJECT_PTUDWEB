const DocGiaService = require("../services/docgia.service");
const bcrypt = require("bcrypt");
exports.getBooks = async (req, res) => {
  try {
    const service = new DocGiaService();
    const books = await service.getAllBooks();
    res.send(books);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Lỗi server khi lấy danh sách sách." });
  }
};
exports.register = async (req, res) => {
  try {
    const service = new DocGiaService();
    const result = await service.create(req.body);
    res
      .status(201)
      .send({ message: "Đăng ký thành công", id: result.insertedId });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { dienthoai, password } = req.body;
    const service = new DocGiaService();


    console.log(" Body gửi từ frontend:", req.body);

    const docgia = await service.getByPhone(dienthoai);
    console.log("Dữ liệu DB tìm được:", docgia);

    if (!docgia) {
      console.log("Không tìm thấy độc giả trong DB");
      return res.status(400).json({ message: "Số điện thoại không tồn tại" });
    }

    console.log("Password nhập:", password);
    console.log(" Password DB lưu:", docgia.PASSWORD);

 
    const isHashed = docgia.PASSWORD.startsWith("$2b$");
    console.log("🔍 Mật khẩu DB có phải bcrypt hash không:", isHashed);

    let match;
    if (isHashed) {
      match = await bcrypt.compare(password, docgia.PASSWORD);
    } else {
      match = password === docgia.PASSWORD;
    }

    console.log("Kết quả so sánh:", match);

    if (!match) {
      console.log("Sai mật khẩu");
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }


 

    return res.json({
      message: "Đăng nhập thành công",
      data: {
        MADOCGIA: docgia.MADOCGIA,
        HOLOT: docgia.HOLOT,
        TEN: docgia.TEN,
        DIENTHOAI: docgia.DIENTHOAI,
      },
    });
  } catch (err) {
    console.error(" Lỗi đăng nhập:", err);
    res.status(500).json({ message: err.message });
  }
};
