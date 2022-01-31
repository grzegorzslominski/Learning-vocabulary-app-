/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import style from './ManuallyForm.module.css';
import LoadingIcon from '../../../../UI/LoadingIcon';
import Manually from './Manually';
import db from '../../../../firebase-config';
import useAuth from '../../../../hooks/useAuth';
import checkExists from '../../../HelpersDB/CheckExist';

const ManuallyForm = function () {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [numberFields, setNumberFields] = useState([0]);
  const [errorMessage, setErrorMessage] = useState('');

  const [words, setWords] = useState([]);

  const changeWordsArray = (originalWord, translatedWord, index) => {
    const copyWordArray = [...words];
    copyWordArray[index] = { original: originalWord, translated: translatedWord };
    setWords(copyWordArray);
  };

  const changeNumberField = (actions) => {
    const newArray = [...numberFields];
    if (actions === '+' && numberFields.length < 7) {
      const newField = newArray[newArray.length - 1] + 1;
      newArray.push(newField);
      setNumberFields(newArray);
    }
    if (actions === '-' && numberFields.length > 1) {
      newArray.pop();
      setNumberFields(newArray);
      words.pop();
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    let errorStatus = false;
    await Promise.all(
      words.map(async (word) => {
        if ((word.original && word.translated) !== '') {
          if (await checkExists(word, `users/${auth.uid}/ownWords`)) {
            setErrorMessage(`The word ${word.original} has already been added`);
            errorStatus = true;
          } else {
            try {
              addDoc(collection(db, `users/${auth.uid}/ownWords`), {
                original: word.original,
                translated: word.translated
              });
            } catch (error) {
              console.error('Error adding document: ', error);
            }
          }
        } else {
          setErrorMessage('The field value cannot be empty');
          errorStatus = true;
        }
      })
    );
    if (errorStatus === false) {
      setErrorMessage('');
      setLoading(true);
      setWords([]);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    setTimeout(() => {
      setErrorMessage('');
    }, 2000);
  };

  const inputArray = numberFields.map((value) => {
    return <Manually changeWordsArray={changeWordsArray} index={value} />;
  });

  return (
    <form onSubmit={submit} className={style.formConteiner}>
      <span> </span>
      <span style={{ paddingRight: '145px' }}>Original</span>
      <span>Translated </span>
      <div className={style.lineBreakManuallyForm} />
      {!loading ? inputArray : null}
      <button
        type="button"
        className={style.addFieldButton}
        onClick={() => {
          changeNumberField('+');
        }}>
        +
      </button>
      <button
        type="button"
        className={style.addFieldButton}
        onClick={() => {
          changeNumberField('-');
        }}>
        -
      </button>
      <div className={style.lineBreakManuallyForm} />
      {loading ? (
        <LoadingIcon />
      ) : (
        <button type="submit" className={style.submitButton}>
          Sent
        </button>
      )}

      <p style={{ width: '100%', marginTop: '20px', color: 'red' }}>{errorMessage}</p>
    </form>
  );
};

export default ManuallyForm;
