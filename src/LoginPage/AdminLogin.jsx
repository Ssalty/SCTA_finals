import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("admin");

  useEffect(() => {
    if (storedUser === "1") {
      navigate("/adminhome");
    } else navigate("/admin");
  }, []);

  const handleInputChange = (e, type) => {
    switch (type) {
      case "user":
        setError("");
        setUser(e.target.value);
        if (e.target.value === "") {
          setError("Username is blank");
        }
        break;
      case "pass":
        setError("");
        setPass(e.target.value);
        if (e.target.value === "") {
          setError("Password is blank");
        }
        break;
      default:
    }
  };

  useEffect(() => {
    setTimeout(function () {
      setMsg("");
      setError("");
    }, 2000);
  }, [msg]);

  function loginSubmit() {
    if (user === "user" && pass === "pass") {
      setMsg("Log in Success!");
      setTimeout(function () {
        setMsg("");
      }, 3000);
      localStorage.setItem("admin", "1");
      navigate("/adminhome");
    } else {
      setError("Invalid username or password!");
      setTimeout(function () {
        setMsg("");
      }, 3000);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="bg-gray-200 p-4 w-96 rounded-lg flex min-h-1 flex-1 flex-col justify-center px-6 py-1 lg:px-29">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Admin Login
        </h2>
        <p className="block text-sm font-medium leading-6 text-gray-900 text-center">
          {error !== "" ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <span className="text-green-500">{msg}</span>
          )}
        </p>
        <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-0.5">
              <input
                value={user}
                onChange={(e) => handleInputChange(e, "user")}
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                placeholder="user"
                required
                className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-0.5">
              <input
                value={pass}
                onChange={(e) => handleInputChange(e, "pass")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="pass"
                required
                className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
              />
            </div>
          </div>

          <div className="py-2">
            <button
              defaultValue="Login"
              type="submit"
              onClick={loginSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
