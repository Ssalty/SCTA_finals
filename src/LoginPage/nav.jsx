import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div>
        <nav className="flex justify-between w-full">
          <button
            className={`flex-grow w-1/3 px-4 py-2 text-center text-gray-900 font-semibold shadow-sm bg-indigo-400 rounded-t-lg hover:bg-indigo-500 focus:bg-gray-200 `}
            onClick={() => navigate("/")}
          >
            Sign In
          </button>

          {/* <Link
            className={`flex-grow w-1/3 py-2  text-center text-gray-900 font-semibold shadow-sm hover:bg-indigo-300 ${
              location === "Admin" ? "bg-gray-200 rounded-t-lg" : ""
            } 
            ${location === "Sign in" ? "bg-indigo-400 rounded-tl-lg" : ""} 
            ${location === "Register" ? "bg-indigo-400 rounded-tr-lg" : ""}
          `}
            to="/admin"
            onClick={() => setLocation("Admin")}
          >
            Admin Login
          </Link> */}

          <button
            className={`flex-grow w-1/3 px-4 py-2 text-center text-gray-900 font-semibold shadow-sm bg-indigo-400 rounded-t-lg hover:bg-indigo-500 focus:bg-gray-200`}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
