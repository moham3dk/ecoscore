import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import {
  getProfile,
  checkAuth,
  getActions,
  completeAction,
} from "../services/api";
import ActionCard from "../components/ActionCard";
import Navbar from "../components/Navbar";

const Actions = () => {
  const [actionData, setActionData] = useState([]);
  const [completedActions, setCompletedActions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActionsData = async () => {
      try {
        const actionsResponse = await getActions();
        if (actionsResponse.error) {
          setActionData([]);
        } else {
          setActionData(actionsResponse);
        }

        const authResponse = await checkAuth();
        if (authResponse.error) {
          handleLogout();
          return;
        }

        setIsAuthenticated(true);

        const sessionProfile = sessionStorage.getItem("profile");
        if (sessionProfile) {
          const profileData = JSON.parse(sessionProfile);
          setCompletedActions(profileData.actionsCompleted || []);
        } else {
          const profileResponse = await getProfile();
          if (profileResponse.error) {
            handleLogout();
            return;
          }
          sessionStorage.setItem("profile", JSON.stringify(profileResponse));
          setCompletedActions(profileResponse.actionsCompleted || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        handleLogout();
      }
    };

    const handleLogout = () => {
      sessionStorage.clear();
      localStorage.clear();
      setIsAuthenticated(false);
    };

    fetchActionsData();
  }, []);

  const handleCompleteAction = async (id) => {
    try {
      if (isAuthenticated) {
        const response = await completeAction(id);
        if (response.error) {
          throw new Error(response.error);
        }

        setCompletedActions((prevActions) => [
          ...prevActions,
          {
            id,
            dateCompleted: response.dateCompleted,
            actionName: response.actionName,
          },
        ]);

        const sessionProfile = sessionStorage.getItem("profile");

        if (sessionProfile) {
          const profileData = JSON.parse(sessionProfile);
          profileData.actionsCompleted = [
            ...profileData.actionsCompleted,
            {
              id,
              dateCompleted: response.dateCompleted,
              actionName: response.actionName,
            },
          ];
          profileData.ecoScore = response.updatedEcoScore;
          sessionStorage.setItem("profile", JSON.stringify(profileData));
        }
      } else {
        setCompletedActions((prevActions) => [
          ...prevActions,
          {
            id,
            dateCompleted: new Date(),
            actionName: actionData.find((action) => action.id === id)
              .actionName,
          },
        ]);
      }
    } catch (err) {
      console.error("Error completing action:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center bg-fixed p-4">
        <div className="bg-black bg-opacity-60 p-12 rounded-3xl shadow-xl max-w-5xl w-full mx-4 mt-20">
          <button
            onClick={() => navigate("/profile")}
            className="mb-6 flex items-center w-full justify-center md:justify-normal text-white font-semibold hover:text-gray-300 transition"
          >
            <FiArrowLeft className="mr-2" />
            Back to Profile
          </button>
          <h1 className="text-4xl font-extrabold text-white leading-tight drop-shadow-lg mb-8 text-center">
            Actions
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center place-items-center">
            {actionData.map((action) => (
              <ActionCard
                key={action.id}
                action={action}
                onPress={handleCompleteAction}
                completedActions={completedActions}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Actions;
