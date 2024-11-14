import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../services/api";
import Navbar from "../components/Navbar";
import LeaderboardCard from "../components/LeaderboardCard";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        if (data.error) {
          setError(data.error);
        } else {
          setLeaderboard(data);
        }
      } catch (err) {
        setError("Failed to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
        <p className="text-white text-2xl font-bold">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
        <p className="text-red-500 text-2xl font-bold">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 p-4">
        <div className="bg-black bg-opacity-60 p-12 rounded-3xl shadow-xl max-w-7xl mx-auto mt-20">
          <h1 className="text-4xl font-extrabold text-white text-center leading-tight drop-shadow-lg mb-8">
            Leaderboard
          </h1>
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <LeaderboardCard key={user._id} user={user} position={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
