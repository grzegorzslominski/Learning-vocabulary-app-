/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable func-names */
import style from '../../pages/Auth/Register/Register.module.css';

const InputText = function (props) {
  let inputStyle = style.formInputLarge;
  if (props.size === 'small') inputStyle = style.formInputSmall;
  return (
    <div>
      <label className={style.formLabel}>{props.description}</label>
      <input className={inputStyle} {...props.inputProps} type={props.typeInput} required />
      <br />
      <p className={style.formError}>{props.inputError}</p>
    </div>
  );
};

InputText.defaultProps = {
  description: '',
  inputProps: {},
  inputError: '',
  typeInput: 'text',
  size: 'large'
};

export default InputText;
