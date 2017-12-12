import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import SlapAppContainer from './SlapAppContainer.js';

export default function Root({ store }) {
    return (
        <Provider store={store}>
                <SlapAppContainer />
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
