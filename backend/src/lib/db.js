import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const DB = process.env.MONGO_URI;
    if (!DB) throw new Error("MONGO_URI is not set");

    const conn = await mongoose.connect(DB);

    console.log("❤️MongoDB connected❤️", conn.connection.host);
  } catch (err) {
    console.error("DB connection error", err.message);
    process.exit(1);
  }
};
