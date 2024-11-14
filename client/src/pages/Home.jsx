import React from "react";
import { Link } from "react-router-dom";
import background from "../assets/background.jpg";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-screen bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center bg-fixed"
      >
        <div className="bg-black bg-opacity-60 p-12 rounded-3xl shadow-xl max-w-3xl w-full text-center">
          <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-lg mb-6">
            Welcome to EcoScore
          </h1>
          <p className="text-xl text-white opacity-90 mb-8 font-light">
            Take control of your carbon footprint. Discover eco-friendly actions
            and track your progress towards a greener lifestyle.
          </p>
          <Link
            to="/login"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
