import React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import SlowMo from './containers/SlowMo';

import './assets/stylesheets/base.scss';

const store = configureStore();

render(
    <SlowMo store={store} history={history} />,
    document.getElementById('root')
);
