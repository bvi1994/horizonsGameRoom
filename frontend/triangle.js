import React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import Triangle from './containers/Triangle';

import './assets/stylesheets/base.scss';

const store = configureStore();

render(
    <Triangle store={store} history={history} />,
    document.getElementById('root')
);
