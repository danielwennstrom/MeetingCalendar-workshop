import React from "react";
import { useAuth } from "../../context/AuthContextProvider";

function Navbar() {
  const { user, logout } = useAuth();
  console.log("User in navbar:", user);

  return (
    <nav className="text-white bg-black px-5">
      <div className="sm:flex space-x-6 items-center my-3">
        <h5>Home</h5>
        <h5>About</h5>
        <h5>Services</h5>
        <h5>Contact</h5>
        <div className="flex-grow text-right">
          {!user && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition">
              Login
            </button>
          )}
          {user && (
            <button
              onClick={logout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
