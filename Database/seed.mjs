import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDb } from "../server/src/config/db.js";
import { User } from "../server/src/models/User.js";

const SAMPLE_USERS = [
  {
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    password: "Admin123!",
  },
  {
    email: "user@example.com",
    name: "Regular User",
    role: "user",
    password: "User123!",
  },
];

const run = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("Please set MONGODB_URI");
    process.exit(1);
  }

  await connectDb(process.env.MONGODB_URI);
  await User.syncIndexes();

  for (const sample of SAMPLE_USERS) {
    const passwordHash = await bcrypt.hash(sample.password, 10);
    const update = {
      name: sample.name,
      role: sample.role,
      passwordHash,
      lastLoginAt: new Date(),
    };
    const user = await User.findOneAndUpdate(
      { email: sample.email },
      { $set: update, $setOnInsert: { picture: "" } },
      { new: true, upsert: true }
    );
    console.log(`Upserted user ${user.email} (${user.role})`);
  }

  console.log("Database seed completed.");
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed failed", err);
  process.exit(1);
});
