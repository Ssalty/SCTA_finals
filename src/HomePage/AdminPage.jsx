import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [idnumber, setIdNumber] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchDate, setSearchDate] = useState([]);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("admin");

  const handleInputChange = (e, type) => {
    switch (type) {
      case "search":
        setSearch(e.target.value);
        console.log(search);
        break;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const handleOnClick = (e, type, id) => {
    e.preventDefault();
    switch (type) {
      case "userinfo":
        setIdNumber(id);
        fetchSearchDate(id); // Use id directly here
        break;
      case "userattendance":
        setIdNumber(id);
        fetchSearchData1(id); // Use id directly here
        break;
    }
  };

  const handleSubmit = () => {
    fetchSearchDate(idnumber);
    fetchSearchData();
  };

  useEffect(() => {
    fetchData();
    if (storedUser === "1") {
      navigate("/adminhome");
    } else navigate("/");
  }, []);

  useEffect(() => {
    setSearchData([]);
  }, [search]);

  useEffect(() => {
    fetchSearchData();
    fetchSearchDate1();
  }, [search]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/finals/displayInfo.php"
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSearchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost/finals/displaySearch.php",
        { search: search }
      );
      console.log(response.data);
      setSearchData(response.data);
      console.log(searchData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSearchData1 = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost/finals/displaySearch.php",
        { search: id }
      );
      console.log(response.data);
      setSearchData(response.data);
      console.log(searchData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSearchDate = async (id) => {
    try {
      setSearchDate([]); // Set an empty array if there are no search results
      const response = await axios.post(
        "http://localhost/finals/displayDate.php",
        { search: id }
      );
      console.log(response.data);
      setSearchDate(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSearchDate1 = async () => {
    try {
      setSearchDate([]); // Set an empty array if there are no search results
      const response = await axios.post(
        "http://localhost/finals/displayDate.php",
        { search: search }
      );
      console.log(response.data);
      setSearchDate(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="relative mt-10 mb-10 bg-gray-200 p-8 shadow-md rounded-lg overflow-x-auto ">
      <button
        className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none"
        onClick={handleLogout}
      >
        Logout
      </button>
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Admin Page
      </h2>
      <div className="flex justify-center mt-0.5 relative">
        <input
          value={search}
          onChange={(e) => handleInputChange(e, "search")}
          id="search"
          name="search"
          type="search"
          autoComplete="search"
          placeholder="Search here"
          className="block w-1/3 pl-4 pr-4 py-1.5 text-gray-900 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e, "search");
            }
          }}
        />
      </div>
      <div className="container mx-auto">
        <h2 className="mt-4 text-left text-2xl font-bold text-gray-900">
          Search Results
        </h2>
        <div className="mt-1 overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Contact Number</th>
                <th className="px-4 py-2">Email</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {searchData.map((item) => (
                <tr
                  key={item.userID}
                  className=" bg-gray-100 hover:bg-gray-200  hover:outline outline-1 outline-gray-300 -outline-offset-1"
                  onClick={(e) => handleOnClick(e, "userinfo", item.userID)}
                >
                  <td className="border px-4 py-2">{item.userID}</td>
                  <td className="border px-4 py-2">{item.cName}</td>
                  <td className="border px-4 py-2">{item.address}</td>
                  <td className="border px-4 py-2">{item.number}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  {/* Add more table cells for other data fields */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mx-auto">
        <h2 className="mt-4 text-left text-2xl font-bold text-gray-900">
          Attendace Logs
        </h2>
        <div className="mt-1 overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Check In</th>
                <th className="px-4 py-2">Check Out</th>
              </tr>
            </thead>
            <tbody>
              {searchDate.map((item) => (
                <tr
                  key={item.key}
                  className=" bg-gray-100 hover:bg-gray-200  hover:outline outline-1 outline-gray-300 -outline-offset-1"
                  onClick={(e) =>
                    handleOnClick(e, "userattendance", item.userID)
                  }
                >
                  <td className="border px-4 py-2">{item.userID}</td>
                  <td className="border px-4 py-2">{item.Checkin}</td>
                  <td className="border px-4 py-2">{item.Checkout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="container mx-auto">
        <h2 className="mt-4 text-left text-2xl font-bold text-gray-900">
          All Users
        </h2>
        <div className="mt-1 overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Contact Number</th>
                <th className="px-4 py-2">Email</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.userID}
                  className=" bg-gray-100 hover:bg-gray-200  hover:outline outline-1 outline-gray-300 -outline-offset-1"
                  onClick={(e) => {
                    handleOnClick(e, "userinfo", item.userID),
                      handleOnClick(e, "userattendance", item.userID);
                  }}
                >
                  <td className="border px-4 py-2">{item.userID}</td>
                  <td className="border px-4 py-2">{item.cName}</td>
                  <td className="border px-4 py-2">{item.address}</td>
                  <td className="border px-4 py-2">{item.number}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  {/* Add more table cells for other data fields */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
