import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import AppContainer from './AppContainer.js';
import DevTools from './DevTools';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <div>
              <MuiThemeProvider>
                <AppContainer />
<<<<<<< HEAD
                {/* <DevTools /> */}
              </MuiThemeProvider>
=======
                <DevTools />
>>>>>>> 168e9aba8606050a3efdef268f25a5d86573649c
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
