import React, { useMemo, useCallback } from "react";

const ActionCard = ({ action, onPress, completedActions }) => {
  const completed = useMemo(
    () => completedActions.some((completedAction) => completedAction.id === action.id),
    [completedActions, action.id]
  );

  const handleComplete = useCallback(() => {
    if (onPress) {
      onPress(action.id);
    }
  }, [action.id, onPress]);

  const buttonClasses = useMemo(
    () =>
      `${
        completed ? "bg-gray-600" : "bg-green-500 hover:bg-green-400"
      } text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out`,
    [completed]
  );

  return (
    <div className="bg-gray-800 bg-opacity-80 p-6 rounded-2xl shadow-lg w-64 text-white flex flex-col h-60 justify-stretch">
      <h2 className="text-xl font-bold">{action.name}</h2>
      <p className="text-gray-300 flex-grow">{`Saves ${action.CO2Saved} CO2`}</p>
      <button
        onClick={handleComplete}
        className={buttonClasses}
        disabled={completed}
      >
        {completed ? "Completed" : "Complete"}
      </button>
    </div>
  );
};

export default ActionCard;
