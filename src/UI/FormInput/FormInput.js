/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const FormInput = function ({ name, label, description }) {
  return (
    <div className="control-group">
      <label className="control-label" htmlFor={name}>
        {label}
      </label>
      <div className="controls">
        <input type="text" id={name} name={name} placeholder="" className="input-xlarge" />
        <p className="help-block">{description}</p>
      </div>
    </div>
  );
};

export default FormInput;
