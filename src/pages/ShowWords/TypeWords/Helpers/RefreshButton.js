/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/control-has-associated-label */
import style from './RefreshButton.module.css';

const RefreshButton = function ({ resetView }) {
  return <button type="button" className={style.refreshIcon} onClick={() => resetView('empty')} />;
};

export default RefreshButton;
