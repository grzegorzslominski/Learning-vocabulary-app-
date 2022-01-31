/* eslint-disable func-names */
import React from 'react';
import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';
import style from './ShowWords.module.css';
import OwnWords from './TypeWords/OwnWords/OwnWords';
import BaseWords from './TypeWords/BaseWords/BaseWords';
import ActualWords from './TypeWords/ActualWords/ActualWords';
import LearnedWords from './TypeWords/LearnedWords/LearnedWords';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';

const ShowWords = function () {
  useWebsiteTitle('Show');
  const { path, url } = useRouteMatch();

  return (
    <div
      className="card"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', textAlign: 'center' }}>
      <div className="card-header" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        <h4>Check and manage different categories of words</h4>
      </div>
      <div className="card-body">
        <ul className="nav nav-tabs" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/base`} style={{ color: 'black' }}>
              Base words
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to={`${url}`} style={{ color: 'black' }}>
              Own words
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/actual`} style={{ color: 'black' }}>
              Actual words
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/learned`} style={{ color: 'black' }}>
              Learned words
            </NavLink>
          </li>
        </ul>

        <div className={style.contentContiner}>
          <Switch>
            <Route path={`${path}/base`} component={BaseWords} />
            <Route path={`${path}/actual`} component={ActualWords} />
            <Route path={`${path}/learned`} component={LearnedWords} />
            <Route path={`${path}`} component={OwnWords} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ShowWords;
