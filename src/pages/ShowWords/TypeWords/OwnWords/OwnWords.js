/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { collection, getDocs, startAfter, query, limit, addDoc, orderBy } from 'firebase/firestore';
import style from './OwnWords.module.css';
import WordConteiner from '../Helpers/WordConteiner';
import useAuth from '../../../../hooks/useAuth';
import db from '../../../../firebase-config';
import LoadingIcon from '../../../../UI/LoadingIcon';
import RefreshButton from '../Helpers/RefreshButton';
import NextPageButton from '../Helpers/NextPageButton';
import checkExists from '../../../HelpersDB/CheckExist';

const OwnWords = function () {
  const [auth, setAuth] = useAuth();
  let [ownWordsArray, setOwnWordsArray] = useState([]);
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
    ownWordsArray = initialState;

    if (lastVisible === 'empty') {
      const baseRef = collection(db, `users/${auth.uid}/ownWords`);
      const first = query(baseRef, orderBy('original'), limit(10));
      const documentSnapshots = await getDocs(first);
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      documentSnapshots.forEach((doc) => {
        ownWordsArray.push({
          original: doc.data().original,
          translated: doc.data().translated,
          id: doc.id
        });
      });
      setOwnWordsArray(ownWordsArray);
    } else {
      const baseRef = collection(db, `users/${auth.uid}/ownWords`);
      const next = query(baseRef, orderBy('original'), startAfter(lastVisible), limit(10));
      const documentSnapshots2 = await getDocs(next);
      setLastVisible(documentSnapshots2.docs[documentSnapshots2.docs.length - 1]);
      documentSnapshots2.forEach((doc) => {
        ownWordsArray.push({
          original: doc.data().original,
          translated: doc.data().translated,
          id: doc.id
        });
      });
      setOwnWordsArray(ownWordsArray);
    }
  };

  const resetView = (empty) => {
    ownWordsArray = initialState;
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
    <div className={style.conteinerOwnWords}>
      {loading ? (
        <LoadingIcon />
      ) : (
        ownWordsArray.map((oneWord) => {
          return <WordConteiner word={oneWord} addToActualWords={addToActualWords} />;
        })
      )}
      <div className={style.lineBreakOwnWord} />
      <NextPageButton getWords={getWords} />
      <RefreshButton resetView={resetView} />
      <div className={style.lineBreakOwnWord} />
      {messageStatus ? <span className={style.alertSpan}>This word is already added</span> : null}
    </div>
  );
};

export default OwnWords;
