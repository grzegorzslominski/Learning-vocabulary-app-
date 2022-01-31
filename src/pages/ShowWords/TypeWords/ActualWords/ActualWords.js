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
import style from './ActualWords.module.css';
import WordConteinerV2 from '../Helpers/WordConteinerV2';
import useAuth from '../../../../hooks/useAuth';
import db from '../../../../firebase-config';
import LoadingIcon from '../../../../UI/LoadingIcon';
import RefreshButton from '../Helpers/RefreshButton';
import NextPageButton from '../Helpers/NextPageButton';

const ActualWords = function () {
  const [auth, setAuth] = useAuth();
  let [ActualWordsArray, setActualWordsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  let [lastVisible, setLastVisible] = useState('empty');
  const [messageStatus, setMessageStatus] = useState(false);
  const initialState = [];

  const getWords = async () => {
    ActualWordsArray = initialState;

    if (lastVisible === 'empty') {
      const baseRef = collection(db, `users/${auth.uid}/actualWords`);
      const first = query(baseRef, orderBy('original'), limit(10));
      const documentSnapshots = await getDocs(first);
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      documentSnapshots.forEach((document) => {
        ActualWordsArray.push({
          original: document.data().original,
          translated: document.data().translated,
          id: document.id
        });
      });
      setActualWordsArray(ActualWordsArray);
    } else {
      const baseRef = collection(db, `users/${auth.uid}/actualWords`);
      const next = query(baseRef, orderBy('original'), startAfter(lastVisible), limit(10));
      const documentSnapshots2 = await getDocs(next);
      setLastVisible(documentSnapshots2.docs[documentSnapshots2.docs.length - 1]);
      documentSnapshots2.forEach((document) => {
        ActualWordsArray.push({
          original: document.data().original,
          translated: document.data().translated,
          id: document.id
        });
      });
      setActualWordsArray(ActualWordsArray);
    }
  };

  const deleteWord = async (wordToDelete) => {
    try {
      await deleteDoc(doc(db, `users/${auth.uid}/actualWords`, wordToDelete.id));
      setMessageStatus(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    setTimeout(() => {
      setMessageStatus(false);
    }, 2000);
  };

  const resetView = (empty) => {
    ActualWordsArray = initialState;
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
    <div className={style.conteinerActualWords}>
      {loading ? (
        <LoadingIcon />
      ) : (
        ActualWordsArray.map((oneWord) => {
          return <WordConteinerV2 word={oneWord} deleteWord={deleteWord} />;
        })
      )}
      <div className={style.lineBreakActualWords} />
      <NextPageButton getWords={getWords} />
      <RefreshButton resetView={resetView} />
      <div className={style.lineBreakActualWords} />
      {messageStatus ? <span className={style.alertSpan}>Word removed</span> : null}
    </div>
  );
};

export default ActualWords;
