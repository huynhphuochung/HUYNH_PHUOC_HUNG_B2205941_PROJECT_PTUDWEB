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

   
    const docgia = await service.getByPhone(dienthoai);
    if (!docgia) {
      return res.status(400).json({ message: "Số điện thoại không tồn tại" });
    }

    const match = await bcrypt.compare(password, docgia.PASSWORD);
    if (!match) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    
    res.json({
      message: "Đăng nhập thành công",
      data: {
        MADOCGIA: docgia.MADOCGIA,
        HOLOT: docgia.HOLOT,
        TEN: docgia.TEN,
        DIENTHOAI: docgia.DIENTHOAI,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};