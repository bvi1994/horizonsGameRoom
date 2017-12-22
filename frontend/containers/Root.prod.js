import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer.js';
import TriangleContainer from './TriangleContainer.js';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <AppContainer />
            {/* <TriangleContainer /> */}
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
