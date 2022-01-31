/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable func-names */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import useAuth from '../../../hooks/useAuth';
import LoadingIcon from '../../../UI/LoadingIcon';

const Login = function () {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);
  const [firebiseErrorCode, SetFirebiseErrorCode] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
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

  if (auth) {
    history.push('/');
  }

  return (
    <div style={{ marginTop: '75px' }}>
      <h2>Login</h2>

      {valid === false ? <div className="alert alert-danger">Incorrect login details</div> : null}
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        {firebiseErrorCode ? <div className="alert alert-danger">{firebiseErrorCode}</div> : null}
        {loading ? (
          <LoadingIcon />
        ) : (
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: '#E69025',
              border: 'none',
              color: 'black',
              marginTop: '10px'
            }}>
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
