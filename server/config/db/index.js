const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@book-store.winhk.mongodb.net/book-store?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("MongooseDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
