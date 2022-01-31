/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import style from './WordConteinerV2.module.css';

const WordConteiner = function ({ word, deleteWord }) {
  const [isActive, setActive] = useState(false);

  const removeFromActual = () => {
    setActive(!isActive);
    deleteWord(word);
  };

  return (
    <div className={style.conteinerWordConteiner}>
      <div className={isActive ? style.clicked : style.noClicked}>
        {word.original} | {word.translated}
      </div>
      <button
        className={style.sendingButton}
        type="button"
        disabled={isActive}
        onClick={() => removeFromActual()}>
        -
      </button>
    </div>
  );
};

export default WordConteiner;
