import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faGraduationCap, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (user) {
      setIsModalOpen(false);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from context
      setIsModalOpen(false); // Close any open modals
      navigate("/"); // Redirect to home page
      window.location.reload(); // Optionally force a page reload
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };
  

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <nav className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} p-4 shadow-lg transition-colors duration-300 sticky top-0 z-50`}>
        <div className="container mx-auto flex justify-between items-center">
         
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={toggleDarkMode}
              className={`p-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-300 text-gray-600'} transition-colors duration-300 hover:scale-110`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="text-lg" />
            </button>
            {user ? (
              <div className="flex items-center space-x-4 md:space-x-6">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className={`text-3xl md:text-4xl cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500 transition-colors duration-300`}
                  onClick={() => navigate('/profile')}
                />
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-0 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-3 md:py-2 md:px-4 rounded-full transition duration-300 text-sm md:text-base hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 md:py-2 md:px-3 rounded-lg transition duration-300 flex items-center space-x-2 text-sm md:text-base hover:shadow-lg"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c2.504 0 4.815-.807 6.705-2.176l-2.957-2.957C14.373 19.604 13.232 20 12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8v1.5c0 .827-.673 1.5-1.5 1.5S17 14.327 17 13.5V12c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5c1.381 0 2.632-.561 3.536-1.464C16.268 16.671 17.55 17 19 17c2.209 0 4-1.791 4-4v-1c0-6.617-5.383-12-12-12zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" />
                </svg>
                <span className="hidden md:inline">Sign in with Google</span>
                <span className="md:hidden">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={loginWithGoogle}
        onLoginWithGoogle={loginWithGoogle}
      />
    </>
  );
};

export default Navbar;
