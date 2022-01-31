/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import React, { useState } from 'react';
import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';
import style from './AddWords.module.css';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';

import ManuallyForm from './Methods/Manually/ManuallyForm';

const AddWords = function () {
  useWebsiteTitle('Add');
  const { path, url } = useRouteMatch();

  return (
    <div
      className="card"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', textAlign: 'center' }}>
      <div className="card-header" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        <h4>Add new words to learn</h4>
      </div>
      <div className="card-body">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" exact to={`${url}`} style={{ color: 'black' }}>
              Manually add
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/photo`} style={{ color: 'black' }}>
              Adding from a photo
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/article`} style={{ color: 'black' }}>
              Adding from a article
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`${url}/pdf`} style={{ color: 'black' }}>
              Adding from a pdf
            </NavLink>
          </li>
        </ul>

        <div className={style.contentContiner}>
          <Switch>
            <Route path={`${path}/photo`} component={ManuallyForm} />
            <Route path={`${path}/article`} component={ManuallyForm} />
            <Route path={`${path}/pdf`} component={ManuallyForm} />
            <Route path={`${path}`} component={ManuallyForm} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AddWords;
