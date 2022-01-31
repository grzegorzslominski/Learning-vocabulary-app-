/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import FormInput from '../../UI/FormInput/FormInput';

const valueInput = [
  {
    name: 'username',
    label: 'Username',
    description: 'Username can contain any letters or numbers, without spaces'
  },
  {
    name: 'email',
    label: 'mail',
    description: 'Please provide your E-mail'
  },
  {
    name: 'Password',
    label: 'Username',
    description: 'Password should be at least 4 characters'
  },
  {
    name: 'password_confirm',
    label: 'Password (Confirm)',
    description: 'Please confirm password'
  }
];

const RegisterForm = function () {
  return (
    <form className="form-horizontal" action="" method="POST">
      <fieldset>
        <div id="legend">
          <legend className="">Register</legend>
          {valueInput.map((value, i) => {
            return <FormInput key={i} {...value} />;
          })}
          <div className="controls">
            <button className="btn btn-success" type="button">
              Register
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
