/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import style from './Manually.module.css';

const Manually = function ({ changeWordsArray, index }) {
  const [originalWord, setOriginalWord] = useState('');
  const [translatedWord, setTranslatedWord] = useState('');

  useEffect(() => {
    changeWordsArray(originalWord, translatedWord, index);
  }, [originalWord, translatedWord]);

  return (
    <div className={style.conteinerAddWords}>
      <input
        className={style.inputWord}
        type="text"
        value={originalWord}
        onChange={(e) => setOriginalWord(e.target.value)}
      />
      <input
        className={style.inputWord}
        type="text"
        value={translatedWord}
        onChange={(e) => setTranslatedWord(e.target.value)}
      />
    </div>
  );
};

export default Manually;
