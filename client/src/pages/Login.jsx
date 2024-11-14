import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginUser, checkAuth } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCanSubmit(false);

    const data = await loginUser(email, password);

    if (data.error) {
      setErrorMessage(data.error);
      setCanSubmit(true);
    } else {
      localStorage.setItem("token", data.token);
      navigate("/profile");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth().then((data) => {
        if (!data.error) {
          navigate("/profile");
        }
        else {
          sessionStorage.clear();
          localStorage.clear();
        }
      });
    }
  }, [navigate]);

  const handleClosePopup = () => {
    setErrorMessage("");
  };
  return (
    <>
      <Navbar />
      <div className="h-screen bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center bg-fixed">
        <div className="bg-black bg-opacity-60 p-12 rounded-3xl shadow-xl max-w-lg w-full text-center mx-4">
          <h1 className="text-4xl font-extrabold text-white leading-tight drop-shadow-lg mb-6">
            Login to EcoScore
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-left text-white text-lg font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                maxLength={256}
                minLength={4}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-left text-white text-lg font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!canSubmit}
            >
              Log In
            </button>
          </form>
          <p className="text-white mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
      {errorMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
            <p className="text-red-500 font-semibold mb-4 text-center">
              {errorMessage}
            </p>
            <button
              onClick={handleClosePopup}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
