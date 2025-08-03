import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Post from "../components/Post"; 

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/user/${userId}`
      );
      setProfile(res.data.user);
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
      setError("Could not fetch profile data.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!profile) {
    return (
      <div className="text-center mt-10">
        <p>User not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Back to Feed
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={
              profile.profilePhoto?.url ||
              "https://placehold.co/150x150/E2E8F0/4A5568?text=No+Photo"
            }
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-md text-gray-500 mt-1">{profile.email}</p>
            <p className="text-gray-700 mt-4">
              {profile.bio || "This user has not provided a bio."}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Posts by {profile.name}
        </h2>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className="text-center text-gray-500">
            This user hasn't made any posts yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
