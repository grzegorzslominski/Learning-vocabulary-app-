/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import style from './Register.module.css';
import useInput from '../../../hooks/useInput';

import LoadingButton from '../../../UI/LoadingButton/LoadingButton';
import InputText from '../../../components/Input/InputText';
import useAuth from '../../../hooks/useAuth';

const Register = function () {
  const history = useHistory();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [compatible, setCompatible] = useState(false);

  const [emailProps, setEmail] = useInput('');
  const [passwordProps, setPassword] = useInput('');
  const [repeatedPasswordProps, setRepeatedPassword] = useInput('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = useState('');
  const [firebiseErrorCode, SetFirebiseErrorCode] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, emailProps.value, passwordProps.value)
      .then(() => {
        setAuth({
          email: authentication.currentUser.email,
          token: authentication.currentUser.accessToken,
          uid: authentication.currentUser.uid
        });
        history.push('/');
      })
      .catch((error) => {
        SetFirebiseErrorCode(error.code);
      });

    setLoading(false);
  };

  const validation = () => {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (emailProps.value === '') {
      setEmailError('Email field cannot be empty');
    } else if (!emailRegex.test(emailProps.value)) {
      setEmailError('Email is not valid');
    } else setEmailError('');

    if (passwordProps.value === '') {
      setPasswordError('Password field cannot be empty');
    } else if (!passwordRegex.test(passwordProps.value)) {
      setPasswordError(
        'Password is too weak. The password should consist of a minimum of eight characters, one number, one uppercase letter, one lowercase letter'
      );
    } else {
      setPasswordError('');
    }

    if (repeatedPasswordProps.value === '' || repeatedPasswordProps.value !== passwordProps.value) {
      setRepeatedPasswordError('The passwords do not match');
    } else {
      setRepeatedPasswordError('');
    }
  };

  useEffect(() => {
    validation();
    const errorArray = [emailError, passwordError, repeatedPasswordError];
    errorArray.every((e) => e === '') ? setCompatible(true) : setCompatible(false);
  }, [emailProps, passwordProps, repeatedPasswordProps]);

  if (auth) {
    history.push('/');
  }

  return (
    <div style={{ marginTop: '75px' }}>
      <h2>Register</h2>

      <div className="form-group">
        <form className={style.registerForm} onSubmit={submit}>
          <InputText
            description="Email"
            inputProps={emailProps}
            inputError={emailError}
            typeInput="email"
          />
          <InputText
            description="Password"
            inputProps={passwordProps}
            inputError={passwordError}
            typeInput="password"
          />
          <InputText
            description="Repeat password"
            inputProps={repeatedPasswordProps}
            inputError={repeatedPasswordError}
            typeInput="password"
          />
          {firebiseErrorCode ? <div className="alert alert-danger">{firebiseErrorCode}</div> : null}

          <div className="text-right">
            <LoadingButton
              loading={loading}
              disabled={!compatible}
              className={style.registerButton}>
              Sign up
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
