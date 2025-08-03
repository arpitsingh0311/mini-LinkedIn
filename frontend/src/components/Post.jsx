import React from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();

  const handleAuthorClick = () => {
    if (post.author?._id) {
      navigate(`/profile/${post.author._id}`);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <img
          src={
            post.author?.profilePhoto?.url ||
            "https://placehold.co/40x40/E2E8F0/4A5568?text=..."
          }
          alt={post.author?.name}
          className="w-10 h-10 rounded-full object-cover mr-3 cursor-pointer"
          onClick={handleAuthorClick}
        />
        <div>
          <div
            className="font-bold text-gray-800 cursor-pointer hover:underline"
            onClick={handleAuthorClick}
          >
            {post.author?.name || "Anonymous User"}
          </div>
          <p className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{post.content}</p>

      {post.image?.url && (
        <div className="mt-3 rounded-lg overflow-hidden border">
          <img
            src={post.image.url}
            alt="Post content"
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Post;
