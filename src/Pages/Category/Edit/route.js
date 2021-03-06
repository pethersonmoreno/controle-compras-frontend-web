import React from 'react';
import { Route } from 'react-router-dom';
import Component from './CategoryEdit';
import { PREFIX_ROUTE } from '../constants';

export default <Route exact path={`${PREFIX_ROUTE}/:id`} component={Component} />;
