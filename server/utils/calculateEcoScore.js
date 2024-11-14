const calculateEcoScore = (lifestyleData, emissionsSaved) => {
    let ecoScore = 0;
    const {
      transportationMiles,
      vehicleType,
      energyConsumption,
      dietType,
      flyingFrequency,
      recycling,
    } = lifestyleData;
  
    // less miles = more points, up to 10
    ecoScore += Math.max(10 - transportationMiles / 1000, 0);
  
    // scale points based on vehicle type
    switch (vehicleType) {
      case "electric":
        ecoScore += 10;
        break;
      case "hybrid":
        ecoScore += 7;
        break;
      case "public_transport":
        ecoScore += 8;
        break;
      case "gasoline":
          ecoScore += 2;
          break;
      case "none":
        ecoScore += 12;
        break;
      default:
        break;
    }
  
    // lower energy consumption = more points, up to 10
    ecoScore += Math.max(10 - energyConsumption / 20, 0);
  
    // better diets = more points
    switch (dietType) {
      case "vegan":
        ecoScore += 15;
        break;
      case "vegetarian":
        ecoScore += 10;
        break;
      case "meat-based":
        ecoScore += 2;
        break;
      default:
        break;
    }
  
    // less flying = more points, up to 10
    ecoScore += Math.max(10 - flyingFrequency * 2, 0);
  
    // recycling = more points
    if (recycling) {
      ecoScore += 5;
    }
  
    // emissions saved goes up based on the amount saved, up to 15
    ecoScore += emissionsSaved / 30
  
    // score must be between 0 and 100
    ecoScore = Math.min(Math.max(ecoScore, 0), 100);
    return ecoScore;
  };
  
  module.exports = calculateEcoScore;