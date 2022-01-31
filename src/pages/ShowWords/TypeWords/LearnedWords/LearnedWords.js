/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  startAfter,
  query,
  limit,
  deleteDoc,
  orderBy,
  doc
} from 'firebase/firestore';
import style from './LearnedWords.module.css';
import WordConteinerV2 from '../Helpers/WordConteinerV2';
import useAuth from '../../../../hooks/useAuth';
import db from '../../../../firebase-config';
import LoadingIcon from '../../../../UI/LoadingIcon';
import RefreshButton from '../Helpers/RefreshButton';
import NextPageButton from '../Helpers/NextPageButton';

const LearnedWords = function () {
  const [auth, setAuth] = useAuth();
  let [actualWordsArray, setActualWordsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  let [lastVisible, setLastVisible] = useState('empty');
  const [messageStatus, setMessageStatus] = useState(false);
  const initialState = [];

  const getWords = async () => {
    actualWordsArray = initialState;

    if (lastVisible === 'empty') {
      const baseRef = collection(db, `users/${auth.uid}/learnedWords`);
      const first = query(baseRef, orderBy('original'), limit(10));
      const documentSnapshots = await getDocs(first);
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      documentSnapshots.forEach((document) => {
        actualWordsArray.push({
          original: document.data().original,
          translated: document.data().translated,
          id: document.id
        });
      });
      setActualWordsArray(actualWordsArray);
    } else {
      const baseRef = collection(db, `users/${auth.uid}/learnedWords`);
      const next = query(baseRef, orderBy('original'), startAfter(lastVisible), limit(10));
      const documentSnapshots2 = await getDocs(next);
      setLastVisible(documentSnapshots2.docs[documentSnapshots2.docs.length - 1]);
      documentSnapshots2.forEach((document) => {
        actualWordsArray.push({
          original: document.data().original,
          translated: document.data().translated,
          id: document.id
        });
      });
      setActualWordsArray(actualWordsArray);
    }
  };

  const deleteWord = async (wordToDelete) => {
    try {
      await deleteDoc(doc(db, `users/${auth.uid}/learnedWords`, wordToDelete.id));
      setMessageStatus(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    setTimeout(() => {
      setMessageStatus(false);
    }, 2000);
  };

  const resetView = (empty) => {
    actualWordsArray = initialState;
    setLastVisible(empty);
    lastVisible = empty;
    getWords();
  };

  useEffect(() => {
    getWords();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div className={style.conteinerLearnedWords}>
      {loading ? (
        <LoadingIcon />
      ) : (
        actualWordsArray.map((oneWord) => {
          return <WordConteinerV2 word={oneWord} deleteWord={deleteWord} />;
        })
      )}
      <div className={style.lineBreakLearnedWords} />
      <NextPageButton getWords={getWords} />
      <RefreshButton resetView={resetView} />
      <div className={style.lineBreakLearnedWords} />
      {messageStatus ? <span className={style.alertSpan}>Word removed</span> : null}
    </div>
  );
};

export default LearnedWords;
