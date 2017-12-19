import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import TriangleContainer from './TriangleContainer.js';

export default function Root({ store }) {
    return (
        <Provider store={store}>
                <TriangleContainer />
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
