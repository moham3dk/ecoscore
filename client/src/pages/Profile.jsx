import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getActions, checkAuth } from "../services/api";
import ProfileData from "../components/ProfileData";

const Profile = () => {
  const [actionData, setActionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth().then((data) => {
      if (data.error) {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/login");
      } else {
        getProfile().then((data) => {
          if (data.error) {
            navigate("/login");
          } else {
            sessionStorage.setItem("profile", JSON.stringify(data));
          }
        });
        getActions().then((data) => {
          if (data.error) {
            setActionData([]); // this shouldnt happen but just in case
          } else {
            setActionData(data);
            setLoading(false);
          }
        });
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center bg-fixed p-4">
      {loading ? (
        <p className="text-white text-2xl">Loading...</p>
      ) : (
        <ProfileData actionData={actionData} />
      )}
    </div>
  );
};

export default Profile;
