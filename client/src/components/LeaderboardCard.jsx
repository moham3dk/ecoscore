import React from "react";

const LeaderboardCard = ({ user, position }) => {
  const getPositionClass = (position) => {
    if (position === 1) return "bg-yellow-400 text-black";
    if (position === 2) return "bg-gray-400 text-black";
    if (position === 3) return "bg-yellow-800 text-white";
    return "bg-white bg-opacity-20 text-white";
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl shadow-md ${getPositionClass(
        position
      )}`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">{position}</div>
        <div>
          <h3 className="text-lg font-bold">{user.username}</h3>
        </div>
      </div>
      <div className="w-2/3">
        <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${user.ecoScore}%` }}
          ></div>
        </div>
        <p className="text-right text-sm mt-1">
          {user.ecoScore.toFixed(2)}% EcoScore
        </p>
      </div>
    </div>
  );
};

export default LeaderboardCard;
