/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */

import { useReducer, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import app from './firebase-config';
import style from './App.module.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import AuthContext from './context/authContext';
import ReducerContext from './context/reducerContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import NotFound from './pages/404/404';
import Login from './pages/Auth/Login/Login';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import ErrorBoundary from './hoc/ErrorBoundary';
import { reducer, intialState } from './reducer';
import Register from './pages/Auth/Register/Register';
import AddWords from './pages/AddWords/AddWords';
import ShowWords from './pages/ShowWords/ShowWords';
import Learning from './pages/Learning/Learning';

const App = function () {
  const [state, dispatch] = useReducer(reducer, intialState);

  const header = <Header />;
  const menu = <Menu />;
  const footer = <Footer />;

  const content = (
    <div className={style.content}>
      <ErrorBoundary>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <AuthenticatedRoute path="/add" component={AddWords} />
            <AuthenticatedRoute path="/show" component={ShowWords} />
            <AuthenticatedRoute path="/learning" component={Learning} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );

  return (
    <Router>
      <AuthContext.Provider
        value={{
          user: state.user,
          login: (user) => dispatch({ type: 'login', user }),
          logout: () => dispatch({ type: 'logout' })
        }}>
        <ReducerContext.Provider
          value={{
            state,
            dispatch
          }}>
          <Layout header={header} menu={menu} content={content} footer={footer} />
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
