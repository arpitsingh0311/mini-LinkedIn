// backend/routes/auth.js
import express from "express";
import multer from "multer";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", upload.single("profilePhoto"), register);

router.post("/login", login);

export default router;
