import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [idnumber, setIdNumber] = useState("");
  const [cname, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cnumber, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("isloggedIn");
  const idStored = localStorage.getItem("idnumber");

  const Data = {
    idnumber: idStored,
  };

  useEffect(() => {
    if (storedUser) {
      navigate("/home");
    } else navigate("/");
  }, []);

  if (idStored) {
    axios
      .post("http://localhost/finals/loginConfirmation.php", Data)
      .then((response) => {
        setIdNumber(idStored);
        setName(response.data[1]);
        setAddress(response.data[2]);
        setNumber(response.data[3]);
        setEmail(response.data[4]);
        console.log(response.data);
        if (response.data === "Not Registered!") {
          setError("ID number is not registered");
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage("something is wrong! fix me!");
          console.log(error);
        }
      });
  }

  const handleSubmit = () => {
    axios
      .post("http://localhost/finals/login.php", Data)
      .then((response) => {
        console.log(response.data);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage("something is wrong! fix me!");
          console.log(error);
        }
      });
    localStorage.removeItem("idnumber");
    localStorage.removeItem("isloggedIn");
  };

  return (
    <>
      {showPopup && (
        <div
          id="toast-success"
          class="fixed top-4 left-0 right-0 mx-auto flex items-center w-full max-w-64 p-4 mb-4 text-gray-500 bg-white rounded-lg shadow animate-slideDown"
          role="alert"
        >
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
          <div class="ms-3 text-sm font-normal">Checked out successfully.</div>
        </div>
      )}
      <div className="flex flex-col">
        <div className="bg-gray-200 p-4 w-96 rounded-lg flex min-h-1 flex-1 flex-col justify-center px-6 py-1 lg:px-29">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Hi {cname}!
          </h2>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
              ID: {idnumber}
            </h3>
            <div className="mt-3 text-left sm:text-left">
              <p className="text-sm text-gray-900 mb-2">Address: {address}</p>
              <p className="text-sm text-gray-900 mb-2">
                Contact Number: {cnumber}
              </p>
              <p className="text-sm text-gray-900 mb-2">Email: {email}</p>
            </div>
            <div className="py-2">
              <button
                defaultValue="Login"
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
