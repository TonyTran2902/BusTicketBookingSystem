import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getProfile,
  handleEmailLogin,
  handleEmailRegister,
  handleGoogleSignIn,
  handleLogout,
} from "../controllers/authController.js";

const router = Router();

router.post("/google", handleGoogleSignIn);
router.post("/login", handleEmailLogin);
router.post("/register", handleEmailRegister);
router.post("/logout", handleLogout);
router.get("/me", authenticate, getProfile);

export default router;
