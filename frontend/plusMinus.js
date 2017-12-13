import React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import PlusMinus from './containers/PlusMinus';

import './assets/stylesheets/base.scss';

const store = configureStore();

render(
    <PlusMinus store={store} history={history} />,
    document.getElementById('root')
);
