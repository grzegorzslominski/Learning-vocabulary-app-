/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, startAfter, limit, addDoc, orderBy } from 'firebase/firestore';
import style from './BaseWords.module.css';
import WordConteiner from '../Helpers/WordConteiner';
import useAuth from '../../../../hooks/useAuth';
import db from '../../../../firebase-config';
import LoadingIcon from '../../../../UI/LoadingIcon';
import RefreshButton from '../Helpers/RefreshButton';
import NextPageButton from '../Helpers/NextPageButton';
import checkExists from '../../../HelpersDB/CheckExist';

const BaseWords = function () {
  const [auth, setAuth] = useAuth();
  let [baseWordArray, setBaseWordArray] = useState([]);
  const [loading, setLoading] = useState(true);
  let [lastVisible, setLastVisible] = useState('empty');
  const [messageStatus, setMessageStatus] = useState(false);
  const initialState = [];

  const addToActualWords = async (wordToSend) => {
    if (!(await checkExists(wordToSend, `users/${auth.uid}/actualWords`))) {
      try {
        addDoc(collection(db, `users/${auth.uid}/actualWords`), {
          original: wordToSend.original,
          translated: wordToSend.translated
        });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
      setMessageStatus(false);
    } else {
      setMessageStatus(true);
    }
    setTimeout(() => {
      setMessageStatus(false);
    }, 2000);
  };

  const getWords = async () => {
    baseWordArray = initialState;
    if (lastVisible === 'empty') {
      const first = query(collection(db, 'base'), orderBy('original'), limit(15));
      const documentSnapshots = await getDocs(first);
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      documentSnapshots.forEach((doc) => {
        baseWordArray.push({
          original: doc.data().original,
          translated: doc.data().translated,
          id: doc.id
        });
      });
      setBaseWordArray(baseWordArray);
    } else {
      const next = query(
        collection(db, 'base'),
        orderBy('original'),
        startAfter(lastVisible),
        limit(15)
      );
      const documentSnapshots2 = await getDocs(next);
      setLastVisible(documentSnapshots2.docs[documentSnapshots2.docs.length - 1]);
      documentSnapshots2.forEach((doc) => {
        baseWordArray.push({
          original: doc.data().original,
          translated: doc.data().translated,
          id: doc.id
        });
      });
      setBaseWordArray(baseWordArray);
    }
  };

  const resetView = (empty) => {
    baseWordArray = initialState;
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
    <div className={style.conteinerBaseWords}>
      {loading ? (
        <LoadingIcon />
      ) : (
        baseWordArray.map((oneWord) => {
          return <WordConteiner word={oneWord} addToActualWords={addToActualWords} />;
        })
      )}
      <div className={style.lineBreakBaseWords} />
      <NextPageButton getWords={getWords} />
      <RefreshButton resetView={resetView} />
      <div className={style.lineBreakBaseWords} />
      {messageStatus ? <span className={style.alerSpan}>This word is already added</span> : null}
    </div>
  );
};

export default BaseWords;
