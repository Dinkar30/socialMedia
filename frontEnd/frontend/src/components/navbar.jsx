import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../utils/api.js";

function Navbar() {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const username = localStorage.getItem("username");
  
  const handleLogout = async () => {
    try {
      const response = await api.post("/users/logout");
      console.log(response);
      alert("loggedOut successfully");
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userId")
      localStorage.removeItem("username")
      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/profile/${searchId}`);
      setSearchId("");
      setMenuOpen(false);
    }
  };
  
  return (
    <nav className="w-full bg-gray-900 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/feed")}
          >
            {/* <img src='/public/temp/logo.png' alt="" className="w-10 h-10 object-contain" /> */}
            <h1 className="text-xl font-bold">Hello</h1>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Search username..."
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm whitespace-nowrap cursor-pointer"
            >
              Search
            </button>
          </form>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/create-post")}
              className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 text-sm cursor-pointer whitespace-nowrap"
            >
              Create Post
            </button>
            <button
              onClick={() => navigate(`/profile/${username}`)}
              className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 text-sm cursor-pointer"
            >
              {username}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-sm cursor-pointer"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Search username..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
              >
                Search
              </button>
            </form>

            <button
              onClick={() => { navigate("/create-post"); setMenuOpen(false); }}
              className="w-full bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 text-sm text-left"
            >
              Create Post
            </button>
            <button
              onClick={() => { navigate(`/profile/${username}`); setMenuOpen(false); }}
              className="w-full bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 text-sm text-left"
            >
              {username}
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-sm text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;