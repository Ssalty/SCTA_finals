import { useState, useEffect } from "react";
import Nav from "./nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [idnumber, setIdNumber] = useState("");
  const [cname, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cnumber, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e, type) => {
    switch (type) {
      case "idnumber":
        if (e.target.value === "") {
          setError("ID number is blank");
        } else {
          setError(""); // Set error to empty string only if no error
        }
        setIdNumber(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("isloggedIn");
    if (storedUser) {
      navigate("/home");
    } else navigate("/");
  }, []);

  useEffect(() => {
    if (msg !== "") {
      setTimeout(() => setMsg(""), 2000); // Update only if msg has a value
    }
    if (error !== "") {
      setTimeout(() => setError(""), 2000); // Update only if error has a value
    }
  }, [msg, error]);

  const handleSubmit = (e, type) => {
    switch (type) {
      case "checkInOut":
        {
          e.preventDefault();
          const Data = {
            idnumber: idnumber,
          };
          axios
            .post("http://localhost/finals/login.php", Data)
            .then((response) => {
              console.log(response.data);
              localStorage.setItem("isloggedIn", true);
              localStorage.setItem("idnumber", idnumber);
              setShowPopup(true);
              setTimeout(() => {
                setIsPopUpOpen(false);
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
        break;
      case "displayInfo": {
        e.preventDefault();
        const Data = {
          idnumber: idnumber,
        };
        axios
          .post("http://localhost/finals/loginConfirmation.php", Data)
          .then((response) => {
            setName(response.data[1]);
            setAddress(response.data[2]);
            setNumber(response.data[3]);
            setEmail(response.data[4]);
            console.log(response.data);
            setIsPopUpOpen(true);
            console.log(isPopUpOpen);
            if (response.data === "Not Registered!") {
              setIsPopUpOpen(false);
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
      default:
        {
          e.preventDefault();
          setIsPopUpOpen(false);
        }
        break;
    }
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
      {isPopUpOpen ? (
        <div className="flex flex-col w-auto my-4">
          <div className="bg-gray-200 p-4 w-auto rounded-lg flex min-h-1 flex-1 flex-col justify-center px-6 py-1 lg:px-29">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Are you {cname}?
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
              <div className="flex flex-row py-2">
                <button
                  defaultValue="Login"
                  type="submit"
                  onClick={(e) => handleSubmit(e, "checkInOut")}
                  className="flex w-full justify-center rounded-md bg-indigo-400 mx-2 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Confirm
                </button>
                <button
                  defaultValue="Login"
                  type="submit"
                  onClick={(e) => handleSubmit(e, "default")}
                  className="flex w-full justify-center rounded-md bg-red-400 mx-2 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-red-600"
                >
                  Not Me
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Nav />
          <div className="flex flex-col">
            <div className="bg-gray-200 p-4 w-96 rounded-b-lg flex min-h-1 flex-1 flex-col justify-center px-6 py-1 lg:px-29">
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in
              </h2>
              <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={(e) => handleSubmit(e, "displayInfo")}>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      ID Number
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
                        className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="block text-sm font-medium leading-6 text-gray-900 text-left py-0">
                      {error === "ID number is not registered" ? (
                        <span className="text-red-500">{error}</span>
                      ) : null}
                    </p>
                  </div>

                  <div className="py-2">
                    <button
                      defaultValue="Login"
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserLogin;
