/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
import { useRef } from 'react';

const InputText = function (props) {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type}
        className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

const InputTextarea = function (props) {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type}
        className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}
      />
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

const InputSelect = function (props) {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}>
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

const InputCheckbox = function (props) {
  const changeFeatureHandler = (e) => {
    const { value } = e.target;
    const isChecked = e.target.checked;

    if (isChecked) {
      const newValue = [...props.value, value];
      props.onChange(newValue);
    } else {
      const newValue = props.value.filter((x) => x !== value);
      props.onChange(newValue);
    }
  };

  return (
    <div className="form-group">
      {props.options.map((option) => (
        <div className="custom-control custom-checkbox" key={option.value}>
          <input
            type="checkbox"
            className="custom-control-input"
            value={option.value}
            checked={props.value.find((x) => x === option.value)}
            onChange={changeFeatureHandler}
            id={option.value}
          />
          <label className="custom-control-label" htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

const InputFile = function (props) {
  // eslint-disable-next-line no-unused-vars
  const fileRef = useRef();
  const changeHandler = (e) => {
    props.onChange(e.target.files[0]);
  };

  return (
    <div className="form-group">
      <input type="file" onChange={changeHandler} ref={props.fileRef} />
    </div>
  );
};

const InputRadio = function (props) {
  return (
    <div className="form-group">
      {props.options.map((option) => (
        <div className="custom-control custom-radio" key={option.value}>
          <input
            type="radio"
            id={`radio-${option.value}-${props.name}`}
            name={props.name}
            value={option.value}
            onChange={(e) => props.onChange(e.target.value)}
            // eslint-disable-next-line eqeqeq
            checked={props.value == option.value}
            className="custom-control-input"
          />
          <label className="custom-control-label" htmlFor={`radio-${option.value}-${props.name}`}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

const Input = function (props) {
  switch (props.type) {
    case 'select':
      return <InputSelect {...props} />;
    case 'password':
      return <InputText {...props} type="password" />;
    case 'email':
      return <InputText {...props} type="email" />;
    case 'checkbox':
      return <InputCheckbox {...props} />;
    case 'file':
      return <InputFile {...props} />;
    case 'radio':
      return <InputRadio {...props} />;
    case 'textarea':
      return <InputTextarea {...props} />;
    default:
      return <InputText {...props} />;
  }
};

Input.defaultProps = {
  type: 'text',
  isValid: false,
  showError: false
};

export default Input;
