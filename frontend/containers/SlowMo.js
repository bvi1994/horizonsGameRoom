import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import SlowMoContainer from './SlowMoContainer.js';

export default function Root({ store }) {
    return (
        <Provider store={store}>
                <SlowMoContainer />
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
