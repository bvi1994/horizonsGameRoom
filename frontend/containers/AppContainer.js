import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const AppContainer = () => {
    return (
        <MuiThemeProvider>
            <HashRouter>
              <div style={{height: "100%"}}>
                <Route exact path="/" component={LoginForm} />
                <Route exact path="/dashboard" component={Dashboard} />
              </div>
            </HashRouter>
        </MuiThemeProvider>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
