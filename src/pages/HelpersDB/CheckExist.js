/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { collection, getDocs, startAfter, query, limit, addDoc, where } from 'firebase/firestore';
import db from '../../firebase-config';

const checkExists = async (wordToCheck, path) => {
  const pathRef = collection(db, path);
  const q = query(
    pathRef,
    where('original', '==', wordToCheck.original),
    where('translated', '==', wordToCheck.translated)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) {
    return false;
  }
  return true;
};

export default checkExists;
