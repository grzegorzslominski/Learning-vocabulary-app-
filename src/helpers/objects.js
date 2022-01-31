/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const objectToArrayWithId = (obj) => {
  const arr = [];
  for (const key in obj) {
    arr.push({ ...obj[key], id: key });
  }
  return arr;
};

export default objectToArrayWithId;
