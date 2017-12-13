import React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import Ready from './containers/Ready';

import './assets/stylesheets/base.scss';

const store = configureStore();

render(
    <Ready store={store} history={history} />,
    document.getElementById('root')
);
