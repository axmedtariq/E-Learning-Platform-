const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB_SERVER = process.env.DB_SERVER || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || "Elearning_SAAS";

const uri = `mongodb://${DB_SERVER}:${DB_PORT}/${DB_DATABASE}`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected to database:", DB_DATABASE);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
