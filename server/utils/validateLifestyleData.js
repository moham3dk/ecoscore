const validateLifestyleData = (lifestyleData) => {
  const {
    transportationMiles,
    vehicleType,
    energyConsumption,
    dietType,
    flyingFrequency,
    recycling,
  } = lifestyleData;

  const errors = [];

  if (
    transportationMiles === undefined ||
    vehicleType === undefined ||
    energyConsumption === undefined ||
    dietType === undefined ||
    flyingFrequency === undefined ||
    recycling === undefined
  ) {
    errors.push("All lifestyle data fields are required");
  }

  if (typeof transportationMiles !== "number" || transportationMiles < 0) {
    errors.push(
      "Transportation miles should be a number greater than or equal to 0"
    );
  }

  if (typeof vehicleType !== "string") {
    errors.push("Vehicle type should be a string");
  } else if (
    !["electric", "hybrid", "public_transport", "gasoline", "none"].includes(
      vehicleType
    )
  ) {
    errors.push("Invalid vehicle type");
  }

  if (typeof energyConsumption !== "number" || energyConsumption < 0) {
    errors.push(
      "Energy consumption should be a number greater than or equal to 0"
    );
  }

  if (typeof dietType !== "string") {
    errors.push("Diet type should be a string");
  } else if (!["vegan", "vegetarian", "meat-based"].includes(dietType)) {
    errors.push("Invalid diet type");
  }

  if (typeof flyingFrequency !== "number" || flyingFrequency < 0) {
    errors.push(
      "Flying frequency should be a number greater than or equal to 0"
    );
  }

  if (typeof recycling !== "boolean") {
    errors.push("Recycling should be a boolean");
  }

  return errors.length > 0 ? errors : true;
};

module.exports = validateLifestyleData;
