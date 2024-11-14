import React, { useState, useEffect, useCallback, useMemo } from "react";
import { IoReload } from "react-icons/io5";
import { Link } from "react-router-dom";
import { completeAction } from "../services/api";
import ActionCard from "./ActionCard";

const ProfileData = ({ actionData }) => {
  const profileData = JSON.parse(sessionStorage.getItem("profile"));
  const username = profileData.username;

  const [ecoScore, setEcoScore] = useState(profileData.ecoScore);
  const [actionsCompleted, setActionsCompleted] = useState(
    profileData.actionsCompleted
  );
  const [currentActions, setCurrentActions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClosePopup = () => {
    setErrorMessage("");
  };

  const shuffleActions = useCallback(() => {
    if (!actionData || actionData.length === 0) return [];
    return [...actionData].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [actionData]);

  const shuffledActions = useMemo(() => shuffleActions(), [shuffleActions]);

  const getBarColor = useMemo(() => {
    if (ecoScore <= 40) return "bg-red-500";
    if (ecoScore <= 70) return "bg-yellow-500";
    return "bg-green-500";
  }, [ecoScore]);

  useEffect(() => {
    setCurrentActions(shuffledActions);
  }, [shuffledActions]);

  const handleCompleteAction = useCallback(
    async (id) => {
      try {
        const response = await completeAction(id);
        if (response.error) {
          throw new Error(response.error);
        }

        setActionsCompleted((prevActions) => [
          ...prevActions,
          {
            id,
            dateCompleted: response.dateCompleted,
            actionName: response.actionName,
          },
        ]);
        setEcoScore(response.updatedEcoScore);
      } catch (err) {
        setErrorMessage(err.message || "An unexpected error occurred.");
      }
    },
    [setEcoScore]
  );

  return (
    <>
      <div className="bg-gray-800 bg-opacity-80 p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl w-max mx-auto my-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-xl mb-6">
          Welcome, {username}
        </h1>
        <div className="text-white text-lg space-y-4">
          <div>
            <p className="text-xl font-semibold">
              <strong>EcoScore:</strong> {ecoScore}
            </p>
            <div className="w-full bg-gray-300 rounded-full h-6 mb-12 shadow-inner">
              <div
                className={`${getBarColor} h-6 rounded-full transition-all duration-500 ease-in-out`}
                style={{ width: `${ecoScore}%` }}
              ></div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center">
              Recommended For You
            </h1>
            <div className="flex flex-col sm:flex-row md:justify-between space-y-4 sm:space-y-0 items-center justify-center sm:space-x-4">
              {currentActions.map((action) => (
                <ActionCard
                  key={action.id || action.name}
                  action={action}
                  onPress={handleCompleteAction}
                  completedActions={actionsCompleted}
                />
              ))}
            </div>
            <div className="flex flex-row justify-center space-x-4">
              <button
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-24 rounded-lg"
                onClick={() => setCurrentActions(shuffleActions())}
              >
                <IoReload className="inline-block" />
              </button>
              <Link
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-10 rounded-lg"
                to="/actions"
              >
                View All Actions
              </Link>
            </div>
          </div>
          <div className="h-80 overflow-y-auto">
            <h2 className="text-2xl font-bold mt-6">Actions Completed</h2>
            <ul className="space-y-2 mt-4 text-lg">
              {actionsCompleted?.length > 0 ? (
                actionsCompleted.map((action) => (
                  <li
                    key={action.id}
                    className="text-base text-gray-300 space-x-4"
                  >
                    <strong>Action:</strong> {action.actionName}
                    <strong>Date Completed:</strong>{" "}
                    {new Date(action.dateCompleted).toLocaleString()}
                  </li>
                ))
              ) : (
                <li className="text-base text-gray-300">
                  No actions completed yet.
                </li>
              )}
            </ul>
          </div>
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

export default ProfileData;
