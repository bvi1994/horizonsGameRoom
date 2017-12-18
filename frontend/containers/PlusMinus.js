import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import PlusMinusContainer from './PlusMinusContainer.js';

export default function Root({ store }) {
    return (
        <Provider store={store}>
                <PlusMinusContainer />
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
