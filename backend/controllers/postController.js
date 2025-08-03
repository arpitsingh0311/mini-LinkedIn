import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "cloudinary";


export const createPost = async (req, res) => {
  const { content, authorId } = req.body;
  try {
    let imageData = {};
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      const result = await cloudinary.v2.uploader.upload(dataURI, {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        folder: "mini-linkedin-posts",
      });

      imageData = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newPost = new Post({
      content,
      author: authorId,
      image: imageData,
    });
    const savedPost = await newPost.save();

    const postToReturn = await Post.findById(savedPost._id).populate(
      "author",
      "name profilePhoto"
    );

    res.json(postToReturn);
  } catch (err) {
    console.error("!!! SERVER CRASHED:", err);
    res.status(500).send("Server Error");
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name profilePhoto");
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).send("Server Error");
  }
};

export const getUserProfileAndPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "name email bio profilePhoto"
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const posts = await Post.find({ author: req.params.userId })
      .sort({
        createdAt: -1,
      })
      .populate("author", "name profilePhoto");

    res.json({ user, posts });
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server Error");
  }
};