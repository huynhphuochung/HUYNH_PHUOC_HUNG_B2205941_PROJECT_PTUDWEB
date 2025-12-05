const MongoDB = require("../utils/mongodb.util.js");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

class BookService {
  constructor(client) {
    if (!client) throw new Error("MongoDB client is not defined!");
    this.Book = client.db().collection("SACH");
  }

  extractBookData(payload) {
    const SACH = {
      MASACH: payload.MASACH,
      TENSACH: payload.TENSACH,
      DONGIA: payload.DONGIA,
      SOQUYEN: payload.SOQUYEN,
      NAMXUATBAN: payload.NAMXUATBAN,
      MANXB: payload.MANXB,
    };

    Object.keys(SACH).forEach((key) => {
      if (SACH[key] === undefined) {
        delete SACH[key];
      }
    });

    return SACH;
  }

  async create(payload) {
    const SACH = this.extractBookData(payload);
    const result = await this.Book.findOneAndUpdate(
      SACH,
      { $set: { favorite: SACH.favorite || false } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Book.find(filter);
    return await cursor.toArray();
  }

  async findByName(TENSACH) {
    return await this.find({
      TENSACH: { $regex: new RegExp(TENSACH), $options: "i" },
    });
  }

  async findByCode(MASACH) {
    return await this.Book.find({
      MASACH: { $regex: new RegExp(MASACH), $options: "i" },
    }).toArray();
  }

  async updateByCode(MASACH, document) {
    console.log("MASACH:", MASACH);
    console.log("Document to update (before removing _id):", document);

    const docToUpdate = { ...document };
    delete docToUpdate._id; 

    const result = await this.Book.findOneAndUpdate(
      { MASACH: MASACH.trim() },
      { $set: docToUpdate },
      { returnDocument: "after" }
    );

    console.log("Mongo result:", result);
    return result; 
  }

  async deleteByCode(MASACH) {
    const result = await this.Book.findOneAndDelete({ MASACH: MASACH.trim() });
    return result;
  }
}

module.exports = BookService;
