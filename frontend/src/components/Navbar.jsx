import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const popoverRef = useRef(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (user?.id) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/posts/user/${user.id}`
          );
          setCurrentUser(res.data.user);
        } catch (error) {
          console.error("Failed to fetch current user", error);
        }
      } else {
        setCurrentUser(null);
      }
    };
    fetchCurrentUser();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popoverRef]);

  const handleLogoutClick = () => {
    setPopoverOpen(false);
    onLogout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            CommunityHub
          </Link>
          {currentUser && (
            <div className="hidden sm:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Home
              </Link>
            </div>
          )}
        </div>
        <div>
          {currentUser ? (
            <div className="relative" ref={popoverRef}>
              <button onClick={() => setPopoverOpen(!popoverOpen)}>
                <img
                  src={
                    currentUser.profilePhoto?.url ||
                    "https://placehold.co/40x40/E2E8F0/4A5568?text=..."
                  }
                  alt="My Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-indigo-500 transition"
                />
              </button>
              {popoverOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={
                        currentUser.profilePhoto?.url ||
                        "https://placehold.co/48x48/E2E8F0/4A5568?text=..."
                      }
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-800">
                        {currentUser.name}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/profile/${currentUser._id}`}
                    onClick={() => setPopoverOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <span>👤</span>
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md mt-1"
                  >
                    <span>↪</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
