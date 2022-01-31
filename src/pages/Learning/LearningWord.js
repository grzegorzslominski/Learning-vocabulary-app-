/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import { useState } from 'react';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import style from './LearningWord.module.css';

const Learning = function ({ word, updateWord }) {
  useWebsiteTitle('Learning');
  const [displayState, setDisplayState] = useState(false);

  return (
    <div className={style.mainConteiner}>
      <div className={style.wordConteiner}>{displayState ? word.translated : word.original}</div>
      <div className={style.buttonConteiner}>
        <button
          type="button"
          className={style.reverseButton}
          onClick={() => {
            setDisplayState(!displayState);
          }}
        />
        <button
          type="button"
          className={style.addButton}
          onClick={() => {
            updateWord(word);
          }}
        />
      </div>
    </div>
  );
};

export default Learning;
