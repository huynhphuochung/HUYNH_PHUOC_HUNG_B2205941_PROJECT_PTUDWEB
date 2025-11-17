import createApiClient from "./api.service";

class BookService {
  constructor(baseUrl = "/api/books") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async findByName(TENSACH) {
    return (await this.api.get(`/search/${TENSACH}`)).data;
  }

  async getByCode(MASACH) {
    return (await this.api.get(`/code/${MASACH}`)).data;
  }

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async updateByCode(MASACH, document) {
    console.log(
      "Sending PUT to:",
      `/api/books/code/${MASACH}`,
      "with body:",
      document
    );
    return (await this.api.put(`/code/${MASACH}`, document)).data;
  }

  async deleteByCode(MASACH) {
    return (await this.api.delete(`/code/${MASACH}`)).data;
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
}

export default new BookService();
