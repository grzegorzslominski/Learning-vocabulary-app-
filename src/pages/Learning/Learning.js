/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, addDoc, doc, query } from 'firebase/firestore';
import style from './Learning.module.css';
import useAuth from '../../hooks/useAuth';
import db from '../../firebase-config';
import LearningWord from './LearningWord';

const ActualWords = function () {
  const [auth, setAuth] = useAuth();
  let [ActualWordsArray, setActualWordsArray] = useState([]);
  const [displayState, setDisplayState] = useState(true);
  let [actualWord, setActualWord] = useState(0);
  const initialState = [];

  const getWords = async () => {
    ActualWordsArray = initialState;

    const baseRef = collection(db, `users/${auth.uid}/actualWords`);
    const first = query(baseRef);
    const documentSnapshots = await getDocs(first);
    documentSnapshots.forEach((document) => {
      ActualWordsArray.push({
        original: document.data().original,
        translated: document.data().translated,
        id: document.id
      });
    });
    setActualWordsArray(ActualWordsArray);
  };

  const prevWord = () => {
    if (actualWord === 0) {
      setActualWord(ActualWordsArray.length - 1);
    } else setActualWord(actualWord - 1);
  };
  const nextWord = () => {
    if (actualWord === ActualWordsArray.length - 1) {
      setActualWord(0);
    } else setActualWord(actualWord + 1);
  };

  const changeWordCategory = async (wordToChange) => {
    try {
      await deleteDoc(doc(db, `users/${auth.uid}/actualWords`, wordToChange.id));
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    try {
      addDoc(collection(db, `users/${auth.uid}/learnedWords`), {
        original: wordToChange.original,
        translated: wordToChange.translated
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    await getWords();
  };

  const startLearning = () => {
    setDisplayState(false);
  };

  const content = ActualWordsArray.map((oneWord) => {
    return <LearningWord word={oneWord} updateWord={changeWordCategory} />;
  });
  useEffect(() => {
    getWords();
    console.log(content);
  }, []);

  return (
    <div className={style.conteinerActualWords}>
      {displayState ? (
        <button type="button" className={style.button} onClick={() => startLearning()}>
          Start
        </button>
      ) : (
        <>
          {content[actualWord]}
          <div className={style.buttonConteiner}>
            <button
              type="button"
              className={style.navigationButton}
              onClick={() => {
                prevWord();
              }}>
              &lt;
            </button>
            <button
              type="button"
              className={style.navigationButton}
              onClick={() => {
                nextWord();
              }}>
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ActualWords;
