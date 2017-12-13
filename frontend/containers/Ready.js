import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import ReadyContainer from './ReadyContainer.js';

export default function Root({ store }) {
    return (
        <Provider store={store}>
                <ReadyContainer />
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
