import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./nav";
import { useNavigate } from "react-router-dom";

function Register() {
  const [idnumber, setIdNumber] = useState("");
  const [cname, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cnumber, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [hasIdNumber, setHasIdNumber] = React.useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const generateRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    setIdNumber(newNumber);
  };

  const handleInputChange = (e, type) => {
    switch (type) {
      case "idnumber":
        setError("");
        setIdNumber(e.target.value);
        if (e.target.value === "") {
          setError("IdNumber is blank");
        }
        break;
      case "cname":
        setError("");
        setName(e.target.value);
        if (e.target.value === "") {
          setError("Name is blank");
        }
        break;
      case "address":
        setError("");
        setAddress(e.target.value);
        if (e.target.value === "") {
          setError("Address is blank");
        }
        break;
      case "cnumber":
        setError("");
        setNumber(e.target.value);
        if (e.target.value === "") {
          setError("Contact Number is blank");
        }
        break;
      case "email":
        setError("");
        setEmail(e.target.value);
        if (e.target.value === "") {
          setError("Email is blank");
        }
        break;
      default:
        setHasIdNumber(!e.target.checked);
        if (hasIdNumber) {
          generateRandomNumber();
        }
        break;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("isloggedIn");
    if (storedUser) {
      setIsLoggedIn(true);
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setMsg("");
      setError("");
    }, 3000);
  }, [msg, idnumber]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const Data = {
      idnumber: idnumber,
      cname: cname,
      address: address,
      number: cnumber,
      email: email,
    };
    axios
      .post("http://localhost/finals/register.php", Data)
      .then((response) => {
        console.log(response.data);
        if (response.data === "ID number already exists in the database") {
          setError("ID number is taken");
        } else {
          axios
            .post("http://localhost/finals/login.php", Data)
            .then((response) => {
              setShowPopup(true);
              console.log(response.data);
              localStorage.setItem("isloggedIn", true);
              localStorage.setItem("idnumber", idnumber);
              setTimeout(() => {
                setShowPopup(false);
                navigate("/home");
              }, 3000);
            })
            .catch((error) => {
              if (error.response) {
                setErrorMessage("something is wrong! fix me!");
                console.log(error);
              }
            });
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage("something is wrong! fix me!");
          console.log(error);
        }
      });
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
          <div class="ms-3 text-sm font-normal">Checked in successfully.</div>
        </div>
      )}
      <Nav />
      <div className="flex flex-col">
        <div className="bg-gray-200 p-4 w-96 rounded-b-lg flex min-h-1 flex-1 flex-col justify-center px-6 py-1 lg:px-29">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
          <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="noIdNumber"
                    name="noIdNumber"
                    checked={!hasIdNumber} // Set checked state based on hasIdNumber
                    onChange={(e) => handleInputChange(e, "default")}
                  />
                  <label htmlFor="noIdNumber" className="ml-2 text-sm">
                    Guest?
                  </label>
                </div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  ID number
                </label>
                <div className="mt-0.5">
                  <input
                    value={idnumber}
                    onChange={(e) => handleInputChange(e, "idnumber")}
                    id="idnumber"
                    name="idnumber"
                    type="idnumber"
                    autoComplete="idnumber"
                    placeholder="your ID number"
                    required
                    readOnly={!hasIdNumber}
                    className={`${
                      !hasIdNumber
                        ? "bg-gray-200 cursor-not-allowed opacity-70"
                        : ""
                    } block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                </div>
                <p className="block text-sm font-medium leading-6 text-gray-900 text-left py-0">
                  {error === "ID number is taken" ? (
                    <span className="text-red-500">{error}</span>
                  ) : null}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Complete Name
                  </label>
                </div>
                <div className="mt-0.5">
                  <input
                    value={cname}
                    onChange={(e) => handleInputChange(e, "cname")}
                    id="cname"
                    name="cname"
                    type="cname"
                    autoComplete="cname"
                    placeholder="Complete Name"
                    required
                    className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Address
                </label>
                <div className="mt-0.5">
                  <input
                    value={address}
                    onChange={(e) => handleInputChange(e, "address")}
                    id="address"
                    name="address"
                    type="address"
                    autoComplete="address"
                    placeholder="Barangay, City or Town, and Province"
                    required
                    className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Contact Number
                  </label>
                </div>
                <div className="mt-0.5">
                  <input
                    value={cnumber}
                    onChange={(e) => handleInputChange(e, "cnumber")}
                    id="cnumber"
                    name="cnumber"
                    type="cnumber"
                    autoComplete="cnumber"
                    placeholder="Contact Number"
                    required
                    className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                </div>
                <div className="mt-0.5">
                  <input
                    value={email}
                    onChange={(e) => handleInputChange(e, "email")}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                  />
                </div>
              </div>

              <div className="py-2">
                <button
                  defaultValue="Login"
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
