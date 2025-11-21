import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}`, role: req.user.role });
});

router.get("/admin/metrics", authenticate, authorize(["admin"]), (_req, res) => {
  res.json({ message: "Sensitive admin metrics placeholder" });
});

export default router;
