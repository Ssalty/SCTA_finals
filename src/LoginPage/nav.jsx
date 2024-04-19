import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("signin");

  const handleInputChange = (e, type) => {
    switch (type) {
      case "signin":
        navigate("/");
        setLocation("signin");
        console.log(location);
        break;
      case "register":
        navigate("/register");
        setLocation("register");
        console.log(location);
        break;
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <nav className="flex justify-between w-full">
          <button
            className={`flex-grow w-1/3 px-4 py-2 text-center text-gray-900 font-semibold shadow-sm rounded-tl-lg hover:bg-indigo-500 ${
              location === "signin"
                ? "rounded-tl-lg bg-gray-200"
                : "bg-indigo-400 rounded-tl-lg"
            }`}
            onClick={(e) => handleInputChange(e, "signin")}
          >
            Sign In
          </button>

          {/* <Link
            className={`flex-grow w-1/3 py-2  text-center text-gray-900 font-semibold shadow-sm hover:bg-indigo-300 ${
              location === "Admin" ? "bg-gray-200 rounded-t-lg" : ""
            } 
            ${location === "Sign in" ? "bg-indigo-400 rounded-tl-lg" : ""} 
            ${location === "register" ? "bg-indigo-400 rounded-tr-lg" : ""}
          `}
            to="/admin"
            onClick={() => setLocation("Admin")}
          >
            Admin Login
          </Link> */}

          <button
            className={`flex-grow w-1/3 px-4 py-2 text-center text-gray-900 font-semibold shadow-sm rounded-tr-lg hover:bg-indigo-500 ${
              location === "register"
                ? "rounded-tr-lg bg-gray-200"
                : "bg-indigo-400 rounded-tr-lg"
            }`}
            onClick={(e) => handleInputChange(e, "register")}
          >
            Register
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
