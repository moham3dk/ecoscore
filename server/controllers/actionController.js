const Action = require("../models/Action");
const User = require("../models/User");
const calculateEcoScore = require("../utils/calculateEcoScore");

const getActions = async (req, res, next) => {
  try {
    const actions = await Action.find().select("actionName CO2Saved").exec();

    const actionsObject = actions.map(({ _id, actionName, CO2Saved }) => ({
      id: _id,
      name: actionName,
      CO2Saved,
    }));

    res.status(200).json(actionsObject);
  } catch (error) {
    next(error);
  }
};
const completeAction = async (req, res, next) => {
  try {
    const { actionId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId)
      .populate("actionsCompleted.actionId")
      .exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const actionCompleted = user.actionsCompleted.some(
      (completedAction) =>
        completedAction.actionId &&
        completedAction.actionId._id.toString() === actionId
    );
    if (actionCompleted) {
      return res.status(400).json({ error: "Action already completed" });
    }

    const action = await Action.findById(actionId).exec();
    if (!action) {
      return res.status(404).json({ error: "Action not found" });
    }

    user.actionsCompleted.push({
      actionName: action.actionName,
      actionId: action._id,
      dateCompleted: new Date(),
    });

    // much more efficient this way :D
    const totalCO2Saved = user.CO2Saved + action.CO2Saved;

    user.CO2Saved = totalCO2Saved;

    user.ecoScore = calculateEcoScore(user.lifestyleData, totalCO2Saved);

    await user.save();

    res.status(200).json({
      actionName: action.actionName,
      actionId: action._id,
      dateCompleted: new Date(),
      updatedEcoScore: user.ecoScore,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getActions, completeAction };
