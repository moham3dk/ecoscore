import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerUser } from "../services/api";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    transportationMiles: 0,
    vehicleType: "electric",
    energyConsumption: 0,
    dietType: "vegetarian",
    flyingFrequency: 0,
    recycling: false,
  });

  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmitBasic = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitLifestyle = async (e) => {
    e.preventDefault();
    setCanSubmit(false);

    const { username, email, password, ...lifestyleData } = formData;

    const data = await registerUser(username, email, password, lifestyleData);
    console.log(data);
    if (data.error) {
      setErrorMessage(data.error);
      setCanSubmit(true);
    } else if (data.errors) {
      setErrorMessage(JSON.stringify(data.errors));
      setCanSubmit(true);
    } else {
      localStorage.setItem("token", data.token);
      navigate("/profile");
    }

    console.log(formData);
  };

  const handleClosePopup = () => {
    setErrorMessage("");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center bg-fixed">
        <form
          className="bg-black bg-opacity-60 p-12 rounded-3xl shadow-xl max-w-lg w-full text-center my-24 mx-4"
          onSubmit={step === 1 ? handleSubmitBasic : handleSubmitLifestyle}
        >
          <h2 className="text-4xl font-extrabold text-white leading-tight drop-shadow-lg mb-6">
            {step === 1 ? "Register" : "Complete Your Profile"}
          </h2>

          {step === 1 && (
            <>
              <div className="space-y-6">
                <div>
                  <label className="block text-left text-white text-lg font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    minLength={3}
                    maxLength={20}
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-left text-white text-lg font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    minLength={4}
                    maxLength={256}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-left text-white text-lg font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-6">
                <div>
                  <label className="block text-left text-white text-lg font-medium mb-2">
                    Transportation Miles
                  </label>
                  <input
                    type="number"
                    name="transportationMiles"
                    value={formData.transportationMiles}
                    onChange={handleChange}
                    className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-left text-white text-lg font-medium mb-2">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="gasoline">Gasoline</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="public_transport">Public Transport</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-left text-white text-lg font-medium mb-2">
                    Energy Consumption (kWh)
                  </label>
                  <input
                    type="number"
                    name="energyConsumption"
                    value={formData.energyConsumption}
                    onChange={handleChange}
                    className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-left text-white text-lg font-medium mb-2">
                    Diet Type
                  </label>
                  <select
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleChange}
                    className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="meat-based">Meat-based</option>
                  </select>
                </div>

                <div>
                  <label className="block text-left text-white text-lg font-medium mb-2">
                    Flying Frequency (flights per year)
                  </label>
                  <input
                    type="integer"
                    name="flyingFrequency"
                    value={formData.flyingFrequency}
                    onChange={handleChange}
                    className="w-full p-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex items-center">
                  <label className="mr-2 text-left text-white text-lg font-medium">
                    Do you recycle?
                  </label>
                  <input
                    type="checkbox"
                    name="recycling"
                    checked={formData.recycling}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    !canSubmit && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </form>

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
      </div>
    </>
  );
};

export default Register;
