import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("bio", formData.bio);
    if (profilePhoto) {
      data.append("profilePhoto", profilePhoto);
    }

    try {
      await axios.post(
        "https://mini-linkedin-api-760t.onrender.com/api/auth/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed.");
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-slate-800">
          Create Account
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-slate-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                name="profilePhoto"
                onChange={onFileChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 mt-1 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Name"
              onChange={onChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 mt-1 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              onChange={onChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              minLength="6"
              className="w-full px-4 py-2 mt-1 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              onChange={onChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Bio</label>
            <textarea
              name="bio"
              rows="2"
              className="w-full px-4 py-2 mt-1 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="A little about yourself..."
              onChange={onChange}
            ></textarea>
          </div>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 disabled:bg-indigo-400"
              disabled={loading} 
            >
              {loading ? <Spinner /> : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
