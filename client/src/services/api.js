import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

const registerUser = async (username, email, password, lifestyleData) => {
  try {
    const response = await api.post("/users/register", {
      username,
      email,
      password,
      lifestyleData: {
        transportationMiles: parseInt(lifestyleData.transportationMiles),
        vehicleType: lifestyleData.vehicleType,
        energyConsumption: parseInt(lifestyleData.energyConsumption),
        dietType: lifestyleData.dietType,
        flyingFrequency: parseInt(lifestyleData.flyingFrequency),
        recycling: lifestyleData.recycling,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      return { error: error.response.data.error };
    } else {
      if (error.errors) {
        return { errors: JSON.stringify(error.errors) };
      }
      return { error: error.message };
    }
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      return { error: error.response.data.error };
    }
    return { error: error.message };
  }
};

const getProfile = async () => {
  try {
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      return { error: error.response.data.error };
    }
    return { error: error.message };
  }
};

const checkAuth = async () => {
  try {
    const response = await api.get("/users/check", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.data.error) {
      return { error: error.response.data.error };
    }
    return { error: error.message };
  }
};

const getActions = async () => {
  try {
    const response = await api.get("/actions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      return { error: error.response.data.error };
    }
    return { error: error.message };
  }
};

const completeAction = async (actionId) => {
  try {
    const response = await api.post(
      "/actions/complete",
      { actionId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      return { error: error.response.data.error };
    }
    return { error: error.message };
  }
};

const getArticles = async () => {
  try {
    const response = await api.get("/articles");
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

const getLeaderboard = async () => {
  try {
    const response = await api.get("/users/leaderboard");
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  checkAuth,
  getActions,
  completeAction,
  getArticles,
  getLeaderboard,
};
