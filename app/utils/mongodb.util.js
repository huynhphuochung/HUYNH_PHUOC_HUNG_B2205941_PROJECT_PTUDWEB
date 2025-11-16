const { MongoClient } = require("mongodb");

class MongoDB {
  static client;

  static connect = async (uri) => {
    if (this.client) return this.client; // đã connect thì return luôn
    this.client = await MongoClient.connect(uri); // connect
    console.log("MongoDB connected");
    return this.client;
  };

  static getClient = () => {
    if (!this.client) throw new Error("MongoDB not connected");
    return this.client;
  };
}

module.exports = MongoDB;
