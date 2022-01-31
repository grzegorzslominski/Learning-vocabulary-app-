/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/control-has-associated-label */
import style from './NextPageButton.module.css';

const NextPageButton = function ({ getWords }) {
  return (
    <button type="button" className={style.nextPageButton} onClick={() => getWords()}>
      &gt; &gt;
    </button>
  );
};

export default NextPageButton;
