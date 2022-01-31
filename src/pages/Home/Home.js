/* eslint-disable func-names */

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import LoadingIcon from '../../UI/LoadingIcon';
import style from './Home.module.css';

const Home = function () {
  const history = useHistory();
  useWebsiteTitle('Home');

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={style.conteiner}>
      {loading ? <LoadingIcon /> : null}
      <h1>Welcome to the language learning app</h1>
      <div className={style.description}>
        This application helps users learn English vocabulary. Users can use a ready-made database
        of words and add their own using the functionality of the application. Good luck with your
        language learning.
      </div>

      <div className={style.createDiet}>
        Start learning a language now by creating a new account
        <button
          type="button"
          className={style.createDietLink}
          onClick={() => {
            history.push('/register');
          }}>
          Create an account
        </button>
      </div>

      <div className={style.createAccount}>
        or
        <button
          type="button"
          className={style.createAccountLink}
          onClick={() => {
            history.push('/login');
          }}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Home;
