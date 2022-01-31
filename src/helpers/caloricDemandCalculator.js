const caloricDemandCalculator = (physicalDetails) => {
  const activityLevelMap = new Map();

  activityLevelMap.set('Almost none', 1.2);
  activityLevelMap.set('Lightly Active', 1.375);
  activityLevelMap.set('Moderately Active', 1.55);
  activityLevelMap.set('High Activity', 1.725);
  activityLevelMap.set('Very high Activity', 1.9);

  if (physicalDetails.gender === 'Male') {
    const BMR =
      66 + 13.7 * physicalDetails.weight + 5 * physicalDetails.height - 6.8 * physicalDetails.age;
    return (BMR * activityLevelMap.get(physicalDetails.physicalActivity)).toFixed(0);
  }
  const BMR =
    655 + 9.6 * physicalDetails.weight + 1.8 * physicalDetails.height - 4.7 * physicalDetails.age;
  return (BMR * activityLevelMap.get(physicalDetails.physicalActivity)).toFixed(0);
};

export default caloricDemandCalculator;
