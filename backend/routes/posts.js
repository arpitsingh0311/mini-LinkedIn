// backend/routes/posts.js
import express from "express";
import multer from "multer";
import {
  createPost,
  getAllPosts,
  getUserProfileAndPosts,
} from "../controllers/postController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), createPost);

router.get("/", getAllPosts);
router.get("/user/:userId", getUserProfileAndPosts);

export default router;
