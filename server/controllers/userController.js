const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const calculateEcoScore = require("../utils/calculateEcoScore");
const validateLifestyleData = require("../utils/validateLifestyleData");

const register = async (req, res, next) => {
  try {
    const { username, email, password, lifestyleData } = req.body;

    const validationResult = await validateLifestyleData(lifestyleData);
    if (typeof validationResult === "object") {
      return res.status(400).json({ validationResult });
    }

    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    }).exec();

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const ecoScore = calculateEcoScore(lifestyleData, 0);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      ecoScore,
      lifestyleData,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const checkAuth = (req, res) => {
  res.status(200).json({ message: "Authorized" });
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    delete userObject._id;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.lifestyleData._id;
    delete userObject.lifestyleData.__v;

    userObject.actionsCompleted = userObject.actionsCompleted.map(
      ({ actionId, dateCompleted, actionName }) => ({
        actionName,
        id: actionId,
        dateCompleted,
      })
    );

    res.status(200).json(userObject);
  } catch (error) {
    next(error);
  }
};

const getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find()
      .sort({ ecoScore: -1 })
      .limit(10)
      .select("username ecoScore")
      .exec();
    

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, checkAuth, getUser, getLeaderboard };
