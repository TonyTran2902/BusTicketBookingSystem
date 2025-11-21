import mongoose from "mongoose";

export const connectDb = async (uri) => {
  if (!uri) {
    throw new Error("MONGODB_URI is required to connect to MongoDB");
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  return mongoose.connection;
};
