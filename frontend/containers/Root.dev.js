import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import AppContainer from './AppContainer.js';
import TriangleContainer from './TriangleContainer.js';
import DevTools from './DevTools';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <div>
              <MuiThemeProvider>
                <AppContainer />
                {/* <TriangleContainer /> */}
              </MuiThemeProvider>
              <DevTools />
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
