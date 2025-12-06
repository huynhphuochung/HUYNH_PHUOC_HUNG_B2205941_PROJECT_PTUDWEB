// src/services/muonsach.service.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/borrow"; // URL backend cho mượn sách

class MuonSachService {
  // Tạo phiếu mượn sách
  create(data) {
    return axios.post(API_URL, data);
  }

  // Lấy tất cả phiếu mượn sách (nếu cần)
  getAll() {
    return axios.get(API_URL);
  }

  // Có thể thêm update, delete nếu backend hỗ trợ
}

export default new MuonSachService();
