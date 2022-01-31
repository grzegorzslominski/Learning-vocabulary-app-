import caloricDemandCalculator from './caloricDemandCalculator';

const user1 = {
  username: 'user',
  email: 'user@wp.pl',
  physicalDetails: {
    weight: 75,
    height: 175,
    age: 35,
    physicalActivity: 'Almost none',
    gender: 'Male'
  }
};

const user2 = {
  username: 'user',
  email: 'user@wp.pl',
  physicalDetails: {
    weight: 75.225,
    height: 175.125,
    age: 35,
    physicalActivity: 'Almost none',
    gender: 'Male'
  }
};

const user3 = {
  username: 'user',
  email: 'user@wp.pl',
  physicalDetails: {
    weight: 'aa',
    height: 'bb',
    age: 35,
    physicalActivity: 'Almost none',
    gender: 'Male'
  }
};

describe('Function - caloric demand calculation', () => {
  test('Standard variables', () => {
    expect(caloricDemandCalculator(user1.physicalDetails)).toBe('2077');
  });

  test('Standard variables with decimals', () => {
    expect(caloricDemandCalculator(user2.physicalDetails)).toBe('2081');
  });

  test('Standard variables with decimals', () => {
    expect(caloricDemandCalculator(user3.physicalDetails)).toBe('NaN');
  });
});
