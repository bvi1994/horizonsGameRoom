import React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import SlapJack from './containers/Slapjack';

import './assets/stylesheets/base.scss';

const store = configureStore();

render(
    <SlapJack store={store} history={history} />,
    document.getElementById('root')
);
