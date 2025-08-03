import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Post from "../components/Post"; 
import Spinner from "../components/Spinner";

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch posts.");
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    setPosting(true);
    const data = new FormData();
    data.append("content", content);
    data.append("authorId", user.id);
    if (image) {
      data.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setContent("");
      setImage(null);
      setPreview("");
      fetchPosts();
    } catch (err) {
      console.error(err);
      setError("Failed to create post.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Create a Post
        </h3>
        <form onSubmit={onSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="3"
          ></textarea>
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Image preview"
                className="max-h-40 rounded-md"
              />
            </div>
          )}
          <div className="flex justify-between items-center mt-2">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="text-sm text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <button
              type="submit"
              className="px-4 py-2 w-24 flex justify-center items-center text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
              disabled={posting}
            >
              {posting ? <Spinner /> : "Post"}
            </button>
          </div>
        </form>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Community Feed</h2>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className="text-center text-gray-500">
            No posts yet. Be the first!
          </p>
        )}
      </div>
    </div>
  );
};

export default Feed;
