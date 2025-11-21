import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { buildGoogleClient, verifyGoogleToken } from "../config/google.js";

const googleClient = buildGoogleClient(process.env.GOOGLE_CLIENT_ID);

const signJwt = (user) =>
  jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const sanitizeUser = (user) => {
  const raw = user?.toObject ? user.toObject() : { ...user };
  if ("passwordHash" in raw) delete raw.passwordHash;
  return raw;
};

const setAuthCookie = (res, token) =>
  res.cookie("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

export const handleEmailRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Email, password, and name are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists. Please sign in." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const created = await User.create({
      email,
      name,
      passwordHash,
      picture: `https://www.gravatar.com/avatar/${Buffer.from(email).toString("hex")}?d=identicon`,
      role: "user",
      lastLoginAt: new Date(),
    });

    const user = sanitizeUser(created);
    const token = signJwt(user);
    setAuthCookie(res, token);
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const handleEmailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).lean();
    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    await User.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });
    const token = signJwt(user);
    setAuthCookie(res, token);
    res.json({ user: sanitizeUser(user), token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const handleGoogleSignIn = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: "Missing credential" });
    }

    const profile = await verifyGoogleToken(googleClient, credential, process.env.GOOGLE_CLIENT_ID);
    if (!profile.emailVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    const update = {
      googleId: profile.googleId,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      lastLoginAt: new Date(),
    };

    const user =
      (await User.findOneAndUpdate(
        { email: profile.email },
        { $set: update, $setOnInsert: { role: "user" } },
        { new: true, upsert: true }
      ).lean()) || update;

    const safeUser = sanitizeUser(user);
    const token = signJwt(safeUser);
    setAuthCookie(res, token).json({ user: safeUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Authentication failed" });
  }
};

export const handleLogout = (_req, res) => {
  res.clearCookie("access_token").json({ message: "Logged out" });
};

export const getProfile = async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};
